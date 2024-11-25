'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { PhoneInput } from '@/components/ui/phone-input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

export const registerSchema = z.object({
  firstName: z.string().min(1, { message: 'First Name is required' }),
  lastName: z.string().min(1, { message: 'Last Name is required' }),
  email: z.string().min(1, { message: 'Email is required' }).email(),
  phoneNumber: z.string().min(1, { message: 'Phone Number is required' }),
  agree: z.boolean(),
});

export const RegisterForm = () => {
  const {
    register,
    formState: { errors },
    control,
  } = useForm<z.output<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
    },
  });

  return (
    <div className="p-5 border border-[#172540] rounded-[10px] flex flex-col gap-4 relative">
      <div className="grid grid-cols-2 gap-x-5">
        <div>
          <label htmlFor="firstName" className="text-[14px] text-black">
            First Name
          </label>
          <Input
            type="text"
            id="firstName"
            className="bg-white text-black"
            {...register('firstName')}
          />
          {errors.firstName?.message && (
            <p className="text-xs text-red-500 absolute -bottom-5">
              {String(errors.firstName?.message)}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="lastName" className="text-[14px] text-black">
            Last Name
          </label>
          <Input
            type="text"
            id="lastName"
            className="bg-white text-black"
            {...register('lastName')}
          />
          {errors.lastName?.message && (
            <p className="text-xs text-red-500 absolute -bottom-5">
              {String(errors.lastName?.message)}
            </p>
          )}
        </div>
      </div>
      <div>
        <label htmlFor="email" className="text-[14px] text-black">
          Email
        </label>
        <Input
          type="text"
          id="email"
          className="bg-white text-black"
          {...register('email')}
        />
        {errors.email?.message && (
          <p className="text-xs text-red-500 absolute -bottom-5">
            {String(errors.email?.message)}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="email" className="text-[14px] text-black">
          Phone Number
        </label>
        <Controller
          control={control}
          name="phoneNumber"
          render={({ field }) => (
            <PhoneInput
              className="bg-white text-black rounded-md border border-input text-sm shadow-sm transition-colors"
              onChange={field.onChange}
              onBlur={field.onBlur}
              value={field.value}
            />
          )}
        />
        {errors.phoneNumber?.message && (
          <p className="text-xs text-red-500 absolute -bottom-5">
            {String(errors.phoneNumber?.message)}
          </p>
        )}
      </div>

      <div className="items-center flex space-x-2 py-4">
        <Checkbox id="terms1" />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor="terms1"
            className="text-base font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I have read and agreed to the
            <span className="text-[#003399]"> Terms and Conditions*</span>
          </label>
        </div>
      </div>

      <Button className="px-[30px] py-[10px] w-fit text-base font-normal bg-[#003399] absolute -bottom-4 left-1/2 transform -translate-x-1/2 ">
        I’m Interested
      </Button>
    </div>
  );
};
