"use-client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

export const RegisterForm = () => {
  return (
    <div className="p-5 border border-[#172540] rounded-[10px] flex flex-col gap-4 relative">
      <div className="grid grid-cols-2 gap-x-5">
        <div>
          <label htmlFor="firstName" className="text-[14px] text-black">
            First Name
          </label>
          <Input type="text" id="firstName" className="bg-white text-black" />
        </div>
        <div>
          <label htmlFor="lastName" className="text-[14px] text-black">
            Last Name
          </label>
          <Input type="text" id="lastName" className="bg-white text-black" />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="text-[14px] text-black">
          Email
        </label>
        <Input type="text" id="email" className="bg-white text-black" />
      </div>
      <div>
        <label htmlFor="email" className="text-[14px] text-black">
          Phone Number
        </label>
        <Input type="text" id="phone" className="bg-white text-black" />
      </div>

      <div className="items-center flex space-x-2 py-4">
        <Checkbox id="terms1" />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor="terms1"
            className="text-base font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I read and agreed{" "}
            <span className="text-[#003399]">Terms and Conditions*</span>
          </label>
        </div>
      </div>

      <Button className="px-[30px] py-[10px] w-fit text-base font-normal bg-[#003399] absolute -bottom-4 left-1/2 transform -translate-x-1/2 ">I’m Interested</Button>
    </div>
  );
};
