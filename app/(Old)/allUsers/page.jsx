"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ThemeProvider, useTheme } from "next-themes";
import styles from "./allUsers.module.css";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function AllUser() {
  const [users, setUsers] = useState([]);
  const [description, setDescription] = useState("");
  const { resolvedTheme } = useTheme();

  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/user");
        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await res.json(); // Parse response
        setUsers(data.user);
        // console.log(data.user)
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  // Filter out the current user and the specific user by email
  const filteredUsers = users.filter(
    (user) =>
      user.email !== "ayushjha5467@gmail.com" &&
      user.id !== localStorage.getItem("userId")
  );

  return (
    <ThemeProvider>
      {/* <div className={styles.center}>
        <h1 className={styles.heading}>All Users</h1>
        <div className={styles.main}>  */}
      <div className="max-w-[912px] px-3 mx-auto mt-4 m-7">
        <div>
          <h1 className="text-2xl font-bold text-neutral-700 mt-2">All Users</h1>
        </div>
        <div className="flex justify-between items-center m-7">
          <div>
            {filteredUsers.map((user, index) => (
              
              <div
                className={`${styles.card} ${
                  resolvedTheme === "dark" ? styles.darkCard : styles.lightCard
                }`}
                key={index}
              >
              <div className="flex-col justify-normal items-center">
              <Image src="/smartUser.jpg" alt="user" height={50} width={50} className="rounded-full " />
                <p className="uppercase ">
                  <span className={styles.name}>Name:</span> {user.name}
                </p>
                <p className="uppercase ">
                  {" "}
                  <span className={styles.name}>Email:</span> {user.email}
                </p>
                <p className="uppercase ">
                  {" "}
                  <span className={styles.name}>Badge: </span>
                  {user.badge}
                </p>
              </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
