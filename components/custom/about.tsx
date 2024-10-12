import { CustomFontText } from "../ui/customFontText";

export const About = () => {
  return (
    <div className="px-[50px] md:px-[100px] lg:px-[200px] py-10 flex gap-20 justify-center items-center">
      <div className="font-bold text-[64px] text-[#003399] text-nowrap flex items-start justify-center">
        <CustomFontText>About Us</CustomFontText>
      </div>
      <p className="text-base text-[#393939]">
        Trident Property Management is a forward-thinking property management
        company that leverages the power of AI technology to streamline
        operations, enhance efficiency, and provide top-notch services to
        property owners and tenants alike. Our team is dedicated to redefining
        the standards of property management by combining innovation with
        affordability.
      </p>
    </div>
  );
};
