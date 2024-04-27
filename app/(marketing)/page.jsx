import TopicList from "@/components/TopicList";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  ClerkLoaded,
  ClerkLoading,
  SignUpButton,
  SignedIn,
  SignedOut,
  SignInButton,
} from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Link from "next/link";
export default function Home() {
  return (
    <div className="max-w-[998px] mx-auto flex-1 w-full flex flex-col lg:flex-row items-center justify-center p-4 gap-2">
      <div className="relative w-[240px] h-[240px] lg:w-[424px] lg:h-[424px] mb-8 lg:mb-0">
        <Image src="/hero.svg" alt="hero" layout="fill" objectFit="cover" />
      </div>
      <div className="flex flex-col items-center gap-y-8">
        <h1 className="text-xl text-neutral-600 max-w-[480px] font-bold text-center lg:text-3xl">
          Learn, Practice, and Master Skill with Lingo.
        </h1>
        <div className="flex flex-col items-center gap-y-3 max-w-[300px] w-full">
          <ClerkLoading>
            <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedOut>
              <SignUpButton mode="modal" afterSignInUrl="/" afterSignUpUrl="/">
                <Button size="lg" variant="secondary" className="w-full">
                  Get Started
                </Button>
              </SignUpButton>

              <SignInButton mode="modal" afterSignInUrl="/" afterSignUpUrl="/">
                <Button size="lg" variant="primaryOutline" className="w-full">
                  I already have an account
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <SignedIn>
                <Button size="lg" variant="secondary">
                  <Link href="/learn">Continue Learning.</Link>
                </Button>
              </SignedIn>
            </SignedIn>
          </ClerkLoaded>
        </div>
      </div>
    </div>
  );
}
