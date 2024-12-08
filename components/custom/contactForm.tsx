import { getAccessToken } from '@/lib/zohoAuth';
import { ContactForm as Form } from '../../app/contact/components/contactForm';

export const ContactForm = async () => {
  const token = await getAccessToken();
  return (
    <div className="container mx-auto px-4">
      <div className="p-10 bg-[url('/contactFormBg.svg')] bg-cover rounded-[20px] my-12">
        <div className="h-fit w-full bg-no-repeat bg-center flex items-center justify-center ">
          <div className="grid grid-cols-1 lg:grid-cols-2 h-full w-full">
            <div className="text-6xl text-white font-bold leading-[96px] hidden lg:block lg:w-auto lg:h-auto lg:p-8 w-0 h-0 p-0">
              Let’s Get <br /> Connected
            </div>
            <div className="text-4xl text-white font-bold  block lg:hidden">
              Let’s Get Connected
            </div>
            <div className="h-full flex justify-end">
              <Form token={token} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
