import { auth } from "@clerk/nextjs";
import Image from "next/image";
import { CldImage } from "next-cloudinary";
import { notFound } from "next/navigation";

import Header from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import { getImageById } from "@/lib/actions/image.actions";
import { getImageSize } from "@/lib/utils";
import { DeleteConfirmation } from "@/components/shared/DeleteConfirmation";
import { dataUrl } from "@/lib/utils";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";

interface SearchParamProps {
  params: {
    id: string;
  };
}

const GeneratedImageDetails = async ({ params: { id } }: SearchParamProps) => {
  const { userId } = auth();

  if (!id) notFound();

  try {
    const image = await getImageById(id);

    if (!image) notFound();

    // Only show generated images
    if (image.transformationType !== "generate") {
      return (
        <div className="flex-center h-full w-full flex-col gap-4">
          <p className="p-20-semibold">This page is only for AI generated images</p>
          <Button
            className="paragraph-medium mt-4 bg-purple-gradient bg-cover text-white"
            onClick={() => window.history.back()}
          >
            Go Back
          </Button>
        </div>
      );
    }

    return (
      <>
        <Header title={image.title} />

        <section className="mt-5 flex flex-wrap gap-4">
          <div className="p-14-medium md:p-16-medium flex gap-2">
            <p className="text-dark-600">Prompt:</p>
            <p className="capitalize text-purple-400">{image.prompt}</p>
          </div>
        </section>

        <section className="mt-10 flex flex-col items-center">
          <div className="relative max-w-3xl">
            <CldImage
              width={1024}
              height={1024}
              src={image.publicId}
              alt={image.title}
              sizes="(max-width: 767px) 100vw, 50vw"
              placeholder={dataUrl as PlaceholderValue}
              className="h-full w-full rounded-[10px] object-cover"
            />
          </div>

          {userId === image.author.clerkId && (
            <div className="mt-6 flex gap-4">
              <Button
                className="paragraph-medium bg-purple-gradient bg-cover text-white"
                onClick={() => {
                  const imageUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${image.publicId}`;
                  window.open(imageUrl, '_blank');
                }}
              >
                View Full Size
              </Button>
              <DeleteConfirmation imageId={image._id} />
            </div>
          )}
        </section>
      </>
    );
  } catch (error) {
    console.error("Error fetching generated image:", error);
    notFound();
  }
};

export default GeneratedImageDetails; 