"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"
import Image from "next/image"
import { CldImage, getCldImageUrl } from "next-cloudinary"
import { dataUrl, download } from "@/lib/utils"
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props"
import { useToast } from "@/components/ui/use-toast"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CustomField } from "./CustomField"
import { addImage } from "@/lib/actions/image.actions"
import { updateCredits } from "@/lib/actions/user.actions"
import { InsufficientCreditsModal } from "./InsufficientCreditsModal"

const formSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  prompt: z.string().min(3, {
    message: "Prompt must be at least 3 characters.",
  }),
})

interface GenerationFormProps {
  userId: string;
  creditBalance: number;
}

const GenerationForm = ({ userId, creditBalance }: GenerationFormProps) => {
  const { toast } = useToast()
  const [generatedImage, setGeneratedImage] = useState<{
    publicId: string;
    secureUrl: string;
  } | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      prompt: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (creditBalance < 1) return;

    try {
      setIsGenerating(true)

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: values.prompt,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate image');
      }

      const data = await response.json()

      if (data.images?.[0]) {
        const image = data.images[0]
        setGeneratedImage({
          publicId: image.publicId,
          secureUrl: image.secureUrl,
        })
        
        // Deduct 1 credit
        await updateCredits(userId, -1)

        // Save the generated image
        await addImage({
          image: {
            title: values.title,
            publicId: image.publicId,
            width: 1024,
            height: 1024,
            transformationType: "generate",
            secureURL: image.secureUrl,
            config: {
              prompt: values.prompt,
            },
          },
          userId,
          path: "/transformations",
        })

        // Show success message
        toast({
          title: 'Image generated successfully',
          description: '1 credit was deducted from your account',
          duration: 5000,
          className: 'success-toast',
          variant: 'default'
        })
      }
    } catch (error) {
      console.error("Error generating image:", error)
      toast({
        title: 'Failed to generate image',
        description: error instanceof Error ? error.message : "An error occurred while generating the image.",
        duration: 5000,
        className: 'error-toast'
      });
    } finally {
      setIsGenerating(false)
    }
  }

  const downloadHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (!generatedImage) return;

    download(getCldImageUrl({
      width: 1024,
      height: 1024,
      src: generatedImage.publicId,
    }), form.getValues().title)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {creditBalance < 1 && <InsufficientCreditsModal />}
        
        <div className="flex flex-col gap-8">
          {/* Title Input */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Image Title</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="input-field"
                    placeholder="Enter a title for your image..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Prompt Input */}
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Prompt</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="input-field"
                    placeholder="A futuristic city at night with neon lights..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Generate Button */}
          <Button
            type="submit"
            className="submit-button capitalize"
            disabled={isGenerating || creditBalance < 1}
          >
            {isGenerating ? "Generating..." : "Generate Image (1 Credit)"}
          </Button>
        </div>

        {/* Generated Image Display */}
        <div className="flex flex-col gap-4">
          <div className="flex-between">
            <h3 className="h3-bold text-dark-600">
              Generated Image
            </h3>

            {generatedImage && (
              <button 
                className="download-btn" 
                onClick={downloadHandler}
              >
                <Image 
                  src="/assets/icons/download.svg"
                  alt="Download"
                  width={24}
                  height={24}
                  className="pb-[6px]"
                  style={{ width: 'auto', height: 'auto' }}
                />
              </button>
            )}
          </div>

          <div className="relative min-h-[550px] w-full">
            {isGenerating ? (
              <div className="transforming-loader">
                <Image 
                  src="/assets/icons/spinner.svg"
                  width={50}
                  height={50}
                  alt="spinner"
                  style={{ width: 'auto', height: 'auto' }}
                />
                <p className="text-white/80">Generating your image...</p>
              </div>
            ) : generatedImage ? (
              <CldImage 
                width={1024}
                height={1024}
                src={generatedImage.publicId}
                alt="generated image"
                sizes="(max-width: 767px) 100vw, 50vw"
                placeholder={dataUrl as PlaceholderValue}
                className="transformed-image"
                onError={(e) => {
                  console.error("Error loading generated image");
                  (e.target as HTMLImageElement).src = "/assets/icons/error.svg";
                }}
              />
            ) : (
              <div className="transformed-placeholder">
                Your generated image will appear here
              </div>
            )}
          </div>
        </div>
      </form>
    </Form>
  )
}

export default GenerationForm 