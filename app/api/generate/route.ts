import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

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

    // Call Hugging Face API with Stable Diffusion XL
    const response = await fetch(
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
      }
    );

    console.log("Hugging Face Response Status:", response.status);
    
    if (!response.ok) {
      let errorMessage = `Hugging Face API error: ${response.status} ${response.statusText}`;
      
      try {
        const errorText = await response.text();
        console.error("Hugging Face API error response:", {
          status: response.status,
          statusText: response.statusText,
          body: errorText,
        });

        // Try to parse error as JSON
        try {
          const errorJson = JSON.parse(errorText);
          if (errorJson.error) {
            errorMessage = errorJson.error;
          }
        } catch (e) {
          // If parsing fails, use the raw error text
          errorMessage = errorText;
        }
      } catch (e) {
        console.error("Error parsing error response:", e);
      }

      throw new Error(errorMessage);
    }

    // The response is the image blob
    const imageBlob = await response.blob();
    
    if (!imageBlob || imageBlob.size === 0) {
      throw new Error("No image data received from the API");
    }

    const arrayBuffer = await imageBlob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    console.log("Successfully generated image, uploading to Cloudinary...");
    
    // Upload to Cloudinary
    try {
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
      console.error("Error uploading to Cloudinary:", error);
      throw error;
    }
  } catch (error) {
    console.error("Detailed error in generate route:", {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    
    return NextResponse.json(
      { 
        error: error instanceof Error 
          ? error.message 
          : "Failed to generate images",
        details: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
} 