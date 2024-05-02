"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from './addTopic.module.css'

export default function AddTopic() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [variety, setVariety] = useState("");
  const [read, setRead] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !variety || !read) {
      alert("Title, description, read link and variety are required.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/topics", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title, description, variety, read }), // Make sure variety is included here
      });

      if (res.ok) {
        router.push("/");
        return;
      } else {
        throw new Error("Failed to create a topic");
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <form onSubmit={handleSubmit} className={styles.center}>
      <h1 className={styles.heading}>Add New Courses</h1>
    <input
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={`${styles.input} ${styles.border}`}
        type="text"
        placeholder="Topic Title"
    />

    <input
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className={`${styles.input} ${styles.border}`}
        type="text"
        placeholder="Topic Description"
    />

    <input
        onChange={(e) => setVariety(e.target.value)}
        value={variety}
        className={`${styles.input} ${styles.border}`}
        type="text"
        placeholder="Variety"
    />

    <input
        onChange={(e) => setRead(e.target.value)}
        value={read}
        className={`${styles.input} ${styles.border}`}
        type="text"
        placeholder="Read More Link"
    />

    <button
        type="submit"
        className={`${styles.button} ${styles.bgGreen} ${styles.fontBold} ${styles.textWhite} ${styles.py3} ${styles.px6} ${styles.wFit}`}
    >
        Add Topic
    </button>
</form>

  );
}