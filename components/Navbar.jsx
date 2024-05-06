import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./styles/navBar.module.css";
import ThemeSwitch from "./ThemeSwitch";

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
            const response = await fetch(`http://localhost:3000/api/points?userId=${userId}`);
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
        <nav className={styles.navbar}>
            <div className={styles.navbarLeft}>
                <Link href="/" className={styles.navbarBrand}>
                    LMP
                </Link>
                {isLoggedIn && (
                    <>
                        <Link href={`/user/${userId}`} className={styles.navbarName}>
                            {userName}
                        </Link>
                        <p className={styles.point}>Points: {points}</p>
                        <p className={styles.point}>Badge: {badge}</p>
                    </>
                )}
            </div>
            <div className={styles.navbarRight}>
                <ThemeSwitch />
                {userEmail === "ayushjha5467@gmail.com" && (
                    <Link href="/addTopic" className={styles.addQues}>
                        Add Courses
                    </Link>
                )}
                {isLoggedIn ? (
                    <button onClick={handleLogout} className={styles.navbarButton}>
                        Logout
                    </button>
                ) : (
                    <Link href="/login" className={styles.navbarButton}>
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
}
