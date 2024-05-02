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

  // Filter out the current user and the specific user by email
  const filteredUsers = users.filter(user => user.email !== "ayushjha5467@gmail.com" && user.id !== localStorage.getItem("userId"));

  return (
    <div className={styles.center}>
      <h1 className={styles.heading}>All Users</h1>
      <div className={styles.main}>
        {filteredUsers.map((user, index) => (
          <div className={styles.card} key={index}>
            <p><span className={styles.name}>Name:</span>  {user.name}</p>
            <p> <span className={styles.name}>Email:</span> {user.email}</p>
            <p> <span className={styles.name}>Badge: </span>{user.badge}</p>
          </div>
        ))}
      </div>
    </div>

  );
}
