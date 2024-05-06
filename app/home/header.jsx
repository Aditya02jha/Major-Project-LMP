"use client"
// import { Button } from "@/components/ui/button";
// import { Loader } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// export async function Header() {

//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userName, setUserName] = useState("");
//   const [userId, setUserId] = useState("");
//   const [userInfo, setUserInfo] = useState({});

//   useEffect(() => {
//     const loggedIn = localStorage.getItem("isLoggedIn");
//     const name = localStorage.getItem("userName");
//     const userDetail = localStorage.getItem("user");
//     const Id = localStorage.getItem("userId");
//     // if (!loggedIn) {
//     //   router.push("/login");
//     //   return;
//     // }
//     if (loggedIn && name) {
//       setIsLoggedIn(true);
//       setUserName(name);
//       setUserId(Id);
//       const parsedUserInfo = JSON.parse(userDetail);
//       setUserInfo(parsedUserInfo);
//     }
//   }, [isLoggedIn]);

//   return (
//     <header className="h-20 w-full border-b-2 border-slate-200 px-4">
//       <div className="lg:max-w-screen-lg mx-auto flex items-center justify-between h-full bg-slate-200">
//         <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
//           <Image src="/mascot.svg" height={40} width={40} alt="mascot" />
//           <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">
//             LINGO
//           </h1>
//         </div>
//         {/* <ClerkLoading>
//           <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
//         </ClerkLoading>
//         <ClerkLoaded>
//           <SignedIn>
//             <UserButton afterSignOutUrl="/" />
//             <SignOutButton
//               mode="modal"
//               afterSignInUrl="/learn"
//               afterSignUpUrl="/learn"
//             > */}
//         {isLoggedIn ? <link href="/login" > <Image src='./User' /> </link>  : <Button size="lg" variant="ghost">
//           logout
//         </Button> }
        
//         {/* </SignOutButton> */}
//         {/* </SignedIn> */}
//         {/* <SignedOut>
//             <SignInButton
//               mode="modal"
//               afterSignInUrl="/learn"
//               afterSignUpUrl="/learn"
//             > */}
//         <Button size="lg" variant="ghost">
//           Login
//         </Button>
//         {/* </SignInButton>
//           </SignedOut>
//            */}
//         {/* </ClerkLoaded> */}
//       </div>
//     </header>
//   );
// }


import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function Header() {
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
    <header className="h-20 w-full border-b-2 border-slate-200 px-4">
      <div className="lg:max-w-screen-lg mx-auto flex items-center justify-between h-full bg-slate-200">
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <Image src="/mascot.svg" height={40} width={40} alt="mascot" />
          <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">LINGO</h1>
        </div>
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
        {isLoggedIn ? (
          <Link href="/profile">
            <Image src="./person.svg" height={40} width={40} alt="User Profile" />
          </Link>
        ) : (
          <Button onClick={() => router.push("/login")} size="lg" variant="ghost">
            Login
          </Button>
        )}
        </div>
      </div>
    </header>
  );
}
