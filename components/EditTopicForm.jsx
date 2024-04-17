"use client"

// import { useEffect, useState } from "react";
// import styles from './styles/editTopic.module.css';
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// export default function EditTopicForm({ id, title, description }) {
//     const [questions, setQuestions] = useState([]);
//     const [user, setUserId] = useState('');
//     const [selectedOptionElement, setSelectedOptionElement] = useState(null);
//     const router = useRouter();

//     useEffect(() => {
//         const Id = localStorage.getItem('userId');
//         setUserId(Id);
//         const getQuestions = async () => {
//             try {
//                 const res = await fetch(`http://localhost:3000/api/question/${id}`, {
//                     cache: 'no-store',
//                 });
//                 if (!res.ok) {
//                     throw new Error('Failed to fetch questions');
//                 }
//                 const data = await res.json();
//                 const questionsArray = Array.isArray(data.question) ? data.question : [data.question];
//                 setQuestions(questionsArray);
//             } catch (error) {
//                 console.error(error);
//             }
//         };
//         getQuestions();
//     }, []);

//     const handleclick = async (selectedOptionIndex, quesId, optionElement) => {
//         try {
//             const res = await fetch(`http://localhost:3000/api/answer/${quesId}`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-type': 'application/json',
//                 },
//                 body: JSON.stringify({ selectedOptionIndex, user }),
//             });

//             const data = await res.json();
//             console.log('Response:', data.message);

//             if (res.ok) {
//                 // optionElement.style.backgroundColor = data.message === 'Correct answer!' ? 'green' : 'red';
//                 if (selectedOptionElement) {
//                     selectedOptionElement.style.backgroundColor = ''; // Reset previous option's background color
//                 }
//                 optionElement.style.backgroundColor = data.message === 'Correct answer!' ? '#2dd72d' : '#f50d0ddb';
                
//                 setSelectedOptionElement(optionElement);
//             } else {
//                 throw new Error('Failed to add text');
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     return (
//         <div className={styles.main}>
//             <h1 className={styles.topic}>Topic: {title}</h1>
//             <h4 className={styles.description}>{description}</h4>
//             <div className={styles.header}>
//                 <h1>All Questions</h1>
//                 <Link href={`/addQuestion/${id}`} className={styles.addQues}>
//                     Add Question
//                 </Link>
//             </div>
//             <div className={styles.box}>
//                 {questions.length > 0 ? (
//                     questions.map((ques, key) => (
//                         <div key={key} className={styles.questionContainer}>
//                             <h3 className={styles.question}>
//                                 {key + 1}. {ques.text}
//                             </h3>
//                             <div className={styles.optionsContainer}>
//                                 {ques.options.map((val, i) => (
//                                     <p
//                                         key={i}
//                                         className={styles.option}
//                                         onClick={(e) => {
//                                             handleclick(i, ques._id, e.target);
//                                         }}
//                                     >
//                                         {String.fromCharCode(97 + i)}. {val}
//                                     </p>
//                                 ))}
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <h1 className={styles.topic}>Add Questions</h1>
//                 )}
//             </div>
//         </div>
//     );
// }



// EditTopicForm.js
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from './styles/editTopic.module.css';

export default function EditTopicForm({ id, title, description, updateUserPoints }) {
    const [questions, setQuestions] = useState([]);
    const [user, setUserId] = useState('');
    const [userEmail, setUserEmail] = useState("");
    const [selectedOptionElement, setSelectedOptionElement] = useState(null);

    useEffect(() => {
        const Id = localStorage.getItem('userId');
        const email = localStorage.getItem("userEmail");
        setUserId(Id);
        const getQuestions = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/question/${id}`, {
                    cache: 'no-store',
                });
                if (!res.ok) {
                    throw new Error('Failed to fetch questions');
                }
                const data = await res.json();
                const questionsArray = Array.isArray(data.question) ? data.question : [data.question];
                setQuestions(questionsArray);
            } catch (error) {
                console.error(error);
            }
        };
        getQuestions();
        setUserEmail(email);
    }, []);

    const handleclick = async (selectedOptionIndex, quesId, optionElement) => {
        try {
            const res = await fetch(`http://localhost:3000/api/answer/${quesId}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ selectedOptionIndex, user }),
            });

            const data = await res.json();
            console.log('Response:', data.message);

            if (res.ok) {
                if (selectedOptionElement) {
                    selectedOptionElement.style.backgroundColor = ''; // Reset previous option's background color
                }
                optionElement.style.backgroundColor = data.message === 'Correct answer!' ? '#2dd72d' : '#f50d0ddb';
                setSelectedOptionElement(optionElement);
                
                // Call the updateUserPoints function to update points in the Navbar
                // updateUserPoints();
            } else {
                throw new Error('Failed to add text');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={styles.main}>
            <h1 className={styles.topic}>Course: {title}</h1>
            <h4 className={styles.description}>{description}</h4>
            <div className={styles.header}>
                <h1>All Questions</h1>
                {console.log("email", userEmail)}
                {userEmail === "ayushjha5467@gmail.com" ? (
                    <Link href={`/addQuestion/${id}`} className={styles.addQues}>
                    Add Question
                </Link>
                ) : (
                    <span className={styles.disabledButton}>Add Question</span>
                )}
            </div>
            <div className={styles.box}>
                {questions.length > 0 ? (
                    questions.map((ques, key) => (
                        <div key={key} className={styles.questionContainer}>
                            <h3 className={styles.question}>
                                {key + 1}. {ques.text}
                            </h3>
                            <div className={styles.optionsContainer}>
                                {ques.options.map((val, i) => (
                                    <p
                                        key={i}
                                        className={styles.option}
                                        onClick={(e) => {
                                            handleclick(i, ques._id, e.target);
                                        }}
                                    >
                                        {String.fromCharCode(97 + i)}. {val}
                                    </p>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <h1 className={styles.topic}>Add Questions</h1>
                )}
            </div>
        </div>
    );
}
