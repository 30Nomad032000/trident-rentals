import { Footer } from '@/components/custom/footer';
import { Header } from '@/components/custom/header';
import { CustomFontText } from '@/components/ui/customFontText';
import Image from 'next/image';
import { ContactForm } from './components/contactForm';
import { getAccessToken } from '@/lib/zohoAuth';

export default async function Page() {
  const token = await getAccessToken();
  return (
    <>
      <Header />
      <div className="container mx-auto max-w-screen-xl px-4 py-10">
        <div className="lg:bg-[url('/contactSection.svg')] bg-no-repeat bg-contain bg-center w-full">
          {/* Use min-h to ensure proper spacing; remove fixed height */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-0 py-10 ">
            <div className="flex flex-col items-center lg:items-start justify-start gap-8 lg:gap-12 px-0">
              <div className="flex flex-col items-center lg:items-start">
                <CustomFontText className="text-3xl md:text-4xl lg:text-5xl font-bold text-center lg:text-left">
                  Let’s Get Connected
                </CustomFontText>
                <div className="mt-2">
                  <Image
                    src="/underline1.svg"
                    alt="underline"
                    height={100}
                    width={100}
                    className="h-auto w-24 md:w-28"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-6 items-start justify-center w-full">
                <div className="flex gap-4 items-center text-lg md:text-xl font-medium w-full">
                  <Image
                    src="/phone.svg"
                    alt="phone icon"
                    height={24}
                    width={24}
                    className="h-6 w-6"
                  />
                  <span>678 - 983 - 2042</span>
                </div>
                <div className="flex gap-4 items-center text-lg md:text-xl font-medium">
                  <Image
                    src="/mail.svg"
                    alt="mail icon"
                    height={24}
                    width={24}
                    className="h-6 w-6"
                  />
                  <span>info@tridentrent.com</span>
                </div>
                <div className="flex gap-4 items-center text-lg md:text-xl font-medium">
                  <Image
                    src="/locationPin.svg"
                    alt="location icon"
                    height={24}
                    width={24}
                    className="h-6 w-6"
                  />
                  <span>6110 McFarland Station Drive, Suite #904</span>
                </div>
              </div>
              <div className="w-full px-4 lg:px-14 py-8 lg:py-16 flex justify-center lg:justify-start lg:pt-24">
                <Image
                  src="/map.svg"
                  alt="map"
                  height={288}
                  width={504}
                  className="w-full max-w-md h-auto"
                />
              </div>
            </div>
            <div className="bg-[url('/contactFormBg.svg')] lg:bg-none px-4 py-10 rounded-[20px] lg:pl-0 ">
              <ContactForm title token={token} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
