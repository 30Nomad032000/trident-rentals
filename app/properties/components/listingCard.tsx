
import Image from 'next/image'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ListingCard() {
    return (
        <Card className="w-full max-w-sm mx-auto hover:shadow-md px-2 py-2">
            <Image
                src="/contactBackground.svg"
                alt="2685 Jennydiane Drive"
                width={253}
                height={144}
                className="object-cover rounded-lg w-auto h-[166px] bg-cover"
            />
            <CardContent className="p-2">
                <div className='flex flex-col gap-6'>
                    <h2 className="text-base font-medium mb-2">2685 Jennydiane Drive</h2>

                    <div className='flex flex-col gap-4'>
                        <div className="flex justify-between text-sm text-gray-500 font-normal mb-2">
                            <span className="flex gap-[14px] items-center"><Image src="/space.svg" alt="space" height={100} width={100} className='size-5' />338 ft</span>
                            <span className="flex gap-[14px] items-center"><Image src="/bed.svg" alt=" ed" height={100} width={100} className='size-5' /> 2</span>
                            <span className="flex gap-[14px] items-center"><Image src="/bathroom.svg" alt=" ed" height={100} width={100} className='size-5' />2</span>
                        </div>
                        <div className="flex items-start gap-[14px] text-sm text-gray-500 mb-4">
                            <Image src="/locationP.svg" alt=" ed" height={100} width={100} className='size-5' />
                            <span>2972 Westheimer Rd. Santa Ana, Illinois 85486</span>
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="p-2 pt-0">
                <div className='flex w-full gap-[18px] justify-between'><div className="text-2xl font-bold text-nowrap">$ 2,700</div>  <Button variant="outline" className="px-[15px] py-[6px] text-[#003399] border-[#003399] hover:text-[#003399] flex gap-3 font-normal text-base">I&apos;m  Interested</Button></div>
        </CardFooter>
        </Card >
    )
}