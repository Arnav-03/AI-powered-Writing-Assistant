import Image from "next/image";
import genie from "../../../public/dashboardgenie.png";
import { AppwriteUser } from "@/lib/types";

interface WelcomeMessageProps {
  user: AppwriteUser | null;
}

export default function WelcomeMessage({ user }: WelcomeMessageProps) {
  return (
    <div className="text-background-foreground mt-[90px]  mx-1.5 lg:mx-8  rounded-xl border-primary-foreground  bg-primary">
    <div className="flex justify-between">
      <div className="items-start w-3/4 flex flex-col">
        <div className="font-bold text-[17px]  md:text-2xl lg:text-3xl p-2 lg:p-10 text-[#fffefe] dashboard  ">
          ✨By the stars and sands of time, <br /> I bid thee welcome,{" "}
          {user ? user.name : "honored guest"} ! <br />
          The magic of the written word awaits✨
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Image
          priority
          src={genie}
          alt="genie"
          className="h-[110px] md:h-[180px] w-auto  "
        />
      </div>
    </div>
    </div>
  );
}
