'use client';
import Image from 'next/image';
import { Button } from '../ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { NavigationMenuRegister } from './navigationMenu';

export const Header = () => {
  const pathName = usePathname();
  return (
    <div
      className={cn(
        pathName === '/properties' ? '' : 'border-b border-[#CBCBCB] '
      )}
    >
      <div className="container mx-auto flex justify-center lg:justify-between items-center h-[100px] px-4">
        <Image
          src="/tridentLogo.svg"
          className="w-[200px] h-[45px]"
          width={100}
          height={100}
          alt="Trident Rentals Logo"
        />
        <div className=" justify-center items-center gap-6 hidden lg:flex">
          <div className="flex justify-center items-center gap-10 font-semibold text-base text-[#393939]">
            <div
              className={cn(
                pathName === '/'
                  ? 'underline underline-offset-8 decoration-[#00CCFF] decoration-[3px]'
                  : ''
              )}
            >
              <Link href={'/'}>Home</Link>
            </div>
            <div
              className={cn(
                pathName === '/properties'
                  ? 'underline underline-offset-8 decoration-[#00CCFF] decoration-[3px]'
                  : ''
              )}
            >
              <Link href={'/properties'}>Properties</Link>
            </div>
            <div
              className={cn(
                pathName === '/register'
                  ? 'underline underline-offset-8 decoration-[#00CCFF] decoration-[3px]'
                  : ''
              )}
            >
              <NavigationMenuRegister />
            </div>
          </div>
          <Link href="/contact">
            <Button className="bg-[#00CCFF] hover:bg-[#00CCFF] text-white border-none px-[30px] py-[10px] text-base hover:text-white font-normal">
              Contact Us
            </Button>
          </Link>

          <Link href="https://tridentrentalllc.zohocreatorportal.com/">
            <Button
              variant="outline"
              className="px-[30px] py-[10px] text-[#003399] border-[#003399] hover:text-[#003399] flex gap-3 font-normal text-base"
            >
              <Image
                className="h-4 w-4"
                src="/loginIcon.svg"
                alt="login icon"
                width={100}
                height={100}
              />
              Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
