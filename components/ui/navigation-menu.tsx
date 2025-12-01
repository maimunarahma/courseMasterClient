"use client";

import * as React from "react";
import {
  NavigationMenu as RadixNavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@radix-ui/react-navigation-menu";
import Link from "next/link";

export function NavigationMenu() {
  return (
    <RadixNavigationMenu>
      <NavigationMenuList className="flex gap-6">
        <NavigationMenuItem>
          <Link href="/" className="text-sm font-medium hover:text-primary">
            Home
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Courses</NavigationMenuTrigger>
          <NavigationMenuContent className="p-4 bg-white shadow-md rounded-md flex flex-col gap-2">
            <Link href="/courses/frontend">Frontend</Link>
            <Link href="/courses/backend">Backend</Link>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/about" className="text-sm font-medium hover:text-primary">
            About
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/contact" className="text-sm font-medium hover:text-primary">
            Contact
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </RadixNavigationMenu>
  );
}
