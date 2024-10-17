import Image from "next/image";

export const Services = () => {
  return (
    <div className="container mx-auto px-4 py-12 flex flex-col justify-center items-center gap-14">
      <div className="flex flex-col justify-center items-center gap-5">
        <div className="text-4xl font-medium text-[#393939] text-center">
          Services We Offer
        </div>
        <div className="w-full lg:w-3/5 text-center">
          Join us at Trident Property Management as we pave the way for a new
          era of property management that is both intelligent and affordable.
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-24 gap-y-8 w-full">
        <div className="relative justify-items-center  h-[444px] rounded-[25px]  overflow-hidden group">
          <div className="absolute inset-0 bg-[url('/AI.svg')] max-w-[336px] mx-auto bg-no-repeat bg-cover px-6 py-11 flex flex-col justify-end  transition-opacity duration-500 opacity-100 group-hover:opacity-0">
            <div className="text-3xl font-medium text-white">
              AI-Powered <br /> Maintenance
            </div>
          </div>
          <div className="absolute inset-0 bg-[url('/AI.svg')] bg-no-repeat bg-cover rounded-[25px]  overflow-hidden mx-auto  max-w-[336px] p-4 flex flex-col items-start justify-between transition-opacity duration-500 opacity-0 group-hover:opacity-100">
            <div className="absolute inset-0 bg-black opacity-30"></div>
            <Image
              src="/arrow.svg"
              alt="arrow"
              height={100}
              width={100}
              className="size-12 ml-auto relative z-10"
            />
            <div className="flex flex-col gap-2 relative z-10">
              <div className="text-xl font-medium text-white">
                AI-Powered Maintenance
              </div>
              <p className="text-base font-normal text-white">
                Using AI algorithms, we match tenants with properties that suit
                their preferences and budget, fostering positive renting
                experiences for all parties involved.
              </p>
            </div>
          </div>
        </div>

        <div className="relative  h-[444px] rounded-[25px]  overflow-hidden group">
          <div className="absolute inset-0 bg-[url('/Ten.svg')] bg-no-repeat max-w-[336px] mx-auto bg-cover px-6 py-11 flex flex-col justify-end  transition-opacity duration-500 opacity-100 group-hover:opacity-0">
            <div className="text-3xl font-medium text-white">
              Tenant <br /> Matching
            </div>
          </div>
          <div className="absolute inset-0 bg-[url('/Ten.svg')] bg-no-repeat bg-cover  rounded-[25px] max-w-[336px]  overflow-hidden mx-auto p-4 flex flex-col items-start justify-between transition-opacity duration-500 opacity-0 group-hover:opacity-100">
            <div className="absolute inset-0 bg-black opacity-30"></div>
            <Image
              src="/arrow.svg"
              alt="arrow"
              height={100}
              width={100}
              className="size-12 ml-auto relative z-10"
            />
            <div className="flex flex-col gap-2 relative z-10">
              <div className="text-xl font-medium text-white">
                Tenant Matching
              </div>
              <p className="text-base font-normal text-white">
                We provide transparent financial reports and optimize revenue
                streams to maximize profitability for property owners while
                keeping rents affordable for tenants.
              </p>
            </div>
          </div>
        </div>

        <div className="relative  h-[444px] rounded-[25px]  overflow-hidden group">
          <div className="absolute inset-0 bg-[url('/Fin.svg')] max-w-[336px]  bg-no-repeat bg-cover px-6 py-11 flex flex-col justify-end mx-auto transition-opacity duration-500 opacity-100 group-hover:opacity-0">
            <div className="text-3xl font-medium text-white">
              Financial <br /> Management
            </div>
          </div>
          <div className="absolute inset-0 bg-[url('/Fin.svg')] rounded-[25px]  overflow-hidden mx-auto max-w-[336px] bg-no-repeat bg-cover p-4 flex flex-col items-start justify-between transition-opacity duration-500 opacity-0 group-hover:opacity-100">
            <div className="absolute inset-0 bg-black opacity-30"></div>
            <Image
              src="/arrow.svg"
              alt="arrow"
              height={100}
              width={100}
              className="size-12 ml-auto relative z-10"
            />
            <div className="flex flex-col gap-2 relative z-10">
              <div className="text-xl font-medium text-white">
                Financial Management
              </div>
              <p className="text-base font-normal text-white">
                Our platform simplifies financial tracking and reporting, giving
                you real-time insights into your property&apos;s performance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
