"use client";


import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from '../addAnswer.module.css'

export default function AddAnswer({ params }) {
    const [text, setText] = useState("");
    const [options, setOptions] = useState(["", "", "", ""]);
    const [correctOptionIndex, setCorrectOptionIndex] = useState(0);
    const { id } = params;

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!text || !Array.isArray(options) || options.some(opt => !opt.trim())) {
            alert("Question and all options are required.");
            return;
        }

        try {
            const res = await fetch(`http://localhost:3000/api/answer/${id}`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ text, options, correctOptionIndex }),
            });

            // console.log("Response:", res);


            if (res.ok) {
                router.push(`/editTopic/${id}`);
                // router.push("/course");
                return;
            } else {
                throw new Error("Failed to add text");
            }
        } catch (error) {
            console.log(error);
        }
    };



    return (
        <>
            <h1>Add Answer</h1>
        </>
    );
}
