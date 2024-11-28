import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getImageUrl = (imageId: string, imageUrl: string): string => {
  console.log(imageId, 'imageId', imageUrl, 'imageUrl');
  if (!imageUrl) {
    console.error('Image URL is required.');
    return '';
  }

  const match = imageUrl.match(/filepath=([^&]+)/);
  const filepath = match ? match[1] : null;

  // Construct the file URL
  const fileUrl: string = `https://creator.zoho.com/creator/v2.1/data/data/tridentrental/trident-rental/report/All_Property_Images/${imageId}/Property_Images.Image/download-file/DEjdKp3FN3eTxr4u4v7H21HMvNJ16aUOnM6zGr96WbB71SOddz59pbsmwGUMk0EnC7GR5jCWpdQbjxtwX8b58hTbTV5JRwj6g86g?filepath=/${filepath}&mediaType=1`;
  // Output the file URL
  return fileUrl;
};
