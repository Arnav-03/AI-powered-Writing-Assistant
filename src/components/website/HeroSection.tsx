"use client";
import { Button } from "@/components/ui/button";
import genie from "../../../public/genie5.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();
  return (
    <section className="w-full py-12 md:py-16 lg:py-16  mt-16">
      <div className="container px-4 md:px-6 flex md:flex-row items-center justify-center">
        <div className="flex flex-col items-center space-y-4 text-center w-2/3">
          <div className="space-y-2 lg:w-4/5 tracking-wide">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl xl:7xl text-start md:text-start">
              <span className="text-primary font-extrabold">
                WritinGenie: <br />
              </span>
              AI Partner for Crafting Perfect
              <span className="text-primary font-extrabold mx-2">Essays</span>
              <span className="md:hidden">
                <br />
              </span>
              and <span className="text-primary font-extrabold  ">Blogs</span>
            </h1>
            <p className="mx-auto  text-gray-500 text-lg md:text-xl dark:text-gray-400 text-start ">
              Speed up your writing process with AI-powered tools that refine,
              edit, and enhance your work.
            </p>
            <div className="md:flex gap-4 w-full items-center justify-center mt-6 hidden">
              <Button onClick={() => router.push("/signup")} size="lg">
                Get Started
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">
          <div className="genie-wrapper p-4">
            <div className="dark:shine-effect"></div>
            <Image
              priority
              height={350}
              src={genie}
              alt="genie"
              className="floating genie-image"
              style={{
                mixBlendMode: "overlay",
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex gap-4 w-full items-center justify-center mt-10 md:hidden">
        <Button onClick={() => router.push("/signup")} size="lg">
          Get Started
        </Button>
        <Button size="lg" variant="outline">
          Learn More
        </Button>
      </div>
    </section>
  );
}
