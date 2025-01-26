'use client';

import { useState } from 'react';
import ListingCard from './listingCard';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { getImageUrl } from '@/lib/utils';
import { Property } from '../../../types/types';
import { usePathname, useRouter } from 'next/navigation';

interface ListingSectionProps {
  data?: Property[];
}

export default function ListingSection({ data }: ListingSectionProps) {
  const router = useRouter();
  const pathName = usePathname();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  const listings = data || [];
  const totalItems = listings.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  // Get the subset of listings for the current page
  const paginatedData = listings.slice(
    (currentPage - 1) * pageSize, // Start index
    currentPage * pageSize // End index
  );

  // Handle page changes in pagination
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      // Ensure the page number is within valid range
      setCurrentPage(page); // Update the current page state
      router.replace(pathName, { scroll: false }); // Update the URL without scrolling
    }
  };

  // Render a message if no listings are available
  if (!listings || listings.length === 0) {
    return (
      <div className="h-screen flex justify-center items-center">
        No property found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-1 sm:gap-x-2 md:gap-x-2 lg:gap-x-4 xl:gap-x-10 gap-y-8">
      {paginatedData.map((item, index) => {
        const absoluteIndex = (currentPage - 1) * pageSize + index;
        return (
          <ListingCard
            key={absoluteIndex}
            image={getImageUrl(
              item.Property_Image1[0].ID,
              item.Property_Image1[0].Upload_your_Image_here
            )}
            index={absoluteIndex}
            space={item.Property_Size}
            name={item.Property_Name}
            bedrooms={item.Number_Of_Bedrooms}
            bathrooms={item.Number_Of_Bathrooms}
            address={item.Property_Address?.zc_display_value}
            price={item.Rent_Amount}
          />
        );
      })}

      <div className="col-span-full flex justify-center py-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(currentPage - 1)}
              ></PaginationPrevious>
            </PaginationItem>

            <PaginationItem>
              <PaginationLink isActive={currentPage === 1}>
                <button onClick={() => handlePageChange(1)}>1</button>
              </PaginationLink>
            </PaginationItem>

            {totalPages > 1 && (
              <PaginationItem>
                <PaginationLink isActive={currentPage === 2}>
                  <button onClick={() => handlePageChange(2)}>2</button>
                </PaginationLink>
              </PaginationItem>
            )}
            {totalPages > 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            {totalPages > 3 && (
              <PaginationItem>
                <PaginationLink isActive={currentPage === totalPages}>
                  <button onClick={() => handlePageChange(totalPages)}>
                    {totalPages}
                  </button>
                </PaginationLink>
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(currentPage + 1)}
              ></PaginationNext>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
