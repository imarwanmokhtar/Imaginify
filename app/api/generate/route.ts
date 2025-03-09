import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Configure timeout and retry settings
const TIMEOUT_DURATION = 45000; // 45 seconds
const MAX_RETRIES = 2;
const RETRY_DELAY = 1000; // 1 second

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const fetchWithTimeout = async (url: string, options: RequestInit, timeout: number) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    return response;
  } finally {
    clearTimeout(timeoutId);
  }
};

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!process.env.HUGGINGFACE_API_KEY) {
      console.error("Missing HUGGINGFACE_API_KEY");
      throw new Error("HUGGINGFACE_API_KEY is not configured");
    }

    console.log("Starting image generation with prompt:", prompt);

    let lastError: Error | null = null;
    
    // Implement retry logic
    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      try {
        if (attempt > 0) {
          console.log(`Retry attempt ${attempt}/${MAX_RETRIES}`);
          await wait(RETRY_DELAY * attempt);
        }

        // Call Hugging Face API with Stable Diffusion XL
        const response = await fetchWithTimeout(
          "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
            },
            body: JSON.stringify({
              inputs: prompt,
              parameters: {
                negative_prompt: "blurry, bad quality, distorted",
                num_inference_steps: 30,
                guidance_scale: 7.5,
                width: 1024,
                height: 1024,
              }
            }),
          },
          TIMEOUT_DURATION
        );

        console.log("Hugging Face Response Status:", response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`API error: ${response.status} - ${errorText}`);
        }

        const imageBlob = await response.blob();
        
        if (!imageBlob || imageBlob.size === 0) {
          throw new Error("No image data received from the API");
        }

        const arrayBuffer = await imageBlob.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        console.log("Successfully generated image, uploading to Cloudinary...");
        
        // Upload to Cloudinary
        const uploadResponse = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            {
              folder: "ai-generated",
              resource_type: "image",
              format: "png",
              transformation: [
                { quality: "auto", fetch_format: "auto" }
              ]
            },
            (error, result) => {
              if (error) {
                console.error("Cloudinary upload error:", error);
                reject(error);
              } else {
                console.log("Cloudinary upload successful:", result?.public_id);
                resolve(result);
              }
            }
          ).end(buffer);
        });

        return NextResponse.json({
          images: [{
            publicId: (uploadResponse as any).public_id,
            secureUrl: (uploadResponse as any).secure_url,
          }]
        });

      } catch (error) {
        console.error(`Attempt ${attempt + 1} failed:`, error);
        lastError = error as Error;
        
        // If it's the last attempt, throw the error
        if (attempt === MAX_RETRIES) {
          throw error;
        }
      }
    }

    throw lastError || new Error("Failed to generate image after all retries");

  } catch (error) {
    console.error("Detailed error in generate route:", {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    
    const statusCode = error instanceof Error && error.message.includes("timeout") ? 504 : 500;
    
    return NextResponse.json(
      { 
        error: error instanceof Error 
          ? error.message 
          : "Failed to generate images",
        details: error instanceof Error ? error.stack : undefined
      },
      { status: statusCode }
    );
  }
} 