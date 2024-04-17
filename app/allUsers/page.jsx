"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from './allUsers.module.css'

export default function AllUser() {
  const [users, setUsers] = useState([]);
  const [description, setDescription] = useState("");

  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/user');
        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await res.json(); // Parse response
        setUsers(data.user);
        // console.log(data.user)
      } catch (error) {
        console.log(error);
      }
    }
    fetchUser();
  }, []);

  return (
    <div className={styles.center}>
      <h1 className={styles.heading}>All Users</h1>
      <div className={styles.main}>
        {users.map((user, index) => (
          <div className={styles.card} key={index}>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Badge: {user.badge}</p>
          </div>
        ))}
      </div>
    </div>

  );
}