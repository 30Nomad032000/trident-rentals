'use client';

import { useState, useCallback } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
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
import type { Property } from '../../../types/types';
import { getImageUrl } from '@/lib/utils';
import ImageViewer from 'react-simple-image-viewer';

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

  // State for the Image Viewer
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  // NEW: State for showing the "member signup" dialog
  const [showInterestedDialog, setShowInterestedDialog] = useState(false);

  const images = property?.Property_Image1;

  // Handles closing the main property modal
  const handleClose = (value: boolean) => {
    router.push(`${pathname}?${createQueryString('isOpen', `${value}`)}`, {
      scroll: false,
    });
  };

  // Creates or updates a query string parameter
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  // Opens the image viewer
  const openImageViewer = useCallback((index: number) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  // Closes the image viewer
  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  // When user clicks "I'm Interested" -> show secondary dialog
  const handleInterestedClick = () => {
    setShowInterestedDialog(true);
  };

  return (
    <>
      {/* Main (original) Property Modal */}
      <Dialog
        modal={false}
        open={isOpen}
        onOpenChange={(value: boolean) => handleClose(value)}
      >
        <DialogTitle className="hidden">Property Details</DialogTitle>

        <DialogContent
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
          className="px-12 py-12 md:max-w-6xl h-[65vh] bg-gray-100"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-8 overflow-y-auto overflow-x-hidden">
            <div className="lg:pr-6 lg:border-r h-full">
              <CarouselOrientation
                property={property}
                onClick={(index) => openImageViewer(index)}
              />
            </div>
            <div className="flex flex-col gap-y-16 h-full">
              <div className="flex lg:flex-row flex-col gap-6 items-center justify-start">
                <div className="flex items-center justify-center text-[#172540]">
                  <span className="font-bold text-2xl lg:text-[32px]">
                    $ {property?.Rent_Amount}
                  </span>
                  &nbsp;/ monthly
                </div>
                {/* Changed to open the second dialog */}
                <Button
                  onClick={handleInterestedClick}
                  className="px-[30px] py-[10px] w-fit text-base font-normal bg-[#003399]"
                >
                  I’m Interested
                </Button>
              </div>
              <div className="flex flex-col gap-y-7 px-4">
                <div className="text-2xl font-medium text-[#172540]">
                  {property?.Property_Name}
                </div>

                <div className="grid grid-cols-2 gap-x-8 gap-y-8 ">
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
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* NEW: Minimal signup/login dialog */}
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
            {/* Open Zoho portal in a new tab */}
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

      {/* Image Viewer stays the same */}
      {isViewerOpen && (
        <ImageViewer
          src={
            images?.map((item) =>
              getImageUrl(item.ID || '', item.Upload_your_Image_here)
            ) || []
          }
          currentIndex={currentImage}
          onClose={closeImageViewer}
          disableScroll={false}
          backgroundStyle={{
            backgroundColor: 'rgba(0,0,0,0.9)',
            zIndex: 52,
          }}
          closeOnClickOutside={true}
        />
      )}
    </>
  );
}

// CarouselOrientation remains unchanged
interface CarouselOrientationProps {
  property: Property | undefined;
  onClick: (index: number) => void;
}

export const CarouselOrientation: React.FC<CarouselOrientationProps> = ({
  property,
  onClick,
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
            <img
              onClick={() => onClick(index)}
              src={getImageUrl(item.ID, item.Upload_your_Image_here)}
              alt="image"
              height={100}
              width={100}
              className="outline outline-1 outline-border size-full flex items-center justify-center rounded-xl bg-cover object-cover"
            />
          </SliderMainItem>
        ))}
      </CarouselMainContainer>
      <CarouselThumbsContainer>
        {property?.Property_Image1?.map((item, index) => (
          <SliderThumbItem key={index} index={index} className="bg-transparent">
            <img
              onClick={() => onClick(index)}
              src={getImageUrl(item.ID, item.Upload_your_Image_here)}
              alt="image"
              height={100}
              width={100}
              className="outline outline-1 outline-border size-full flex items-center justify-center rounded-xl bg-cover object-cover"
            />
          </SliderThumbItem>
        ))}
      </CarouselThumbsContainer>
    </Carousel>
  );
};
