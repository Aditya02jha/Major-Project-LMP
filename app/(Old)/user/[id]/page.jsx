"use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import styles from '../user.module.css'

// export default function AddQuestion({ params }) {
//     const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track user login status
//     const [userName, setUserName] = useState(""); // State to store the logged-in user's name
//     const [userId, setUserId] = useState("");
//     const [userInfo, setUserInfo] = useState({});
//     const { id } = params;

//     const router = useRouter();

//     useEffect(() => {
//         const loggedIn = localStorage.getItem("isLoggedIn");
//         const name = localStorage.getItem("userName");
//         const userDetail = localStorage.getItem("user");
//         const Id = localStorage.getItem("userId");
//         if (!loggedIn) {
//             router.push("/login");
//             return;
//         }
//         if (loggedIn && name) {
//             setIsLoggedIn(true);
//             setUserName(name);
//             setUserId(Id);
//             const parsedUserInfo = JSON.parse(userDetail);
//             setUserInfo(parsedUserInfo);
//         }
//     }, [isLoggedIn])

//     return (
//         <>
//             <div className={styles.center}>
//                 <h2>User Information</h2>
//                 <p><strong>User ID:</strong> {userInfo._id}</p>
//                 <p><strong>Name:</strong> {userInfo.name}</p>
//                 <p><strong>Email:</strong> {userInfo.email}</p>
//                 {/* Add more properties as needed */}
//             </div>
//         </>
//     );
// }









// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import styles from '../user.module.css'

// export default function AddQuestion({ params }) {
//     const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track user login status
//     const [userName, setUserName] = useState(""); // State to store the logged-in user's name
//     const [userId, setUserId] = useState("");
//     const [userInfo, setUserInfo] = useState({});
//     const [userPoints, setUserPoints] = useState(0); // State to store user points
//     const { id } = params;

//     const router = useRouter();

//     useEffect(() => {
//         const loggedIn = localStorage.getItem("isLoggedIn");
//         const name = localStorage.getItem("userName");
//         const userDetail = localStorage.getItem("user");
//         const Id = localStorage.getItem("userId");
//         if (!loggedIn) {
//             router.push("/login");
//             return;
//         }
//         if (loggedIn && name) {
//             setIsLoggedIn(true);
//             setUserName(name);
//             setUserId(Id);
//             const parsedUserInfo = JSON.parse(userDetail);
//             setUserInfo(parsedUserInfo);

//             // Fetch user points from the database
//             fetchUserPoints(parsedUserInfo._id);
//         }
//     }, [isLoggedIn]);

//     // const fetchUserPoints = async (userId) => {
//     //     try {
//     //         // const res = await fetch('http://localhost:3000/api/points');
//     //         const res = await fetch(`http://localhost:3000/api/points/${userId}`);
//     //         if (!res.ok) {
//     //             throw new Error("Failed to fetch user points");
//     //         }
//     //         console.log("user res", res)
//     //         const data = await res.json();
//     //         setUserPoints(data.points);
//     //     } catch (error) {
//     //         console.error(error);
//     //     }
//     // };

//     const fetchUserPoints = async (userId) => {
//         try {
//             const res = await fetch(`http://localhost:3000/api/points/${userId}`);
//             if (!res.ok) {
//                 throw new Error("Failed to fetch user points");
//             }
//             const data = await res.json();
//             const previousPoints = userPoints; // Save previous points
//             setUserPoints(data.points);

//             // If points have increased, update the badge
//             if (data.points > previousPoints) {
//                 updateBadge(data.points);
//             }
//         } catch (error) {
//             console.error(error);
//         }
//     };


//     // const updateBadge = (points) => {
//     //     if (points >= 10 && points < 50) {
//     //         setUserInfo({ ...userInfo, badge: "Beginner" });
//     //     } else if (points >= 50 && points < 100) {
//     //         setUserInfo({ ...userInfo, badge: "Intermediate" });
//     //     } else {
//     //         setUserInfo({ ...userInfo, badge: "Noob" });
//     //     }
//     // };

//     // const id = userInfo._id
//     const updateBadge = async (userId, badge) => {
//         try {
//             // const res = await fetch(`http://localhost:3000/api/updateBadge?userId=${userId}`, {
//             const res = await fetch(`http://localhost:3000/api/updateBadge/${id}`, {
//                 method: "PUT",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ badge }),
//             });
//             console.log(id);

//             if (!res.ok) {
//                 throw new Error("Failed to update badge");
//             }

