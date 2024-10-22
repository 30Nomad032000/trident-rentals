import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export const ContactForm = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="p-10 bg-[url('/contactFormBg.svg')] bg-cover rounded-[20px] my-12">
        <div className="h-[653px] w-full bg-no-repeat bg-center flex items-center justify-center ">
          <div className="grid grid-cols-1 lg:grid-cols-2 h-full w-full">
            <div className="text-6xl text-white font-bold leading-[96px] hidden lg:block lg:w-auto lg:h-auto lg:p-8 w-0 h-0 p-0">
              Let’s Get <br /> Connected
            </div>
            <div className="text-4xl text-white font-bold  block lg:hidden">
              Let’s Get Connected
            </div>
            <div className="h-full flex justify-end">
              <form className="h-full w-full lg:max-w-[590px] bg-gray-100 rounded-[20px] bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-40 p-8 flex flex-col gap-5 items-center">
                <div className="w-full">
                  <label htmlFor="name" className="text-[14px] text-white">
                    Name
                  </label>
                  <Input
                    type="text"
                    id="name"
                    className="bg-white text-black"
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="email" className="text-[14px] text-white">
                    Email
                  </label>
                  <Input
                    type="email"
                    id="email"
                    className="bg-white text-black"
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="phone" className="text-[14px] text-white">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    id="phone"
                    className="bg-white text-black"
                  />
                </div>
                <div className="w-full h-full pb-4">
                  <label htmlFor="message" className="text-[14px] text-white">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    className="w-full h-full bg-white text-black"
                  ></Textarea>
                </div>
                <Button className="bg-[#00CCFF] hover:bg-[#00CCFF] text-white border-none px-[30px] py-[10px] w-fit text-base hover:text-white font-normal">
                  Submit
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
