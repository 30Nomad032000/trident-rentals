import Image from "next/image";
import { CustomFontText } from "../ui/customFontText";

export const Mission = () => {
  return (
    <div className="container mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-8">
      <div className="col-span-1 lg:col-span-2">
        <Image
          src="/mission.svg"
          alt="mission Image"
          className="w-full h-full object-cover rounded-[20px]"
          height={100}
          width={100}
        />
      </div>
      <div className="bg-[#F2F2F2] rounded-[20px] px-6 py-8 flex flex-col justify-between">
        <div className="flex justify-between">
          <div className="text-[#003399] text-[40px] leading-10">
            <CustomFontText>
              Our
              <br />
              Mission
            </CustomFontText>
          </div>
          <Image
            src="/arrow.svg"
            alt="arrow"
            height={100}
            width={100}
            className="size-10"
          />
        </div>
        <div>
          <p className="text-base">
            We believe that everyone deserves a safe, comfortable, and
            affordable place to call home. Through our AI-driven approach, we
            aim to optimize property management processes, reduce costs, and
            ultimately pass those savings on to our clients and residents.
          </p>
        </div>
      </div>
    </div>
  );
};
