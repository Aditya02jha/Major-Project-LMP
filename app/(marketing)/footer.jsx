import { Button } from "@/components/ui/button";
import Image from "next/image";
export const Footer = () => {
  return (
    <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
      <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full ">
        <Button size="lg" variant="ghost">
          <Image
            src="/Cpp.svg"
            alt="cpplogo"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          C++
        </Button>
        <Button size="lg" variant="ghost">
          <Image
            src="/Docker.svg"
            alt="cpplogo"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          Docker
        </Button>
        <Button size="lg" variant="ghost">
          <Image
            src="/Github.svg"
            alt="cpplogo"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          Github
        </Button>
        <Button size="lg" variant="ghost">
          <Image
            src="/Java.svg"
            alt="cpplogo"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          Java
        </Button>
        <Button size="lg" variant="ghost">
          <Image
            src="/JavaScript.svg"
            alt="cpplogo"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          JavaScript
        </Button>
        <Button size="lg" variant="ghost">
          <Image
            src="/next.svg"
            alt="cpplogo"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          Next
        </Button>
        <Button size="lg" variant="ghost">
          <Image
            src="/React.svg"
            alt="cpplogo"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          React
        </Button>
        <Button size="lg" variant="ghost">
          <Image
            src="/TypeScript.svg"
            alt="cpplogo"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          TypeScript
        </Button>
        
      </div>
    </footer>
  );
};
