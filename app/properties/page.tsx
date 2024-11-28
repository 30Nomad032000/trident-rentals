import { Header } from '@/components/custom/header';
import { CustomFontText } from '@/components/ui/customFontText';
import ListingCard from './components/listingCard';
import PropertyFilter from './components/listingFilter';
import { Footer } from '@/components/custom/footer';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { getAccessToken } from '@/lib/zohoAuth';
import type { ZohoData } from './types';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Filter } from 'lucide-react';
import ShimmerButton from '@/components/ui/shimmer-button';
import PropertyModal from './components/listingPopup';
import { getImageUrl } from '@/lib/utils';

interface PageProps {
  searchParams?: Promise<{ [key: string]: string | undefined } | undefined>;
}

export default async function Page({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const bathrooms = resolvedSearchParams?.bathrooms ?? '1';
  const bedrooms = resolvedSearchParams?.bedrooms ?? '1';
  const search = resolvedSearchParams?.search ?? '';
  const types = resolvedSearchParams?.types ?? '';
  const rent = resolvedSearchParams?.rent ?? '0,100000';
  const isOpen =
    resolvedSearchParams?.isOpen?.split(',')[0] === 'true' ? true : false;
  const item = resolvedSearchParams?.isOpen?.split(',')[1] ?? 0;
  const typeCriteria =
    types.length === 0
      ? ''
      : types
          .split(',')
          .filter((item) => item.trim() !== '')
          .map((item) => `Type_field == "${item}"`)
          .join(' || ');
  const rentCriteria = `&& Rent_Amount >= ${
    rent.split(',')[0]
  } && Rent_Amount <= ${rent.split(',')[1]}`;
  const criteria = `(Number_Of_Bathrooms >= ${bathrooms} && Number_Of_Bedrooms >= ${bedrooms} && Property_Name.contains("${search}") ${
    types.length !== 0 ? '&& ' : ''
  } ${typeCriteria} ${rentCriteria})`;
  const token = await getAccessToken();
  const encodedCriteria = encodeURIComponent(criteria);
  const result = await fetchPropertyData(token, encodedCriteria);
  const propertyData = result?.data[Number(item)];

  return (
    <>
      <Header />
      <div className="px-[25px] lg:px-[46px] py-2">
        <div className="flex flex-col gap-8">
          <div className=" h-64 bg-[url('/propertiesBanner.svg')] w-full bg-no-repeat bg-cover rounded-[20px]">
            <div className="flex flex-col justify-center items-center h-full">
              <CustomFontText className="text-3xl lg:text-5xl font-bold text-white">
                Find Our Best
              </CustomFontText>
              <h1 className="text-4xl lg:text-6xl font-semibold text-white">
                Properties
              </h1>
            </div>
          </div>

          <Drawer>
            <DrawerTrigger asChild>
              <ShimmerButton className="w-full lg:hidden">
                <Filter />
                &nbsp;Filter
              </ShimmerButton>
            </DrawerTrigger>
            <DrawerContent className="h-[600px] bg-slate-800">
              <DrawerHeader>
                <DrawerTitle className="hidden">
                  Are you absolutely sure?
                </DrawerTitle>
                <DrawerDescription className="hidden">
                  This action cannot be undone.
                </DrawerDescription>
              </DrawerHeader>
              <ScrollArea className="h-full">
                <PropertyFilter
                  searchQuery={resolvedSearchParams?.search || ''}
                  bedroomsQuery={bedrooms}
                  bathroomsQuery={bathrooms}
                  propertyTypesQuery={resolvedSearchParams?.types || ''}
                  rentQuery={rent}
                />
              </ScrollArea>
            </DrawerContent>
          </Drawer>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-10 gap-x-10">
          <div className="col-span-1 hidden sm:hidden md:hidden lg:block">
            <PropertyFilter
              searchQuery={resolvedSearchParams?.search || ''}
              bedroomsQuery={bedrooms}
              bathroomsQuery={bathrooms}
              propertyTypesQuery={resolvedSearchParams?.types || ''}
              rentQuery={rent}
            />
          </div>
          <div className="col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-1 sm:gap-x-2 md:gap-x-2 lg:gap-x-4 xl:gap-x-10 gap-y-8">
            {result === undefined || result?.data === undefined ? (
              <div className="col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-3 flex justify-center items-center">
                No data available
              </div>
            ) : (
              result.data.map((item, index) => (
                <ListingCard
                  image={getImageUrl(
                    item.Property_Image1[0].ID,
                    item.Property_Image1[0].Upload_your_Image_here
                  )}
                  index={index}
                  space={item.Property_Size}
                  name={item.Property_Name}
                  bedrooms={item.Number_Of_Bedrooms}
                  bathrooms={item.Number_Of_Bathrooms}
                  address={item.Property_Address.zc_display_value}
                  price={item.Rent_Amount}
                  key={index}
                />
              ))
            )}
          </div>
        </div>

        <PropertyModal isOpen={isOpen} property={propertyData} />

        <div className="py-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
      <Footer />
    </>
  );
}

async function fetchPropertyData(
  token: string,
  encodedCriteria: string
): Promise<ZohoData | null> {
  console.log(token);
  try {
    const response = await fetch(
      `https://www.zohoapis.com/creator/v2.1/data/tridentrental/trident-rental/report/All_Properties?criteria=${encodedCriteria}`,
      {
        headers: {
          Authorization: `Zoho-oauthtoken ${token}`,
        },
        method: 'GET',
      }
    );

    const responseBody = await response.text();

    if (!response.ok) {
      console.log('Error Response:', responseBody);
      return null;
    }
    console.log(responseBody);

    const parsedData: ZohoData = JSON.parse(responseBody);
    return parsedData;
  } catch (error: unknown) {
    console.log(error);
    const typedError = error as { message: string };
    console.log('Error fetching property data:', typedError.message);
    return null;
  }
}
