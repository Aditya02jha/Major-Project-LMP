"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./addTopic.module.css";
import Image from "next/image";
import { Button } from "@/components/ui/button";

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
    <div className="max-w-[998px] mx-auto flex-1 w-full flex flex-col lg:flex-row items-center p-4 gap-2 justify-between overflow-hidden ">

      <div className="relative w-[240px] h-[240px] lg:w-[424px] lg:h-[424px] mb-8 lg:mb-0">
        <Image src="/AddCourse.jpg" alt="hero" layout="fill" objectFit="cover" />
      </div>
      <div className="flex flex-col items-center gap-y-2">

      <form onSubmit={handleSubmit} className={styles.center}>
        <h1 className="text-2xl font-extrabold text-green-600 tracking-wide top-11 bottom-6 mt-[-50px] shadow-black shadow-[0_0_10px_rgba(0, 0, 0, 0.5)] mb-4">Add New Courses</h1>
        <input 
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className="border border-slate-500 px-8 py-2 rounded-sm border-2 shadow hover:shadow-2xl"
          type="text"
          placeholder="Topic Title"
        />

        <input
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="border border-slate-500 px-8 py-2 rounded-sm border-2 shadow hover:shadow-2xl"
          type="text"
          placeholder="Topic Description"
        />

        <input
          onChange={(e) => setVariety(e.target.value)}
          value={variety}
          // className={`${styles.input} ${styles.border}`}
          className="border border-slate-500 px-8 py-2 rounded-sm border-2 shadow hover:shadow-2xl"
          type="text"
          placeholder="Variety"
        />

        <input
          onChange={(e) => setRead(e.target.value)}
          value={read}
          className="border border-slate-500 px-8 py-2 rounded-sm border-2 shadow hover:shadow-2xl"
          type="text"
          placeholder="Read More Link"
        />

        <Button size="lg" variant="secondary" className="w-full"
          type="submit"
          // className={`${styles.button} ${styles.bgGreen} ${styles.fontBold} ${styles.textWhite} ${styles.py3} ${styles.px6} ${styles.wFit}`}
        >
          Add Topic
        </Button>
      </form>
    </div>
    </div>
  );
}
