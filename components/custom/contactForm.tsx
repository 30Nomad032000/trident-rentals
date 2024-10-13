import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export const ContactForm = () => {
  return (
    <div className="px-[25px] md:px-[100px] lg:px-[200px] py-10">
      <div className="bg-[url('/contactFormBg.svg')] h-[653px] w-full bg-no-repeat bg-center flex items-center justify-center rounded-[20px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full w-2/3">
          <div className="text-6xl text-white font-bold leading-[96px] pt-8 hidden lg:block">
            Let’s Get <br /> Connected
          </div>
          <div className="h-full py-9">
            <form className="h-full w-full bg-gray-100 rounded-[20px] bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-40 p-8 flex flex-col gap-5 items-center">
              <div className="w-full">
                <label htmlFor="name" className="text-[14px] text-white">
                  Name
                </label>
                <Input type="text" id="name" />
              </div>
              <div className="w-full">
                <label htmlFor="email" className="text-[14px] text-white">
                  Email
                </label>
                <Input type="email" id="email" />
              </div>
              <div className="w-full">
                <label htmlFor="phone" className="text-[14px] text-white">
                  Phone Number
                </label>
                <Input type="tel" id="phone" />
              </div>
              <div className="w-full h-full pb-4">
                <label htmlFor="message" className="text-[14px] text-white">
                  Message
                </label>
                <Textarea id="message" className="w-full h-full"></Textarea>
              </div>
              <Button className="bg-[#00CCFF] hover:bg-[#00CCFF] text-white border-none px-[30px] py-[10px] w-fit text-base hover:text-white font-normal">
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
