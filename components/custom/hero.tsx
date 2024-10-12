import { Button } from "../ui/button";
import { CustomFontText } from "../ui/customFontText";
import Image from "next/image";

export const Hero = () => {
  return (
      <div className="px-[50px] md:px-[100px] lg:px-[50px] xl:px-[200px] py-10 h-fit grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-8">
        <div className="h-full flex flex-col items-center lg:items-start justify-center gap-8">
          <div className="bg-[#003399] w-fit px-4 py-1 rounded-full text-white text-[32px]">
            <CustomFontText>Property management solution</CustomFontText>
          </div>
          <div className="flex flex-col gap-2 items-end">
            <div className="text-[64px] font-semibold text-[#172540]">
              Search & Find <br />
              Luxury House
            </div>
            <Image
              src="/underline1.svg"
              className="w-64 h-8"
              width={100}
              height={100}
              alt="underline"
            />
          </div>
          <Button
            variant="outline"
            className="px-[30px] py-[10px] text-[#003399] border-[#003399] hover:text-[#003399] flex gap-3 font-normal text-base"
          >
            Know More
          </Button>
        </div>
        <div className="col-span-1 lg:col-span-2 relative">
          <Image
            src="/Hero1.svg"
            className="h-full w-full"
            alt="Hero Image 1"
            height={100}
            width={100}
          ></Image>
          <Image
            src="/Hero2.svg"
            className="w-2/6  absolute bottom-0 right-0"
            alt="Hero Image 2"
            height={100}
            width={100}
          ></Image>
        </div>
      </div>
     

  );
};
