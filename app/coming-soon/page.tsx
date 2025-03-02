import { Button } from "@/components/ui/button";
import Link from "next/link";

const ComingSoon = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-50">
      <div className="text-center space-y-6 p-8 max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-purple-600">Coming Soon!</h1>
        <p className="text-xl text-gray-600">
          We&apos;re working hard to bring you something amazing. Stay tuned!
        </p>
        <div className="pt-4">
          <Link href="/">
            <Button variant="default" className="bg-purple-600 hover:bg-purple-700">
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;