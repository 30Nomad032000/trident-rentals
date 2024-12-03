'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import Image from 'next/image';
import {
  Carousel,
  CarouselMainContainer,
  CarouselNext,
  CarouselPrevious,
  SliderMainItem,
  CarouselThumbsContainer,
  SliderThumbItem,
} from '@/components/ui/carousel';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import type { Property } from '../types';
import { getImageUrl } from '@/lib/utils';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
interface PropertyModalProps {
  isOpen?: boolean;
  property: Property | undefined;
}

export default function PropertyModal({
  isOpen = true,
  property,
}: PropertyModalProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleClose = (value: boolean) => {
    router.push(pathname + '?' + createQueryString('isOpen', `${value}`), {
      scroll: false,
    });
  };

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <Dialog open={isOpen} onOpenChange={(value: boolean) => handleClose(value)}>
      <DialogTitle className="hidden">Property Details</DialogTitle>
      <DialogContent className="px-12 py-12 md:max-w-6xl max-h-[90vh] bg-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-8">
          <div className="lg:pr-6 lg:border-r h-full">
            <CarouselOrientation property={property} />
          </div>
          <div className="flex flex-col gap-y-16 h-full">
            <div className="flex lg:flex-row flex-col gap-6 items-center justify-start">
              <div className="flex items-center justify-center text-[#172540]">
                <span className="font-bold text-2xl lg:text-[32px]">
                  $ {property?.Rent_Amount}
                </span>
                &nbsp;/ monthly
              </div>
              <Button className="px-[30px] py-[10px] w-fit text-base font-normal bg-[#003399]">
                I’m Interested
              </Button>
            </div>
            <div className="flex flex-col gap-y-7 px-4">
              <div className="text-2xl font-medium text-[#172540]">
                {property?.Property_Name}
              </div>

              <div className="grid grid-cols-2 gap-x-8 gap-y-8 ">
                {/* <div className="flex flex-col gap-2">
                  <Image
                    src="/house.svg"
                    alt="house"
                    height={100}
                    width={100}
                    className="size-6"
                  />
                  <div className="text-base font-medium text-[#172540]"></div>
                </div> */}
                <div className="flex flex-col gap-2">
                  <Image
                    src="/pin.svg"
                    alt="house"
                    height={100}
                    width={100}
                    className="size-6"
                  />
                  <div className="text-base font-medium text-[#172540]">
                    {property?.Property_Address?.zc_display_value}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Image
                    src="/area.svg"
                    alt="house"
                    height={100}
                    width={100}
                    className="size-6"
                  />
                  <div className="text-base font-medium text-[#172540]">
                    {property?.Property_Size} sqft
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Image
                    src="/bed.svg"
                    alt="house"
                    height={100}
                    width={100}
                    className="size-6"
                  />
                  <div className="text-base font-medium text-[#172540]">
                    {property?.Number_Of_Bedrooms} bedrooms
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Image
                    src="/bath.svg"
                    alt="house"
                    height={100}
                    width={100}
                    className="size-6"
                  />
                  <div className="text-base font-medium text-[#172540]">
                    {property?.Number_Of_Bathrooms} bathrooms
                  </div>
                </div>
                {/* <div className="flex flex-col gap-2">
                  <Image
                    src="/car.svg"
                    alt="house"
                    height={100}
                    width={100}
                    className="size-6"
                  />
                  <div className="text-base font-medium text-[#172540]">
                    car parking
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface CarouselOrientationProps {
  property: Property | undefined;
}

export const CarouselOrientation: React.FC<CarouselOrientationProps> = ({
  property,
}) => {
  return (
    <Carousel className="h-full">
      <CarouselNext className="top-1/3 -translate-y-1/3" />
      <CarouselPrevious className="top-1/3 -translate-y-1/3" />
      <CarouselMainContainer className="h-96">
        {property?.Property_Image1?.map((item, index) => (
          <SliderMainItem
            key={index}
            className="bg-transparent flex items-center justify-center"
          >
            <PhotoProvider>
              <PhotoView
                src={getImageUrl(item.ID, item.Upload_your_Image_here)}
              >
                <img
                  src={getImageUrl(item.ID, item.Upload_your_Image_here)}
                  alt="image"
                  height={100}
                  width={100}
                  className="outline outline-1 outline-border size-full flex items-center justify-center rounded-xl bg-cover object-cover"
                />
              </PhotoView>
            </PhotoProvider>
          </SliderMainItem>
        ))}
      </CarouselMainContainer>
      <CarouselThumbsContainer>
        {property?.Property_Image1?.map((item, index) => (
          <SliderThumbItem key={index} index={index} className="bg-transparent">
            <PhotoProvider>
              <PhotoView
                src={getImageUrl(item.ID, item.Upload_your_Image_here)}
              >
                <img
                  src={getImageUrl(item.ID, item.Upload_your_Image_here)}
                  alt="image"
                  height={100}
                  width={100}
                  className="outline outline-1 outline-border size-full flex items-center justify-center rounded-xl bg-cover object-cover"
                />
              </PhotoView>
            </PhotoProvider>
          </SliderThumbItem>
        ))}
      </CarouselThumbsContainer>
    </Carousel>
  );
};
