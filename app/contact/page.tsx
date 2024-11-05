import { Footer } from '@/components/custom/footer';
import { Header } from '@/components/custom/header';
import { CustomFontText } from '@/components/ui/customFontText';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';

export default function Page() {
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
              <div className="px-14 py-14">
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
              <form className="h-full w-full lg:max-w-[590px] bg-gray-100 rounded-[20px] bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-40 flex flex-col gap-5 items-center border p-6 border-white">
                <div className="text-xl text-white font-medium">Contact Us</div>
                <div className="grid grid-cols-2 gap-x-8 w-full">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="text-[14px] text-white"
                    >
                      First Name
                    </label>
                    <Input
                      type="text"
                      id="firstName"
                      className="bg-white text-black border border-white"
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="lastName"
                      className="text-[14px] text-white"
                    >
                      Last Name
                    </label>
                    <Input
                      type="text"
                      id="lastName"
                      className="bg-white text-black border border-white"
                    />
                  </div>
                </div>
                <div className="w-full">
                  <label htmlFor="mail" className="text-[14px] text-white">
                    Email
                  </label>
                  <Input
                    type="text"
                    id="mail"
                    className="bg-white text-black border border-white"
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="phone" className="text-[14px] text-white">
                    Phone Number
                  </label>
                  <Input
                    type="text"
                    id="phone"
                    className="bg-white text-black border border-white"
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="state" className="text-[14px] text-white">
                    State
                  </label>
                  <Input
                    type="text"
                    id="state"
                    className="bg-white text-black border border-white"
                  />
                </div>
                <div className="w-full h-full pb-10">
                  <label htmlFor="mail" className="text-[14px] text-white">
                    How can we help you ?
                  </label>
                  <Textarea className="h-full bg-white text-black" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
