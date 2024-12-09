'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

const components: { title: string; href: string; description: string }[] = [
  {
    title: 'Landlord',
    href: '/register?q=landlord',
    description: 'Elevate Your Rental Experience ! Register as a Landlord',
  },
  {
    title: 'Tenant',
    href: '/register?q=tenant',
    description: 'Discover Your Dream Home ! Register as a Tenant',
  },
  {
    title: 'Partner',
    href: '/register?q=partner',
    description: 'Grow Your Business ! Register as a Partner',
  },
  {
    title: 'Vendor',
    href: '/register?q=vendor',
    description: 'Unlock Your Property Potential ! Register as a Vendor',
  },
];

export function NavigationMenuRegister() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="font-semibold text-base text-[#393939]">
            Register As
          </NavigationMenuTrigger>
          <NavigationMenuContent className="">
            <ul className="grid w-[300px] gap-3 p-4 md:w-[400px] md:grid-cols-2 lg:w-[500px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
