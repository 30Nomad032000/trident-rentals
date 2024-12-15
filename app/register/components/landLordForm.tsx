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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@radix-ui/react-label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';
import { PartnerInfo } from '@/types/types';

export const registerSchema = z
  .object({
    type: z.string(),
    registerdAs: z.string(),
    companyName: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().min(1, { message: 'Email is required' }).email(),
    phoneNumber: z.string().min(1, { message: 'Phone Number is required' }),
    agree: z.boolean(),
    captcha: z.string().min(1, { message: 'Captcha is required' }),
    referred: z.string(),
    partnerInfo: z.string().optional(),
  })
  .superRefine(
    ({ registerdAs, firstName, lastName, companyName }, refinementContext) => {
      if (registerdAs === 'owner' && firstName.length < 1) {
        refinementContext.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'First Name is required',
          path: ['firstName'],
        });
      }

      if (registerdAs === 'owner' && lastName.length < 1) {
        refinementContext.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Last Name is required',
          path: ['lastName'],
        });
      }
      if (registerdAs === 'company' && companyName.length < 1) {
        refinementContext.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Company Name is required',
          path: ['companyName'],
        });
      }
    }
  );

interface LandLordFormProps {
  token: string;
  partnerData: PartnerInfo[] | undefined;
}

export const LandLordForm: React.FC<LandLordFormProps> = ({
  token,
  partnerData,
}) => {
  const {
    register,
    formState: { errors },
    control,
    setValue,
    handleSubmit,
    reset,
    watch,
  } = useForm<z.output<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      registerdAs: 'owner',
      type: 'landlord',
      companyName: '',
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      agree: false,
      captcha: '',
      referred: 'No',
    },
  });

  const [loading, setLoading] = useState(false);

  const filteredPartnerData = partnerData?.filter(
    (item) => item.Payment_Done === 'Paid'
  );

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleAgreeClick = (bool: boolean) => {
    setValue('agree', bool);
  };

  const generateFormData = (
    data: z.output<typeof registerSchema>
  ): FormData => {
    const formData = new FormData();
    if (data.firstName && data.lastName) {
      formData.append(
        'Name1',
        `{"first_name":"${data.firstName}","last_name":"${data.lastName}","status":"add"}`
      );
    }
    if (data.companyName.length !== 0) {
      formData.append('Name', data.companyName);
    }
    formData.append('Have_you_been_referred_by_Partner', data.referred);
    formData.append('Phone_Number', data.phoneNumber);
    formData.append('Email', data.email);
    formData.append('I_agreed_the_terms_condition', data.agree.toString());

    return formData;
  };

  const onSubmit = async (data: z.output<typeof registerSchema>) => {
    setLoading(true);
    if (!validateCaptcha(data.captcha)) {
      setLoading(false);
      toast.error('Verification Failed, Please try again!!!');
    } else {
      const formData = generateFormData(data);
      const res = await onSubmitAction(formData, token, 'landlord');
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

  const handleRegisterAsChange = (value: string) => {
    setValue('registerdAs', value);
  };

  const handleRefererChange = (value: string) => {
    setValue('referred', value);
  };

  const handlePartnerChange = (value: string) => {
    setValue('partnerInfo', value);
  };

  const registerdAs = watch('registerdAs');
  const referred = watch('referred');

  return (
    <div className="p-5 border border-[#172540] rounded-[10px] flex flex-col gap-6 relative">
      <div className="flex flex-col gap-5">
        <Label>Register As</Label>
        <RadioGroup
          className="dark flex flex-row gap-x-5"
          defaultValue="owner"
          onValueChange={handleRegisterAsChange}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem className="dark" value="owner" id="owner" />
            <Label htmlFor="owner" className="text-[14px] text-black">
              Owner
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem className="dark" value="company" id="company" />
            <Label htmlFor="company" className="text-[14px] text-black">
              Company
            </Label>
          </div>
        </RadioGroup>
      </div>
      {registerdAs === 'company' ? (
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
      ) : (
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
      )}

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
              <Link
                href="https://creatorapp.zohopublic.com/tridentrental/trident-rental/form-perma/Landlord_Terms_Conditions/27tKXB2RSOwAXWWDEBpud0EOJUEv9ANhbm4GDxUR4fe2yvTKmgX54C1RXr1zfMbzQ160ybqyv0Jv2r1N0H1Vt3WaXy5YtQyMsaAM"
                target="_blank"
              >
                Terms and Conditions*
              </Link>
            </span>
          </label>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <Label>Have you been referred by partner?</Label>
        <RadioGroup
          className="dark flex flex-row gap-x-5"
          defaultValue="No"
          onValueChange={handleRefererChange}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem className="dark" value="Yes" id="Yes" />
            <Label htmlFor="Yes" className="text-[14px] text-black">
              Yes
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem className="dark" value="No" id="No" />
            <Label htmlFor="No" className="text-[14px] text-black">
              No
            </Label>
          </div>
        </RadioGroup>
      </div>

      {referred === 'Yes' ? (
        <div className="w-1/2">
          <Select onValueChange={handlePartnerChange}>
            <SelectTrigger className="w-[240px] h-11">
              <SelectValue placeholder="-Select-" />
            </SelectTrigger>
            <SelectContent>
              {filteredPartnerData?.length !== 0
                ? filteredPartnerData?.map((item) => (
                    <SelectItem
                      value={item.Name1.zc_display_value}
                      key={item.ID}
                    >
                      {item.Name1.zc_display_value}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        </div>
      ) : null}

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
