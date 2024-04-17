"use client"

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import styles from "./styles/navBar.module.css";

// export default function Navbar() {
//     const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track user login status
//     const [userName, setUserName] = useState(""); // State to store the logged-in user's name
//     const [userId, setUserId] = useState(""); // State to store the logged-in user's ID
//     const [points, setPoints] = useState(0); // State to store the user's points
//     const router = useRouter();

//     useEffect(() => {
//         const fetchUserPoints = async () => {
//             try {
//                 // Fetch the userId from local storage
//                 const userId = localStorage.getItem("userId");

//                 if (!userId) {
//                     console.error("User ID not found in localStorage");
//                     return;
//                 }

//                 // Fetch user points from the API route
//                 const res = await fetch(`http://localhost:3000/api/points?userId=${userId}`);
//                 const data = await res.json();

//                 console.log("res", res);
//                 if (res.ok) {
//                     setPoints(data.points);
//                 } else {
//                     console.error("Failed to fetch user points:", data.error);
//                 }
//             } catch (error) {
//                 console.error("Error fetching user points:", error);
//             }
//         };

//         // Check if the user is logged in based on the presence of isLoggedIn in local storage
//         const loggedIn = localStorage.getItem("isLoggedIn");
//         const name = localStorage.getItem("userName");
//         const Id = localStorage.getItem("userId");
//         if (!loggedIn) {
//             router.push("/login");
//             return;
//         }
//         if (loggedIn && name) {
//             setIsLoggedIn(true);
//             setUserName(name);
//             setUserId(Id);
//             fetchUserPoints(); // Fetch user points when the component mounts
//         }
//     }, [points]);

//     const handleLogout = () => {
//         // Perform logout actions here (e.g., clear tokens from local storage)
//         localStorage.removeItem("isLoggedIn");
//         localStorage.removeItem("userName");
//         setIsLoggedIn(false);
//         setUserName("");
//         router.push("/login"); // Redirect to home page after logout
//     };

//     return (
//         <nav className={styles.navbar}>
//             <div className={styles.navbarLeft}>
//                 <Link href="/" className={styles.navbarBrand}>
//                     APAM
//                 </Link>
//                 {isLoggedIn && (
//                     <Link href={`/user/${userId}`} className={styles.navbarName}>
//                         {userName}
//                     </Link>
//                 )}
//                 <p className={styles.point}>Points: {points}</p> {/* Display user points in the navbar */}
//             </div>
//             <div className={styles.navbarRight}>
//                 <Link href="/addTopic" className={styles.navbarBrand}>
//                     Add Topics
//                 </Link>
//                 {isLoggedIn ? (
//                     <button onClick={handleLogout} className={styles.navbarButton}>
//                         Logout
//                     </button>
//                 ) : (
//                     <Link href="/login" className={styles.navbarButton}>
//                         Login
//                     </Link>
//                 )}
//             </div>
//         </nav>
//     );
// }


// Navbar.js
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./styles/navBar.module.css";

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userId, setUserId] = useState("");
    const [points, setPoints] = useState(0);
    const [userPoints, setUserPoints] = useState(0);
    const [updateBadge, setUpdateBadge] = useState("");
    const [userInfo, setUserInfo] = useState({});
    const router = useRouter();

    useEffect(() => {
        const fetchUserPoints = async () => {
            try {
                const userId = localStorage.getItem("userId");
                if (!userId) {
                    console.error("User ID not found in localStorage");
                    return;
                }
                const res = await fetch(`http://localhost:3000/api/points?userId=${userId}`);
                const data = await res.json();
                if (res.ok) {
                    setPoints(data.points);
                } else {
                    console.error("Failed to fetch user points:", data.error);
                }
            } catch (error) {
                console.error("Error fetching user points:", error);
            }
        };

        const fetchUserPointsUI = async () => {
            try {
                const userId = localStorage.getItem("userId");
                if (!userId) {
                    console.error("User ID not found in localStorage");
                    return;
                }
                const res = await fetch(`http://localhost:3000/api/points?userId=${userId}`);
                if (!res.ok) {
                    throw new Error("Failed to fetch user points");
                }
                const data = await res.json();
                setUserPoints(data.points); // Update userPoints state
                // console.log("point", data)

                // Update the badge based on the new points
                updateBadgeInUI(data.points);
                updateBadge(data.points)
            } catch (error) {
                console.error(error);
            }
        };


        const updateBadge = async (points) => {
            try {
                const userId = localStorage.getItem("userId");
                if (!userId) {
                    console.error("User ID not found in localStorage");
                    return;
                }
                let badge = "";
                if (points >= 10 && points < 50) {
                    badge = "Beginner";
                } else if (points >= 50 && points < 100) {
                    badge = "Intermediate";
                } else {
                    badge = "Noob";
                }

                const res = await fetch(`http://localhost:3000/api/updateBadge?userId=${userId}&badge=${badge}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                // console.log("id", userId)

                if (!res.ok) {
                    throw new Error("Failed to update badge");
                }

                // console.log("res", res);
                const data = await res.json();
                setUpdateBadge(data.badge);
                // console.log(data); // Log the response message
            } catch (error) {
                console.error("Error updating badge:", error);
            }
        };

        const loggedIn = localStorage.getItem("isLoggedIn");
        const name = localStorage.getItem("userName");
        const email = localStorage.getItem("userEmail");
        const Id = localStorage.getItem("userId");
        const userDetail = localStorage.getItem("user");
        if (!loggedIn) {
            router.push("/login");
            return;
        }
        if (loggedIn && name) {
            setIsLoggedIn(true);
            setUserName(name);
            setUserId(Id);
            setUserEmail(email);
            const parsedUserInfo = JSON.parse(userDetail);
            setUserInfo(parsedUserInfo);
            fetchUserPoints();
            fetchUserPointsUI();
            // updateBadge();
        }
    }, [points]);


    const updateBadgeInUI = (points) => {
        if (points >= 10 && points < 50) {
            setUserInfo({ ...userInfo, badge: "Beginner" });
        } else if (points >= 50 && points < 100) {
            setUserInfo({ ...userInfo, badge: "Intermediate" });
        } else {
            setUserInfo({ ...userInfo, badge: "Noob" });
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userName");
        setIsLoggedIn(false);
        setUserName("");
        router.push("/login");
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.navbarLeft}>
                <Link href="/" className={styles.navbarBrand}>
                    APAM
                </Link>
                {isLoggedIn && (
                    <Link href={`/user/${userId}`} className={styles.navbarName}>
                        {userName}
                    </Link>
                )}
                <p className={styles.point}>Points: {points}</p>
                {/* {console.log("info", userInfo)} */}
                <p className={styles.point}>Badge: {userInfo.badge}</p>
            </div>
            <div className={styles.navbarRight}>
                {/* <Link href="/addTopic" className={styles.navbarBrand}>
                    Add Topics
                </Link> */}
                {userEmail === "ayushjha5467@gmail.com" ? (
                    <Link href="/addTopic" className={styles.addQues}>
                        Add Courses
                    </Link>
                ) : (
                    <span className={styles.disabledButton}>Add Topics</span>
                )}

                {userEmail === "ayushjha5467@gmail.com" ? (
                    <Link href="/allUsers" className={styles.addQues}>All Users</Link>
                ) : (
                    <span className={`${styles.disabledButton} ${styles.hiddenButton}`}>All Users</span>
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
