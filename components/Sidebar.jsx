import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SidebarItem } from "./sidebar-item";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";
export const Sidebar = ({ className }) => {
  return (
    <>
      <div className={cn("flex h-full w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col",
      className
      )}>
      <Link href="/learn">
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <Image src="/mascot.svg" height={40} width={40} alt="mascot" />
          <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">
            LINGO
          </h1>
        </div>
        </Link>
        <div className="flex flex-col gap-y-2 flex-1 uppercase">
        <SidebarItem label="Learn"  iconSrc="/learn.svg" href="/learn"/>
        <SidebarItem label="Add Topic"  iconSrc="/plus.svg" href="/addTopic"/>
        <SidebarItem label="Courses"  iconSrc="/courses.svg" href="/courses"/>
        <SidebarItem label="leaderboard"  iconSrc="/leaderboard.svg" href="/leaderboard"/>
        <SidebarItem label="quests"  iconSrc="/quests.svg" href="/quests"/>
        <SidebarItem label="shop"  iconSrc="/shop.svg" href="/shop"/>
        </div>
        <div className="p-4">
        <ClerkLoading>
            <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
            <UserButton afterSignOutUrl="/"/>
        </ClerkLoaded>
        </div>
      </div>
    </>
  );
};
