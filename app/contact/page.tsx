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
      <div className="container mx-auto px-4 py-20 ">
        <div className="bg-[url('/contactSection.svg')] bg-no-repeat bg-contain bg-center w-full">
          <div className="h-[757px] grid grid-cols-1 lg:grid-cols-2 gap-x-20">
            <div className="pl-[152px] flex flex-col items-center justify-start gap-12">
              <div className="flex flex-col items-center justify-start">
                <CustomFontText className="text-5xl font-bold">
                  Lets Get Connected
                </CustomFontText>
                <Image
                  src="/underline1.svg"
                  alt="underline"
                  height={100}
                  width={100}
                />
              </div>
              <div className="flex flex-col gap-6 items-start justify-center w-full">
                <div className="flex gap-8 items-center text-xl font-medium w-full">
                  <Image
                    src="/phone.svg"
                    alt="phone icon"
                    height={100}
                    width={100}
                    className="size-10"
                  />
                  678 - 983 - 2042
                </div>
                <div className="flex gap-8 items-center text-xl font-medium">
                  <Image
                    src="/mail.svg"
                    alt="mail icon"
                    height={100}
                    width={100}
                    className="size-10"
                  />
                  info@tridentrent.com
                </div>
                <div className="flex gap-8 items-center text-xl font-medium">
                  <Image
                    src="/locationPin.svg"
                    alt="location icon"
                    height={100}
                    width={100}
                    className="size-10"
                  />
                  6110 McFarland Station Drive, Suite #904
                </div>
              </div>
              <div className="px-14 py-16">
                <Image
                  src="/map.svg"
                  alt="map"
                  height={100}
                  width={100}
                  className="w-[504px] h-[288px]"
                />
              </div>
            </div>
            <div className="pr-48 py-10 ">
              <ContactForm token={token} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
