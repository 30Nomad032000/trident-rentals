'use client'; // Specify client-side rendering

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PhoneInput } from '@/components/ui/phone-input';
import { Textarea } from '@/components/ui/textarea';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { onSubmitAction } from './formSubmit';
import { toast } from 'sonner';

// Define validation schema for the contact form
export const contactSchema = z.object({
  firstName: z.string().min(1, { message: 'First Name is required' }),
  lastName: z.string().min(1, { message: 'Last Name is required' }),
  email: z.string().min(1, { message: 'Email is required' }).email(),
  phoneNumber: z.string().min(1, { message: 'Phone Number is required' }),
  state: z.string().min(1, { message: 'State is required' }),
  additionalText: z.string().optional(),
});

interface ContactFormProps {
  token: string;
  title?: boolean;
}

// ContactForm component
export const ContactForm: React.FC<ContactFormProps> = ({ token, title }) => {
  // Initialize form with validation schema and default values
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<z.output<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      state: 'Georgia',
      additionalText: '',
    },
  });

  // Handle form submission
  const onSubmit = async (data: z.output<typeof contactSchema>) => {
    const formData = new FormData();
    formData.append('Enter_your_Name', `${data.firstName} ${data.lastName}`);
    formData.append('Enter_your_Phone_Number', data.phoneNumber);
    formData.append('Enter_your_Email_Address', data.email);
    formData.append('Enter_your_City', data.state);
    formData.append('How_can_we_help_you', data.additionalText || '');

    const res = await onSubmitAction(formData, token || '');

    if (res.message === 'Data Added Successfully') {
      reset(); // Reset form on success
      toast.success(
        "Thank you! 🎉 Your message has been received. We'll be in touch shortly!"
      );
    } else {
      toast.error(
        'Please ensure all required fields are filled out correctly and try again.'
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="h-fit w-full lg:max-w-[590px] bg-gray-100 rounded-[20px] bg-clip-padding backdrop-filter backdrop-blur-[400px] bg-opacity-5 flex flex-col gap-5 items-center border p-6 border-white font-medium"
    >
      {title && (
        <div className="text-xl text-white font-medium">Contact Us</div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4 w-full">
        {/* First Name Input */}
        <div className="relative">
          <label htmlFor="firstName" className="text-[14px] text-white">
            First Name
          </label>
          <Input
            type="text"
            id="firstName"
            className="text-black border border-white"
            {...register('firstName')}
          />
          {errors.firstName && (
            <p className="text-xs text-red-500 absolute -bottom-5">
              {errors.firstName.message}
            </p>
          )}
        </div>

        {/* Last Name Input */}
        <div className="w-full relative">
          <label htmlFor="lastName" className="text-[14px] text-white">
            Last Name
          </label>
          <Input
            type="text"
            id="lastName"
            className="text-black border border-white"
            {...register('lastName')}
          />
          {errors.lastName && (
            <p className="text-xs text-red-500 absolute -bottom-5">
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>

      {/* Email Input */}
      <div className="w-full relative">
        <label htmlFor="mail" className="text-[14px] text-white">
          Email
        </label>
        <Input
          type="text"
          id="mail"
          className="text-black border border-white"
          {...register('email')}
        />
        {errors.email && (
          <p className="text-xs text-red-500 absolute -bottom-5">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Phone Number Input */}
      <div className="w-full relative">
        <label htmlFor="phone" className="text-[14px] text-white">
          Phone Number
        </label>
        <Controller
          control={control}
          name="phoneNumber"
          render={({ field }) => (
            <PhoneInput
              defaultCountry="US"
              className="bg-transparent border-white"
              {...field}
            />
          )}
        />
        {errors.phoneNumber && (
          <p className="text-xs text-red-500 absolute -bottom-5">
            {errors.phoneNumber.message}
          </p>
        )}
      </div>

      {/* State Input */}
      <div className="w-full relative">
        <label htmlFor="state" className="text-[14px] text-white">
          State
        </label>
        <Input
          type="text"
          id="state"
          className="text-black border border-white"
          {...register('state')}
        />
        {errors.state && (
          <p className="text-xs text-red-500 absolute -bottom-5">
            {errors.state.message}
          </p>
        )}
      </div>

      {/* Additional Textarea */}
      <div className="w-full h-full relative">
        <label htmlFor="additionalText" className="text-[14px] text-white">
          How can we help you?
        </label>
        <Textarea
          id="additionalText"
          className="h-[140px] text-black"
          {...register('additionalText')}
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="bg-[#00CCFF] hover:bg-[#00CCFF] text-white border-none px-[30px] py-[10px] text-base font-normal"
      >
        Submit
      </Button>
    </form>
  );
};
