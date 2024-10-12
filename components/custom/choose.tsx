import Image from "next/image";

export const Choose = () => {
  return (
    <div className="px-[50px] md:px-[100px] lg:px-[200px] py-12 flex flex-col justify-center items-center gap-4">
      <div className="flex flex-col">
        <div className="text-4xl font-medium text-center">
          Why Choose Trident Property Management ?
        </div>
        <div className="flex justify-center items-center relative right-14 lg:right-28">
          <Image
            src="/underline1.svg"
            alt="underline"
            width={100}
            height={100}
          />
        </div>
      </div>
      <div className="flex justify-center items-center">
        <p className="w-full lg:w-3/5 text-center">
          Join us at Trident Property Management as we pave the way for a new
          era of property management that is both intelligent and affordable.
          Experience the difference that AI can make in simplifying your
          property management needs while ensuring affordability for all.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-20 gap-y-10 py-10">
        <div className="flex flex-col items-center justify-center gap-7">
          <Image
            src="/project.svg"
            alt="choose"
            width={100}
            height={100}
            className="size-16"
          />
          <div className="flex flex-col items-center justify-center gap-1">
            <div className="text-xl text-[#172540] font-medium">Innovative Technology</div>
            <p className="text-center text-base">
              We harness the power of AI to deliver unparalleled property
              management solutions.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-7">
          <Image
            src="/afford.svg"
            alt="choose"
            width={100}
            height={100}
            className="size-16"
          />
          <div className="flex flex-col items-center justify-center gap-1">
            <div className="text-xl text-[#172540] font-medium">Affordability</div>
            <p className="text-center text-base">
              We are committed to providing quality housing options at
              competitive prices.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-7">
          <Image
            src="/customer.svg"
            alt="choose"
            width={100}
            height={100}
            className="size-16"
          />
          <div className="flex flex-col items-center justify-center gap-1">
            <div className="text-xl text-[#172540] font-medium">Customer-Centric Approach</div>
            <p className="text-center text-base">
              Our team prioritizes customer satisfaction and strives to exceed
              expectations at every turn.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
