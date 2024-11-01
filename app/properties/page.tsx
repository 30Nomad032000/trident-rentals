import { Header } from "@/components/custom/header";
import { CustomFontText } from "@/components/ui/customFontText";
import ListingCard from "./components/listingCard";
import PropertyFilter from "./components/listingFilter";
import { Footer } from "@/components/custom/footer";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getAccessToken } from "@/lib/zohoAuth";
import type { ZohoData } from "./types";

interface PageProps {
  searchParams?: Promise<{ [key: string]: string | undefined } | undefined>;
}

export default async function Page({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;

  const bathrooms = resolvedSearchParams?.bathrooms;
  const bedrooms = resolvedSearchParams?.bedrooms;
  const criteria = `(No_of_Bathroom >= '${bathrooms?.replace("+", "")}' && No_Of_Bedroom >= '${bedrooms?.replace("+", "")}')`;
  const token = await getAccessToken();
  const encodedCriteria = encodeURIComponent(criteria);
  const result = await fetchPropertyData(token, encodedCriteria);

  return (
    <>
      <Header />
      <div className="px-[46px] py-2">
        <div className=" h-64 bg-[url('/propertiesBanner.svg')] w-full bg-no-repeat bg-cover rounded-[20px]">
          <div className="flex flex-col justify-center items-center h-full">
            <CustomFontText className="text-5xl font-bold text-white">Find Our Best</CustomFontText>
            <h1 className="text-6xl font-semibold text-white">Properties</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-10 gap-x-10">
          <div className="col-span-1 hidden sm:hidden md:hidden lg:block">
            <PropertyFilter />
          </div>
          <div className="col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-1 sm:gap-x-2 md:gap-x-2 lg:gap-x-4 xl:gap-x-10 gap-y-8">
            {/*@ts-no-check*/}
            {result === undefined
              ? null
              : result.data.map((item, index) => (
                  <ListingCard
                    image={item.Property_Images[0].Image.replace("/api/v2.1/", "https://creatorapp.zoho.in/")}
                    space={item.Sq_Feet}
                    name={item.Property_Name}
                    bedrooms={item.No_Of_Bedroom}
                    bathrooms={item.No_of_Bathroom}
                    address={item.Property_Address.address_line_1}
                    price={item.Price}
                    key={index}
                  />
                ))}
          </div>
        </div>
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

async function fetchPropertyData(token: string, encodedCriteria: string): Promise<ZohoData> {
  const response = await fetch(
    `https://www.zohoapis.in/creator/v2.1/data/demo13cloudq/trident-data-demo/report/All_Property_Details?criteria=${encodedCriteria}`,
    {
      headers: {
        Authorization: `Zoho-oauthtoken ${token}`,
      },
      method: "GET",
      cache: "no-store",
    }
  );
  const responseBody = await response.text();

  if (!response.ok) {
    console.error("Error Response:", responseBody);
    throw new Error(`Failed to fetch data from Zoho: ${response.status} ${response.statusText}`);
  }

  return JSON.parse(responseBody);
}
