import Image from "next/image";

export const Footer = () => {
  return (
    <div className="flex flex-col gap-0">
      <div className="bg-[#172540] px-[25px] md:px-[100px] lg:px-[200px] py-12 grid grid-cols-1 lg:grid-cols-6 border-b border-white gap-y-8">
        <div className="col-span-1 lg:col-span-3">
          <Image
            src="/footerLogo.svg"
            alt="logo"
            width={100}
            height={100}
            className="w-[136px] h-8"
          />
        </div>
        <div className="col-span-1 lg:col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-24 text-white text-base font-normal">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="flex flex-col gap-4">
              <div>Home</div>
              <div>About</div>
              <div>Properties</div>
              <div>Register As</div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="text-nowrap">Terms and Conditions</div>
              <div>Privacy Policy</div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="underline text-xl">CONTACT US</div>
            <div className="flex gap-4 items-center">
              <Image
                src="/call.svg"
                alt="call"
                className="size-5"
                height={100}
                width={100}
              />
              678 983 2042
            </div>
            <div className="flex gap-4 items-center">
              <Image
                src="/email.svg"
                alt="email"
                className="size-5"
                height={100}
                width={100}
              />
              info@tridentrent.com
            </div>
            <div className="flex gap-4 items-center text-nowrap">
              <Image
                src="/location.svg"
                alt="location"
                className="size-5"
                height={100}
                width={100}
              />
              6110 McFarland Station Drive, Suite #904
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#172540] px-[25px] md:px-[100px] lg:px-[200px] py-7 flex items-center justify-center text-center text-white text-base font-normal">
        All Rights Reserved © 2024 · Trident Rental LLC
      </div>
    </div>
  );
};
