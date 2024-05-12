"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SidebarItem } from "./Sidebar-item";
// import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";
export const Sidebar = ({ className }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const router = useRouter();
  // if (!router.isReady) return;
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    const name = localStorage.getItem("userName");
    const userDetail = localStorage.getItem("user");

    if (loggedIn && name && userDetail) {
      setIsLoggedIn(true);
      setUserInfo(JSON.parse(userDetail));
    }
  }, []);

  return (
    <>
      <div
        className={cn(
          "flex h-full w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col",
          className
        )}
      >
        <Link href="/course">
          <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
            <Image src="/mascot.svg" height={40} width={40} alt="mascot" />
            <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">
              LMP
            </h1>
          </div>
        </Link>
        <div className="flex flex-col gap-y-2 flex-1 uppercase">
          <SidebarItem label="Courses" iconSrc="/courses.svg" href="/course" />
          {/* <SidebarItem label="Add Question"  iconSrc="/plus.svg" href="/addQuestion"/> */}
          {userInfo && userInfo.email === "ayushjha5467@gmail.com" && (
            <SidebarItem
              label="Add Topic"
              iconSrc="/plus.svg"
              href="/addTopic"
            />
          )}
          {userInfo && userInfo.email === "ayushjha5467@gmail.com" && (
            <SidebarItem
              label="All Users"
              iconSrc="/group.svg"
              href="/allUsers"
            />
          )}
          {/* <SidebarItem
            label="leaderboard"
            iconSrc="/leaderboard.svg"
            href="/leaderboard"
          /> */}
          <SidebarItem label="Login As Admin" iconSrc="/User.jpg" href="/login" />
          {/* <SidebarItem label="shop" iconSrc="/shop.svg" href="/shop" /> */}
        </div>
        {/* <div className="p-4">
        <ClerkLoading>
            <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
            <UserButton afterSignOutUrl="/course"/>
        </ClerkLoaded>
        </div> */}
      </div>
    </>
  );
};
