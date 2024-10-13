import Image from "next/image";

export const Services = () => {
  return (
    <div className="px-[25px] md:px-[100px] lg:px-[50px] xl:px-[200px] py-12 flex flex-col justify-center items-center gap-14">
      <div className="flex flex-col justify-center items-center gap-5">
        <div className="text-4xl font-medium text-[#393939] text-center">
          Services We Offer
        </div>
        <div className="w-full lg:w-3/5 text-center">
          Join us at Trident Property Management as we pave the way for a new
          era of property management that is both intelligent and affordable.
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-24 gap-y-8">
        <div className="bg-[url('/AI.svg')] w-[336px] h-[444px] bg-no-repeat bg-cover p-4 flex flex-col items-start justify-between">
          <Image
            src="/arrow.svg"
            alt="arrow"
            height={100}
            width={100}
            className="size-12 ml-auto"
          />
          <div className="flex flex-col gap-2">
            <div className="text-xl font-medium text-white">
              AI-Powered Maintenance
            </div>
            <p className="text-base font-normal text-white">
              Our intelligent systems predict and prevent maintenance issues
              before they arise, ensuring properties are well-maintained and
              costs are kept low.
            </p>
          </div>
        </div>
        <div className="bg-[url('/Ten.svg')] w-[336px] h-[444px] bg-no-repeat bg-cover px-6 py-11 flex flex-col justify-end">
          <div className="text-3xl font-medium text-white">
            <div>
              Tenant <br /> Matching
            </div>
          </div>
        </div>
        <div className="bg-[url('/Fin.svg')] w-[336px] h-[444px] bg-no-repeat bg-cover px-6 py-11 flex flex-col justify-end">
          <div className="text-3xl font-medium text-white">
            <div>
              Financial <br /> Management
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
