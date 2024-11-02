"use client"

import { useCallback, useEffect, useState } from 'react'
import { Search, RotateCw } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface PropertyFilterProps {
    searchQuery: string;
    bedroomsQuery: string;
    bathroomsQuery: string;
    propertyTypesQuery: string;
    rentQuery: string;
}

const PropertyFilter: React.FC<PropertyFilterProps> = ({
    searchQuery, bedroomsQuery, bathroomsQuery, propertyTypesQuery, rentQuery
}) => {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [rent, setRent] = useState(rentQuery.split(',').map((item) => Number(item)) ?? [0, 100000])
    const [bedrooms, setBedrooms] = useState(bedroomsQuery ?? '1')
    const [bathrooms, setBathrooms] = useState(bathroomsQuery ?? '1')
    const [propertyTypes, setPropertyTypes] = useState<string[]>(propertyTypesQuery.split(',') ?? [])
    const [search, setSearch] = useState(searchQuery ?? '')

    useEffect(() => {
        const queryString = propertyTypes.join(',');
        router.push(
            pathname + "?" + createQueryString("types", queryString),
            { scroll: false }
        );
    }, [propertyTypes]);

    const handleBedrooms = (value: string) => {
        router.push(pathname + "?" + createQueryString("bedrooms", value), { scroll: false });
        setBedrooms(value)
    }

    const handleBathrooms = (value: string) => {
        router.push(pathname + "?" + createQueryString("bathrooms", value), { scroll: false });
        setBathrooms(value)
    }

    const handleSearch = (value: string) => {
        router.push(pathname + "?" + createQueryString("search", value), { scroll: false });
        setSearch(value)
    }


    const handleTypes = (checked: boolean, type: string) => {
        const updatedPropertyTypes = checked
            ? [...propertyTypes, type]
            : propertyTypes.filter((t) => t !== type);

        setPropertyTypes(updatedPropertyTypes);
    };

    const handleRent = (value: number[]) => {
        const newValue = value
        const queryString = newValue.join(',')
        router.push(pathname + "?" + createQueryString("rent", queryString), { scroll: false });
        setRent(value as number[]);

    }

    const handleClear = () => {
        window.location.href = '/properties'
        setBathrooms('1');
        setBedrooms('1');
        setPropertyTypes([]);
        setRent([0, 100000])
        setSearch('')
    }

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);

            return params.toString();
        },
        [searchParams]
    );


    return (
        <div className="w-full lg:bg-[url('/filterBackground.svg')] lg:bg-transparent bg-slate-800 bg-no-repeat bg-cover text-white p-3 rounded-[20px] pb-6">
            <div className="flex justify-between items-center mb-4 p-1 border-b border-[#898989]">
                <h2 className="text-lg font-semibold">FILTER</h2>
                <Button onClick={handleClear} size="sm" className="text-slate-500 hover:text-slate-300 text-sm bg-transparent hover:bg-transparent">
                    Clear All <RotateCw className="ml-2 h-4 w-4" />
                </Button>
            </div>
            <div className='flex flex-col gap-6'>
                <div className="relative mb-4">
                    <Input
                        type="text"
                        placeholder="Search here"
                        className="w-full rounded-[30px] text-black placeholder-slate-400 bg-white"
                        value={search}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                    <Search className="text-[#00CCFF] absolute right-4 top-2.5 h-5 w-5" />
                </div>


                <div className="mb-4 flex flex-col gap-6">
                    <div className='flex w-full items-center justify-center'>
                        <h3 className="text-sm font-semibold border border-[#898989] w-fit pl-3 pr-5 py-2 rounded-[30px]">Rent</h3>
                        <hr className='w-full' />
                    </div>
                    <div>
                        <Slider
                            min={0}
                            max={100000}
                            step={10}
                            value={rent}
                            onValueChange={handleRent}
                            className="my-4"
                        />
                        <div className="flex justify-between text-sm">
                            <span>${rent[0]}</span>
                            <span>${rent[1]}</span>
                        </div>
                    </div>
                </div>

                <div className="mb-4 flex flex-col gap-4 w-full">
                    <div className='flex w-full items-center justify-center'>
                        <h3 className="text-sm font-semibold border border-[#898989] w-fit pl-3 pr-5 py-2 rounded-[30px]">Bedrooms</h3>
                        <hr className='w-full' />
                    </div>
                    <div>
                        <RadioGroup defaultValue={bedroomsQuery} className='grid grid-cols-3 gap-x-6 gap-y-6' value={bedrooms} onValueChange={handleBedrooms}>
                            {['1+', '2+', '3+', '4+', 'All'].map((option, index) => (
                                <div key={option} className='flex gap-3 items-center justify-start'>
                                    <RadioGroupItem id={option}
                                        key={option}
                                        value={`${index + 1}`}
                                    />
                                    <Label>{option}</Label>

                                </div>
                            ))}
                        </RadioGroup>
                    </div>
                </div>

                <div className="mb-4 flex flex-col gap-4 w-full">
                    <div className='flex w-full items-center justify-center'>
                        <h3 className="text-sm font-semibold border border-[#898989] w-fit pl-3 pr-5 py-2 rounded-[30px]">Bathrooms</h3>
                        <hr className='w-full' />
                    </div>
                    <div>
                        <RadioGroup defaultValue={bathroomsQuery} className='grid grid-cols-3 gap-x-6 gap-y-6' value={bathrooms} onValueChange={handleBathrooms}>
                            {['1+', '2+', '3+', '4+', '5+', 'All'].map((option, index) => (
                                <div key={option} className='flex gap-3 items-center justify-start'>
                                    <RadioGroupItem id={option}
                                        key={option}
                                        value={`${index + 1}`}
                                    />
                                    <Label>{option}</Label>

                                </div>
                            ))}
                        </RadioGroup>
                    </div>
                </div>


                <div className='flex flex-col gap-7'>
                    <div className='flex w-full items-center justify-center'>
                        <h3 className="text-sm font-semibold border border-[#898989] w-fit pl-3 pr-5 py-2 rounded-[30px]">Type</h3>
                        <hr className='w-full' />
                    </div>
                    <div className="space-y-2">
                        {['All types', 'Quadruplex', 'MultiFamily2To4', 'Unknown', 'Single Family', 'Duplex', 'Condominium'].map((type) => (
                            <div key={type} className="flex items-center">
                                <Checkbox
                                    id={type}
                                    checked={propertyTypes.includes(type)}
                                    onCheckedChange={(checked: boolean) => handleTypes(checked, type)}
                                    className="border-slate-500"
                                />
                                <Label htmlFor={type} className="ml-2 text-sm">
                                    {type}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PropertyFilter;