'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

// Import Dialog components for the membership popup
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

interface ListingCardProps {
  image: string;
  name: string;
  space: string;
  bedrooms: string;
  bathrooms: string;
  address: string;
  price: string;
  index: number;
}

export const ListingCard: React.FC<ListingCardProps> = ({
  image,
  name,
  space,
  bedrooms,
  bathrooms,
  address,
  price,
  index,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track when to show the "Member or Sign Up" modal
  const [showInterestedDialog, setShowInterestedDialog] = useState(false);

  // Handle entire card click → open property details modal
  const handleCardClick = () => {
    router.push(pathname + '?' + createQueryString('isOpen', `true,${index}`), {
      scroll: false,
    });
  };

  // Create/update query params
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  // When user clicks "I'm Interested"
  const handleInterestedClick = (e: React.MouseEvent) => {
    // Prevent opening the property details
    e.preventDefault();
    e.stopPropagation();
    // Show the minimal membership popup
    setShowInterestedDialog(true);
  };

  return (
    <>
      <Card
        className="w-full max-w-sm mx-auto hover:shadow-md px-2 py-2 h-fit flex flex-col hover:cursor-pointer"
        onClick={handleCardClick}
      >
        <img
          src={image}
          alt={name}
          width={253}
          height={144}
          className={cn('rounded-lg w-auto h-[260px] bg-cover object-cover')}
        />
        <CardContent className="p-2 flex-grow">
          <div className="flex flex-col gap-6">
            <h2 className="text-base font-medium mb-2">{name}</h2>

            <div className="flex flex-col gap-4">
              <div className="flex justify-between text-sm text-gray-500 font-normal mb-2">
                <span className="flex gap-[14px] items-center">
                  <Image
                    src="/space.svg"
                    alt="space"
                    height={100}
                    width={100}
                    className="size-5"
                  />
                  {space}
                </span>
                <span className="flex gap-[14px] items-center">
                  <Image
                    src="/bed.svg"
                    alt="bed"
                    height={100}
                    width={100}
                    className="size-5"
                  />{' '}
                  {bedrooms}
                </span>
                <span className="flex gap-[14px] items-center">
                  <Image
                    src="/bathroom.svg"
                    alt="bathroom"
                    height={100}
                    width={100}
                    className="size-5"
                  />
                  {bathrooms}
                </span>
              </div>
              <div className="flex items-start gap-[14px] text-sm text-gray-500 mb-4">
                <Image
                  src="/locationP.svg"
                  alt="location"
                  height={100}
                  width={100}
                  className="size-5"
                />
                <span className="w-full h-[20px] truncate">{address}</span>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-2 pt-0">
          <div className="flex w-full gap-[18px] justify-between">
            <div className="text-2xl font-bold whitespace-nowrap">
              $ {price}
            </div>
            {/* "I'm Interested" button → opens membership dialog */}
            <Button
              variant="outline"
              className="px-[15px] py-[6px] text-[#003399] border-[#003399] hover:text-[#003399] flex gap-3 font-normal text-base"
              onClick={handleInterestedClick}
            >
              I&apos;m Interested
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Minimal "Are you a member?" Dialog */}
      <Dialog
        open={showInterestedDialog}
        onOpenChange={setShowInterestedDialog}
      >
        <DialogContent className="max-w-sm w-full text-center p-6 space-y-4">
          <DialogTitle className="text-lg font-semibold text-gray-800">
            Already a Member?
          </DialogTitle>
          <p className="text-sm text-gray-600">
            Choose to log in or sign up as a tenant.
          </p>
          <div className="flex justify-center space-x-2 mt-2">
            {/* Open Zoho portal in new tab */}
            <Button
              variant="outline"
              onClick={() =>
                window.open(
                  'https://tridentrentalllc.zohocreatorportal.com/',
                  '_blank'
                )
              }
            >
              Login
            </Button>
            {/* Navigate to /register?q=tenant in same tab */}
            <Button onClick={() => router.push('/register?q=tenant')}>
              Sign Up
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ListingCard;
