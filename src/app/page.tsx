import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, Edit, Sparkles, Users } from "lucide-react";
import genie from "../../public/genie.png";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 mt-10 md:mt-0">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6 flex md:flex-row items-center justify-center">
            <div className="flex flex-col items-center space-y-4 text-center w-2/3">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-start md:text-center">
                  <span className="text-primary font-extrabold">
                    AI Partner
                  </span>{" "}
                  <span className="md:hidden"><br /></span>
                  for Crafting <br />
                  Perfect{" "}
                  <span className="text-primary font-extrabold">
                    Essays
                  </span>{" "}
                  and <span className="text-primary font-extrabold">Blogs</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 text-lg md:text-xl dark:text-gray-400 text-start md:text-center">
                  Speed up your writing process with AI-powered tools that
                  refine, edit, and enhance your work.
                </p>
                <div className="md:flex gap-4 w-full items-center justify-center mt-6 hidden">
                  <Button size="lg">Get Started</Button>
                  <Button size="lg" variant="outline">Learn More</Button>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4">
              <div className="genie-wrapper p-4">
                <div className="shine-effect"></div>
                <Image
                  height={350}
                  src={genie}
                  alt="genie"
                  className="floating genie-image"
                  style={{ 
                    mixBlendMode: 'overlay'
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-4 w-full items-center justify-center mt-10 md:hidden">
            <Button size="lg">Get Started</Button>
            <Button size="lg" variant="outline">Learn More</Button>
          </div>
        </section>
      </main>
    </div>
  );
}