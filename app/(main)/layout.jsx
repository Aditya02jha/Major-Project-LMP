// import React from "react";
import { Sidebar } from "@/components/Sidebar";
import "../globals.css"
import { MobileHeader } from "@/components/mobile-header";
import { ClerkProvider } from '@clerk/nextjs'

const Layout = ({ children }) => {
  return (
    
    <ClerkProvider>
    <html lang="en">
    <body suppressHydrationWarning={true}>
        <MobileHeader />
          <Sidebar classname="hidden lg:flex"/>
          <main className=" lg:pl-[256px] h-full pt-[50px] lg:pt-0">
            <div className="max-w-[1056px] mx-auto pt-6 h-full ">{children}</div>
          </main>
          </body>
    </html>
    </ClerkProvider>
  );
};
export default Layout;
