"use client";

import Link from "next/link";

import { SignIn } from "../auth/signin";
import { SignOut } from "../auth/signout";

import { User } from "@/types";
import Image from "next/image";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import { MoonarrIconDark, MoonarrIconLight } from "@/services/logo";

const Header = ({ user }: {user: User }) =>{
    return (
        <header className="border-b border-white flex justify-between items-center gap-4 mx-6 px-2 text-xl min-h-20 p-4 z-30">
            <Link href={"/"} className="content-center text-white hover:text-hover flex gap-2">
                <Image
                src={MoonarrIconDark.src}
                width={30}
                height={30}
                alt="Moonarr Icon"
                />
                <span>
                    Moonarr
                </span>
            </Link>
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                    <NavigationMenuTrigger>Pages</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <NavigationMenuLink href={"/"} className="w-22">
                            Home Page
                        </NavigationMenuLink>
                        <NavigationMenuLink href={"/edit"} className="w-22">
                            Edit Page
                        </NavigationMenuLink>
                    </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            {
                user ? 
                    <SignOut user={user}/>
                    :
                    <SignIn/>
            }
        </header>
    );
};

export default Header;