"use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function AddTopic() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!name || !email || !password) {
//       alert("Name, emai and password are required.");
//       return;
//     }

//     try {
//       const res = await fetch("http://localhost:3001/api/topics", {
//         method: "POST",
//         headers: {
//           "Content-type": "application/json",
//         },
//         body: JSON.stringify({ title, description }),
//       });

//       if (res.ok) {
//         router.push("/course");
//       } else {
//         throw new Error("Failed to create a topic");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col gap-3">
//       <input
//         onChange={(e) => setName(e.target.value)}
//         value={name}
//         className="border border-slate-500 px-8 py-2"
//         type="text"
//         placeholder="Name"
//       />

//       <input
//         onChange={(e) => setEmail(e.target.value)}
//         value={email}
//         className="border border-slate-500 px-8 py-2"
//         type="text"
//         placeholder="Email"
//       />

//       <input
//         onChange={(e) => setPassword(e.target.value)}
//         value={password}
//         className="border border-slate-500 px-8 py-2"
//         type="text"
//         placeholder="Password"
//       />

//       <button
//         type="submit"
//         className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
//       >
//         Login
//       </button>
//     </form>

//   );
// }

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function AddTopic() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isRegistering, setIsRegistering] = useState(true); // State to track whether user is registering or logging in
//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (isRegistering && (!name || !email || !password)) {
//       alert("Name, email, and password are required.");
//       return;
//     } else if (!email || !password) {
//       alert("Email and password are required.");
//       return;
//     }

//     const userData = isRegistering ? { name, email, password } : { email, password };

//     try {
//       const res = await fetch("http://localhost:3001/api/register", {
//         method: "POST",
//         headers: {
//           "Content-type": "application/json",
//         },
//         body: JSON.stringify(userData),
//       });
//       console.log("res", res);

//       if (res.ok) {
//         router.push("/course");
//         return;
//       } else {
//         throw new Error("Failed to create a user");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col gap-3">
//       {isRegistering && (
//         <input
//           onChange={(e) => setName(e.target.value)}
//           value={name}
//           className="border border-slate-500 px-8 py-2"
//           type="text"
//           placeholder="Name"
//         />
//       )}

//       <input
//         onChange={(e) => setEmail(e.target.value)}
//         value={email}
//         className="border border-slate-500 px-8 py-2"
//         type="text"
//         placeholder="Email"
//       />

//       <input
//         onChange={(e) => setPassword(e.target.value)}
//         value={password}
//         className="border border-slate-500 px-8 py-2"
//         type="password" // Change type to password for secure input
//         placeholder="Password"
//       />

//       <button
//         type="submit"
//         className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
//       >
//         {isRegistering ? "Register" : "Login"}
//       </button>

//       {/* Toggle between registering and logging in */}
//       <button
//         type="button"
//         onClick={() => setIsRegistering(!isRegistering)}
//         className="bg-blue-600 font-bold text-white py-3 px-6 w-fit"
//       >
//         {isRegistering ? "Already have an account? Login" : "Create an account"}
//       </button>
//     </form>
//   );
// }

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";
import Image from "next/image";
import "../globals.css";
import { Button } from "@/components/ui/button";

export default function AddTopic() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(true); // State to track whether user is registering or logging in
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isRegistering && (!name || !email || !password)) {
      alert("Name, email, and password are required.");
      return;
    } else if (!email || !password) {
      alert("Email and password are required.");
      return;
    }

    const userData = isRegistering
      ? { name, email, password }
      : { email, password };
    const endpoint = isRegistering ? "register" : "login"; // Determine the endpoint based on isRegistering

    try {
      const res = await fetch(`http://localhost:3000/api/${endpoint}`, {
        // Use dynamic endpoint
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      console.log(res);
      if (res.ok) {
        const data = await res.json();
        const { token, user } = data;
        console.log("user", user);

        localStorage.setItem("isLoggedIn", true); // Set login status to true
        localStorage.setItem("userName", user.name); // Set the logged-in user's name
        localStorage.setItem("userEmail", user.email); // Set the logged-in user's name
        localStorage.setItem("userId", user._id); // Set the logged-in user's name
        localStorage.setItem("user", JSON.stringify(user)); // Store user data in local storage

        router.push("/course");
        return;
      } else {
        throw new Error("Failed to create a user or login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-[998px] mx-auto flex-1 w-full flex flex-col lg:flex-row items-center p-4 gap-2 justify-between ">

      <div className="relative w-[240px] h-[240px] lg:w-[424px] lg:h-[424px] mb-8 lg:mb-0">
        <Image src="/hero.svg" alt="hero" layout="fill" objectFit="cover" />
      </div>
      <div className="flex flex-col items-center gap-y-2">
      
      <form
        onSubmit={handleSubmit}
        className={styles.center}  
      >
      <h1 className="text-2xl font-extrabold text-green-600 tracking-wide top-11 bottom-6 ">
      {isRegistering
            ? "REGISTER"
            : "LOGIN"}
          </h1>
        {isRegistering && (
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="border border-slate-500 px-8 py-2 rounded-sm border-2"
            type="text"
            placeholder="Name"
          />
        )}

        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="border border-slate-500 px-8 py-2 rounded-sm border-2"
          type="text"
          placeholder="Email"
        />

        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="border border-slate-500 px-8 py-2 rounded-sm border-2"
          type="password" // Change type to password for secure input
          placeholder="Password"
        />

        <Button size="lg" variant="secondary" className="w-full">
          {isRegistering ? "Register" : "Login"}
        </Button>

        {/* Toggle between registering and logging in */}
        <Button size="lg" variant="primary" className="w-full"
          onClick={() => setIsRegistering(!isRegistering)}
        >
          {isRegistering
            ? "Already have an account? Login"
            : "Create an account"}
        </Button>
      </form>
      </div>
    </div>
  );
}
