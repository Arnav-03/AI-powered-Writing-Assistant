import Image from "next/image";
import genie from "../../public/loading.png";
export default function Loading() {
  return (
    <div className="min-h-screen flex-col flex items-center justify-center w-full ">
      <div className="flex  p-8  justify-between ">
        <Image
          priority
          height={200}
          src={genie}
          alt="genie"
          className="floating genie-image"
        />
        <div className="loader mt-[-30px] ml-[-75px]"></div>
      </div>
    </div>
  );
}
