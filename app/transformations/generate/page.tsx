import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import Header from "@/components/shared/Header";
import { getUserById } from "@/lib/actions/user.actions";
import GenerationForm from "@/components/shared/GenerationForm";
import { Toaster } from "@/components/ui/toaster";

const GenerateImagePage = async () => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const user = await getUserById(userId);

  return (
    <>
      <Header 
        title="AI Image Generation"
        subtitle="Transform your ideas into stunning images with AI"
      />
    
      <section className="mt-10">
        <GenerationForm
          userId={user._id}
          creditBalance={user.creditBalance}
        />
      </section>
      
      <Toaster />
    </>
  );
};

export default GenerateImagePage; 