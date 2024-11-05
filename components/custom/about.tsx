import { CustomFontText } from '../ui/customFontText';

export const About = () => {
  return (
    <div className="container mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-4 items-center justify-items-center">
      <div className="font-bold text-[64px] text-[#003399] text-nowrap">
        <CustomFontText>About Us</CustomFontText>
      </div>
      <p className="col-span-3 text-base text-[#393939]">
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
