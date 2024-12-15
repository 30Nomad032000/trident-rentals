'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { PhoneInput } from '@/components/ui/phone-input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import { onSubmitAction } from '../server actions/formSubmit';
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from 'react-simple-captcha';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

export const registerSchema = z
  .object({
    type: z.string(),
    companyName: z.string(),
    firstName: z.string().min(1, { message: 'First Name is required' }),
    lastName: z.string().min(1, { message: 'Last Name is required' }),
    email: z.string().min(1, { message: 'Email is required' }).email(),
    phoneNumber: z.string().min(1, { message: 'Phone Number is required' }),
    agree: z.boolean(),
    captcha: z.string().min(1, { message: 'Captcha is required' }),
  })
  .superRefine(({ type, companyName }, refinementContext) => {
    if (type === 'vendor' && companyName.length < 1) {
      return refinementContext.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Company Name is required',
        path: ['companyName'],
      });
    }
  });

interface RegisterationFormProps {
  type: 'vendor' | 'tenant' | 'partner' | 'landlord';
  token: string;
}

export const RegisterForm: React.FC<RegisterationFormProps> = ({
  type,
  token,
}) => {
  const {
    register,
    formState: { errors },
    control,
    setValue,
    handleSubmit,
    reset,
  } = useForm<z.output<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      type: type,
      companyName: '',
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      agree: false,
      captcha: '',
    },
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleAgreeClick = (bool: boolean) => {
    setValue('agree', bool);
  };

  const generateFormData = (
    type: 'vendor' | 'tenant' | 'partner' | 'landlord',
    data: z.output<typeof registerSchema>
  ): FormData => {
    const formData = new FormData();

    switch (type) {
      case 'tenant':
        formData.append(
          'Name',
          `{"first_name":"${data.firstName}","last_name":"${data.lastName}","status":"add"}`
        );
        formData.append('Phone_Number', data.phoneNumber);
        formData.append('Email', data.email);
        formData.append(
          'I_adhere_to_Trident_Rentals_Terms_and_Conditions',
          data.agree.toString()
        );
        break;

      case 'partner':
        formData.append(
          'Name1',
          `{"first_name":"${data.firstName}","last_name":"${data.lastName}","status":"add"}`
        );
        formData.append('Phone_Number', data.phoneNumber);
        formData.append('Email', data.email);
        formData.append(
          'I_read_and_agreed_terms_and_conditions',
          data.agree.toString()
        );
        break;

      case 'vendor':
        formData.append('Company_Name', data.companyName);
        formData.append(
          'Business_Owner',
          `{"first_name":"${data.firstName}","last_name":"${data.lastName}","status":"add"}`
        );
        formData.append('Mobile_Number1', data.phoneNumber);
        formData.append('Email', data.email);
        formData.append(
          'I_have_read_and_agreed_the_terms_and_conditions',
          data.agree.toString()
        );
        break;

      default:
        throw new Error(`Unsupported type: ${type}`);
    }

    return formData;
  };

  const onSubmit = async (data: z.output<typeof registerSchema>) => {
    setLoading(true);
    if (!validateCaptcha(data.captcha)) {
      setLoading(false);
      toast.error('Verification Failed, Please try again!!!');
    } else {
      const formData = generateFormData(type, data);
      const res = await onSubmitAction(formData, token, type);
      if (res.message === 'Data Added Successfully') {
        reset();
        setLoading(false);
        toast.success('Registered Successfully! 🎉');
      } else {
        setLoading(false);
        toast.error(
          'Please ensure all required fields are filled out correctly and try again.'
        );
      }
    }
  };

  return (
    <div className="p-5 border border-[#172540] rounded-[10px] flex flex-col gap-6 relative">
      {type === 'vendor' ? (
        <div className="relative">
          <label htmlFor="companyName" className="text-[14px] text-black">
            Company Name
          </label>
          <Input
            type="text"
            id="companyName"
            className="bg-white text-black"
            {...register('companyName')}
          />
          {errors.companyName?.message && (
            <p className="text-xs text-red-500 absolute -bottom-5">
              {String(errors.companyName?.message)}
            </p>
          )}
        </div>
      ) : null}
      <div className="grid grid-cols-2 gap-x-5">
        <div className="relative">
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
        <div className="relative">
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
      <div className="relative">
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
      <div className="relative">
        <label htmlFor="email" className="text-[14px] text-black">
          Phone Number
        </label>
        <Controller
          control={control}
          name="phoneNumber"
          render={({ field }) => (
            <PhoneInput
              dark
              defaultCountry="US"
              className="bg-white text-black shadow-sm"
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
        <Checkbox id="terms1" onCheckedChange={handleAgreeClick} />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor="terms1"
            className="text-base font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I have read and agreed to the
            <span className="text-[#003399] ml-1 hover:font-medium">
              <Link href="https://creatorapp.zohopublic.com/tridentrental/trident-rental/form-perma/Landlord_Terms_Conditions/27tKXB2RSOwAXWWDEBpud0EOJUEv9ANhbm4GDxUR4fe2yvTKmgX54C1RXr1zfMbzQ160ybqyv0Jv2r1N0H1Vt3WaXy5YtQyMsaAM">
                Terms and Conditions*
              </Link>
            </span>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-5 pb-5">
        <div className="relative">
          <label htmlFor="captcha" className="text-[14px] text-black">
            Verification Code
          </label>
          <Input
            type="text"
            id="captcha"
            className="bg-white text-black"
            {...register('captcha')}
          />
          {errors.captcha?.message && (
            <p className="text-xs text-red-500 absolute -bottom-5">
              {String(errors.captcha?.message)}
            </p>
          )}
        </div>
        <LoadCanvasTemplate />
      </div>

      <Button
        disabled={loading}
        onClick={handleSubmit(onSubmit)}
        className="px-[30px] py-[10px] w-fit text-base font-normal bg-[#003399] absolute -bottom-4 left-1/2 transform -translate-x-1/2 "
      >
        {loading ? <Loader2 className="animate-spin" /> : 'I’m Interested'}
      </Button>
    </div>
  );
};
