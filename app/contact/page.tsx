import { Footer } from '@/components/custom/footer';
import { Header } from '@/components/custom/header';
import { CustomFontText } from '@/components/ui/customFontText';
import Image from 'next/image';
import { ContactForm } from './components/contactForm';
import { getAccessToken } from '@/lib/zohoAuth';
import Link from 'next/link';

export default async function Page() {
  const token = await getAccessToken();
  return (
    <>
      <Header />
      <div className="container mx-auto max-w-screen-xl px-4 py-10">
        <div className="lg:bg-[url('/contactSection.svg')] bg-no-repeat bg-contain bg-center w-full">
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
                    className="h-6 w-6 "
                  />
                  <span>
                    <Link
                      href="https://maps.app.goo.gl/bvoZQpCQ5qazU57SA"
                      target="_blank"
                    >
                      6110 McFarland Station Drive, Suite #904
                    </Link>
                  </span>
                </div>
              </div>
              <div className="w-full px-4 lg:px-14 py-8 lg:py-16 flex justify-center lg:justify-start lg:pt-24">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3302.462544336023!2d-84.2527836!3d34.1345066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f59d943e4d73b5%3A0xd4909f9ce4103e4e!2s6110%20McFarland%20Station%20Dr%20suite%20904%2C%20Alpharetta%2C%20GA%2030004%2C%20USA!5e0!3m2!1sen!2sin!4v1734300300265!5m2!1sen!2sin"
                  width="504"
                  height="288"
                  className="rounded-[10px]"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
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