//             const data = await res.json();
//             console.log(data); // Log the response message
//         } catch (error) {
//             console.error("Error updating badge:", error);
//         }
//     };


//     return (
//         <>
//             <div className={styles.center}>
//                 <h2>User Information</h2>
//                 <p><strong>User ID:</strong> {userInfo._id}</p>
//                 <p><strong>Name:</strong> {userInfo.name}</p>
//                 <p><strong>Email:</strong> {userInfo.email}</p>
//                 <p><strong>Badge:</strong> {userInfo.badge}</p>
//                 <p><strong>Points:</strong> {userPoints}</p>
//             </div>
//         </>
//     );
// }









import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ThemeProvider, useTheme } from 'next-themes';
import styles from '../user.module.css'

export default function AddUserDetal({ params }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");
    const [userId, setUserId] = useState("");
    const [userInfo, setUserInfo] = useState({});
    const [userPoints, setUserPoints] = useState(0);
    const { id } = params;
  const { resolvedTheme } = useTheme();

    const router = useRouter();

    useEffect(() => {
        const loggedIn = localStorage.getItem("isLoggedIn");
        const name = localStorage.getItem("userName");
        const userDetail = localStorage.getItem("user");
        const Id = localStorage.getItem("userId");
        if (!loggedIn) {
            router.push("/login");
            return;
        }
        if (loggedIn && name) {
            setIsLoggedIn(true);
            setUserName(name);
            setUserId(Id);
            const parsedUserInfo = JSON.parse(userDetail);
            setUserInfo(parsedUserInfo);

            // Fetch user points from the database
            fetchUserPoints(parsedUserInfo._id);
        }
    }, [isLoggedIn]);

    const fetchUserPoints = async (userId) => {
        try {
            const res = await fetch(`http://localhost:3000/api/points/${userId}`);
            if (!res.ok) {
                throw new Error("Failed to fetch user points");
            }
            const data = await res.json();
            const previousPoints = userPoints; // Save previous points
            setUserPoints(data.points);

            // If points have increased, update the badge
            if (data.points > previousPoints || data.points < previousPoints) {
                updateBadge(userId, data.points);
                updateBadgeInUI(data.points);
            }
        } catch (error) {
            console.error(error);
        }
    };

    // const updateBadge = async (userId, points) => {
    //     try {
    //         let badge = "";
    //         if (points >= 10 && points < 50) {
    //             badge = "Beginner";
    //         } else if (points >= 50 && points < 100) {
    //             badge = "Intermediate";
    //         } else {
    //             badge = "Noob";
    //         }

    //         const res = await fetch(`http://localhost:3000/api/updateBadge/${userId}`, {
    //             method: "PUT",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({ badge }),
    //         });

    //         if (!res.ok) {
    //             throw new Error("Failed to update badge");
    //         }

    //         const data = await res.json();
    //         console.log(data); // Log the response message
    //     } catch (error) {
    //         console.error("Error updating badge:", error);
    //     }
    // };


    const updateBadge = async (userId, points) => {
        try {
            let badge = "";
            if (points >= 10 && points < 50) {
                badge = "Beginner";
            } else if (points >= 50 && points < 100) {
                badge = "Intermediate";
            } else {
                badge = "Noob";
            }

            const res = await fetch(`http://localhost:3000/api/updateBadge/${userId}?badge=${badge}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) {
                throw new Error("Failed to update badge");
            }

            const data = await res.json();
            // console.log(data); // Log the response message
        } catch (error) {
            console.error("Error updating badge:", error);
        }
    };

    const updateBadgeInUI = (points) => {
        if (points >= 10 && points < 50) {
            setUserInfo({ ...userInfo, badge: "Beginner" });
        } else if (points >= 50 && points < 100) {
            setUserInfo({ ...userInfo, badge: "Intermediate" });
        } else {
            setUserInfo({ ...userInfo, badge: "Noob" });
        }
    };

    return (
        <ThemeProvider>
            <div className={`${styles.center}`}>
                <div className={`${styles.card} ${resolvedTheme === 'dark' ? styles.darkCard : styles.lightCard}`}
>
                    <h2 className={styles.heading}>User Information</h2>
                    <p><strong>User ID:</strong> {userInfo._id}</p>
                    <p><strong>Name:</strong> {userInfo.name}</p>
                    <p><strong>Email:</strong> {userInfo.email}</p>
                    <p><strong>Badge:</strong> {userInfo.badge}</p>
                    <p><strong>Points:</strong> {userPoints}</p>
                </div>
            </div>
        </ThemeProvider>
    );
}
