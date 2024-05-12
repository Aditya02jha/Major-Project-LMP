"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./styles/navBar.module.css";
import ThemeSwitch from "./ThemeSwitch";
import { Button } from "./ui/button";
import Image from "next/image";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [points, setPoints] = useState(0);
  const [badge, setBadge] = useState("");
  const router = useRouter();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    const name = localStorage.getItem("userName");
    const email = localStorage.getItem("userEmail");
    const id = localStorage.getItem("userId");

    if (!loggedIn) {
      router.push("/login");
      return;
    }

    if (loggedIn && name && email && id) {
      setIsLoggedIn(true);
      setUserName(name);
      setUserEmail(email);
      setUserId(id);
      fetchUserPoints(id);
    }
  }, []);

  useEffect(() => {
    updateBadge(points);
  }, [points]);

  const fetchUserPoints = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/points?userId=${userId}`
      );
      const data = await response.json();
      if (response.ok) {
        setPoints(data.points);
      } else {
        console.error("Failed to fetch user points:", data.error);
      }
    } catch (error) {
      console.error("Error fetching user points:", error);
    }
  };

  const updateBadge = (points) => {
    if (points < 10) {
      setBadge("Noob");
    } else if (points < 50) {
      setBadge("Beginner");
    } else if (points < 100) {
      setBadge("Intermediate");
    } else {
      setBadge("Advanced");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    // <nav className={styles.navbar}>
    <div className="sticky top-8 bg-white pb-3 lg:pt-[-28px] lg:mt-[-28px] flex items-center justify-between border-b-2 mb-5 text-neutral-400 lg:z-50">
      {/* <div className={styles.navbarLeft}> */}
      <div className=" flex items-center justify-between w-full lg:w-auto text-black font-extrabold mt-[-28px]">
        {/* <Link href="/course" className={styles.navbarBrand}>
                    LMP
                </Link> */}
        <div className="mx-4 mt-[-15px]">
          {isLoggedIn && (
            <Link href={`/user/${userId}`} className="mx-4 uppercase flex items-center mt-4">
              <Image
                src="/person.svg"
                width={35}
                height={35}
                className=" border-black-500 border-2 rounded-full p-1 hover:-translate-y-1/4 mx-2 "
              />
              <>{userName}</>
            </Link>
          )}
        </div>
      </div>

      <div className="flex justify-between mx-4 items-start mt-[-30px]">
        <Button size="sm" variant="sidebar">
          <Image src="/points.svg" height={25} width={25} />
          {points}
        </Button>
        <Button size="sm" variant="sidebar">
          {badge}
        </Button>
      </div>

      <div className="flex justify-between mx-4 items-start mt-[-30px]">
        <ThemeSwitch />
        {/* {userEmail === "ayushjha5467@gmail.com" && (
          <Link href="/addTopic" className={styles.addQues}>
            Add Courses
          </Link>
        )} */}
        {isLoggedIn ? (
          <Button
            onClick={handleLogout}
            size="sm"
            variant="danger"
            className="w-full mx-4"
          >
            Logout
          </Button>
        ) : (
          <Link href="/login" className={styles.navbarButton}>
            <Button size="sm" variant="primary" className="w-full">
              LOGIN
            </Button>
          </Link>
        )}
      </div>
    </div>
    // </nav>
  );
}
