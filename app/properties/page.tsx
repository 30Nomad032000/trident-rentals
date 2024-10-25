import { Header } from "@/components/custom/header"
import { CustomFontText } from "@/components/ui/customFontText"
import ListingCard from "./components/listingCard"
import PropertyFilter from "./components/listingFilter"
import { Footer } from "@/components/custom/footer"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"

export default function Page() {
    return (<><Header />
        <div className="px-[46px] py-2">
            <div className=" h-64 bg-[url('/propertiesBanner.svg')] w-full bg-no-repeat bg-cover rounded-[20px]">
                <div className="flex flex-col justify-center items-center h-full"><CustomFontText className="text-5xl font-bold text-white">Find Our Best</CustomFontText>
                    <h1 className="text-6xl font-semibold text-white">Properties</h1></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-10 gap-x-10">
                <div className="col-span-1 hidden sm:hidden md:hidden lg:block">
                    <PropertyFilter />
                </div>
                <div className="col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-1 sm:gap-x-2 md:gap-x-2 lg:gap-x-4 xl:gap-x-10 gap-y-8">
                    {/*@ts-no-check*/}
                    {Array.from({ length: 12 }).map((item, index) => (<ListingCard key={index} />))}
                </div>
            </div>
            <div className="py-4">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#" isActive>1</PaginationLink>
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
    </>)
}