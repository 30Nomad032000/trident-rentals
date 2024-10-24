'use-client'

import { Footer } from "@/components/custom/footer";
import { Header } from "@/components/custom/header";
import { CustomFontText } from "@/components/ui/customFontText";
import Image from "next/image";
import { RegisterForm } from "./components/registerForm";

export default function Page() {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-2 gap-x-5">
        <div>
          <div className="flex gap-2">
            <CustomFontText className="text-2xl font-bold sm:text-4xl lg:text-4xl 2xl:text-5xl">
              Discover Your 
            </CustomFontText>
            <CustomFontText className="text-2xl text-[#00CCFF] font-bold sm:text-4xl lg:text-4xl 2xl:text-5xl">
              Dream Home !
            </CustomFontText>
          </div>
          <div>
            <Image
              src="./register.svg"
              alt="register"
              height={100}
              width={100}
              className="w-full h-auto relative -top-10 sm:-top-20 lg:-top-16"
            />
          </div>
        </div>
        <div>
          <div className="text-[#172540] text-2xl font-semibold flex justify-center pb-3">
            Register As A tenet
          </div>
          <RegisterForm />
        </div>
      </div>
      <Footer />
    </>
  );
}
