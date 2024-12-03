import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getImageUrl = (imageId: string, imageUrl: string): string => {
  if (!imageUrl) {
    console.error('Image URL is required.');
    return '';
  }

  const match = imageUrl.match(/filepath=([^&]+)/);
  const filepath = match ? match[1] : null;

  // Construct the file URL
  const fileUrl: string = `https://creatorapp.zohopublic.com/tridentrental/trident-rental/report/All_Property_Images/${imageId}/Upload_your_Image_here/download-file/XmOdknjNP5KpZaA6uMatzwvTYxaSNYrXCTaHTDdSdy66rPyyqx3ztvQSgDPWOmVTQEkqBH6A1SbWE3n2sDCddGsDC9U90bnRMB4S?filepath=/${filepath}&mediaType=1`;
  // Output the file URL
  return fileUrl;
};
