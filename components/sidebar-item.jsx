"use client"

import Link from "next/link"
import { Button } from "./ui/button"
import { usePathname } from "next/navigation"
import Image from "next/image"

export const SidebarItem = ({label , iconSrc , href}) =>{
    const pathname = usePathname();
    const active = pathname === href;

    return(
        <Button 
        variant = {active ? "sidebarOutline":"sidebar"}
        className = "justify-start h-[52px]"
        asChild
        >
        <Link href = {href}>
        <Image src = {iconSrc} alt = {label} className="mr-5" height={32} width={32} />
            {label}
        </Link>
        </Button>
    )
}