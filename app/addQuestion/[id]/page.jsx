"use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import styles from '../addQuestion.module.css'

// export default function AddQuestion({ params }) {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const { id } = params;

//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!title || !description) {
//       alert("Title and description are required.");
//       return;
//     }

//     try {
//       const res = await fetch(`http://localhost:3000/api/text/${id}`, {
//         method: "POST",
//         headers: {
//           "Content-type": "application/json",
//         },
//         body: JSON.stringify({ title, description }),
//       });

//       if (res.ok) {
//         router.push(`/editTopic/${id}`);
//         return;
//       } else {
//         throw new Error("Failed to create a topic");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}
//       // className="flex flex-col items-center justify-center h-screen gap-3" style={{height: '100vh'}}
//       className={styles.center}
//     >
//       <p>{id}</p>
//       <input
//         onChange={(e) => setTitle(e.target.value)}
//         value={title}
//         className="border border-slate-500 px-8 py-2"
//         type="text"
//         placeholder="Topic Title"
//       />

//       <input
//         onChange={(e) => setDescription(e.target.value)}
//         value={description}
//         className="border border-slate-500 px-8 py-2"
//         type="text"
//         placeholder="Topic Description"
//       />

//       <button
//         type="submit"
//         className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
//       >
//         Add
//       </button>
//     </form>
//   );
// }


import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from '../addQuestion.module.css'

export default function AddQuestion({ params }) {
  const [text, setText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctOptionIndex, setCorrectOptionIndex] = useState(0);
  const { id } = params;

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    // Check if all fields are filled
    if (!text || !Array.isArray(options) || options.some(opt => !opt.trim())) {
      alert("Question and all options are required.");
      return;
    }
    // console.log("type", typeof (text), typeof (options), typeof (correctOptionIndex))

    // Log the request body to debug
    // console.log("Request Body:", { text, options, correctOptionIndex });

    try {
      const res = await fetch(`http://localhost:3000/api/question/${id}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ text, options, correctOptionIndex }),
      });

      // console.log("Response:", res);


      if (res.ok) {
        router.push(`/editTopic/${id}`);
        // router.push("/");
        return;
      } else {
        throw new Error("Failed to add text");
      }
    } catch (error) {
      console.log(error);
    }
  };


  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  // const handleOptionChange = (index, value) => {
  //   const newOptions = [...options];
  //   newOptions[index] = value;
  //   const questionsArray = Array.isArray(newOptions) ? newOptions : [newOptions];
  //   console.log("queArry", typeof(questionsArray))
  //   setOptions(questionsArray);
  // };


  return (
    <form onSubmit={handleSubmit} className={styles.center}>
      {/* <p>{id}</p> */}
      <textarea
        onChange={(e) => setText(e.target.value)}
        value={text}
        className={styles.question}
        type="text"
        placeholder="Question"
      />

      {options.map((opt, index) => (
        <input
          key={index}
          onChange={(e) => handleOptionChange(index, e.target.value)}
          value={opt}
          className={styles.option}
          type="text"
          placeholder={`Option ${index + 1}`}
        />
      ))}

      <select
        value={correctOptionIndex}
        onChange={(e) => setCorrectOptionIndex(Number(e.target.value))}
        className="border border-slate-500 px-8 py-2 mb-4"
      >
        {/* <option value="" disabled>Select option</option> */}
        {options.map((_, index) => (
          <option key={index} value={index}>
            Option {index + 1}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className={styles.btn}
      >
        Add
      </button>
    </form>
  );
}
