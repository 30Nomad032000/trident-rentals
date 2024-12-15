import Image from 'next/image';
import Link from 'next/link';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="flex flex-col gap-0 bg-[#172540] px-4 ">
      {/* Main content area */}
      <div className="container mx-auto py-8 lg:py-12 grid grid-cols-1 lg:grid-cols-6 gap-y-8 lg:gap-y-0 border-b border-white">
        {/* Logo and description */}
        <div className="col-span-1 lg:col-span-2 flex flex-col gap-6 xl:col-span-3">
          <Link href={'/'}>
            <Image
              src="/footerLogo.svg"
              alt="logo"
              width={136}
              height={32}
              className="w-[100px] lg:w-[136px] h-8"
            />
          </Link>
          <div className="text-white text-xs md:text-sm  font-normal max-w-[600px] pr-6">
            At Trident Property Management, we are revolutionizing the world of
            property management through the seamless integration of cutting-edge
            artificial intelligence and a steadfast commitment to making quality
            housing accessible and affordable for all.
          </div>
        </div>

        {/* Links and contact details */}
        <div className="col-span-1 lg:col-span-4 xl:col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-y-8 lg:gap-y-0 lg:gap-24 text-white text-sm md:text-base font-normal">
          {/* Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            <div className="flex flex-col gap-2 md:gap-4">
              <div>
                <Link href="/">Home</Link>
              </div>
              <div>
                <Link href="/properties">Properties</Link>
              </div>
              <div>
                <Link href="/contact">Contact Us</Link>
              </div>
            </div>
            {/* <div className="flex flex-col gap-2 md:gap-4">
              <div className="whitespace-nowrap">Terms and Conditions</div>
              <div>Privacy Policy</div>
            </div> */}
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <div className="underline text-lg md:text-xl">CONTACT US</div>
            <div className="flex gap-3 md:gap-4 items-center">
              <Image
                src="/call.svg"
                alt="call"
                width={24}
                height={24}
                className="w-5 h-5"
              />
              <span className="text-sm md:text-base">
                <Link href="tel:678 983 2042" type="tel">
                  678 983 2042
                </Link>
              </span>
            </div>
            <div className="flex gap-3 md:gap-4 items-center">
              <Image
                src="/email.svg"
                alt="email"
                width={24}
                height={24}
                className="w-5 h-5"
              />
              <span className="text-sm md:text-base">
                <Link href="mailto:info@tridentrent.com">
                  info@tridentrent.com
                </Link>
              </span>
            </div>
            <div className="flex gap-3 md:gap-4 items-center">
              <Image
                src="/location.svg"
                alt="location"
                width={24}
                height={24}
                className="w-5 h-5"
              />
              <span className="text-sm md:text-base text-nowrap">
                <Link
                  href="https://maps.app.goo.gl/bvoZQpCQ5qazU57SA"
                  target="_blank"
                >
                  6110 McFarland Station Drive, Suite #904
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="bg-[#172540] px-4 md:px-8 lg:px-16 py-5 md:py-7 flex items-center justify-center text-center text-white text-xs md:text-base font-normal">
        {` All Rights Reserved © ${currentYear} · Trident Rental LLC`}
      </div>
    </div>
  );
};
