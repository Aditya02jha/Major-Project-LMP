"use client"



// import { useState, useEffect } from "react";
// import Link from "next/link";
// import styles from './styles/editTopic.module.css';

// export default function EditTopicForm({ id, title, description, updateUserPoints }) {
//     const [questions, setQuestions] = useState([]);
//     const [user, setUserId] = useState('');
//     const [userEmail, setUserEmail] = useState("");
//     const [selectedOptionElement, setSelectedOptionElement] = useState(null);
//     const [correctAnswerIndexes, setCorrectAnswerIndexes] = useState([]);
//     const [showAnswers, setShowAnswers] = useState(false); // State to track whether to show answers or not
//     const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);
//     const [showOneAnswers, setShowOneAnswers] = useState([]); // State to track whether to show answers or not for individual questions

//     useEffect(() => {
//         const Id = localStorage.getItem('userId');
//         const email = localStorage.getItem("userEmail");
//         setUserId(Id);
//         console.log("ididid", Id);
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
//                 // Extract correct answer indexes from questions
//                 const correctIndexes = questionsArray.map(ques => ques.correctOptionIndex);
//                 setCorrectAnswerIndexes(correctIndexes);
//                 // Initialize showOneAnswers array with false values for each question
//                 setShowOneAnswers(new Array(questionsArray.length).fill(false));
//             } catch (error) {
//                 console.error(error);
//             }
//         };
//         getQuestions();
//         setUserEmail(email);
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
//                 if (selectedOptionElement) {
//                     selectedOptionElement.style.backgroundColor = ''; // Reset previous option's background color
//                 }
//                 const backgroundColor = data.message === 'Correct answer!' ? '#2dd72d' : '#f50d0ddb';
//                 optionElement.style.backgroundColor = backgroundColor;
//                 setSelectedOptionElement(optionElement);

//                 // Call the updateUserPoints function to update points in the Navbar
//                 // updateUserPoints();
//             } else {
//                 throw new Error('Failed to add text');
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const toggleShowAnswers = () => {
//         setShowAnswers(prevState => !prevState); // Toggle showAnswers state
//     };

//     const handleShowAnswer = (index) => {
//         setShowOneAnswers(prevState => {
//             const newShowOneAnswers = [...prevState]; // Create a copy of showOneAnswers array
//             newShowOneAnswers[index] = !newShowOneAnswers[index]; // Toggle the value for the clicked question index
//             return newShowOneAnswers;
//         });
//         setSelectedQuestionIndex(index); // Set the selected question index
//     };

//     return (
//         <div className={styles.main}>
//             <h1 className={styles.topic}>Course: {title}</h1>
//             <h4 className={styles.description}>{description}</h4>
//             <div className={styles.header}>
//                 <h1>All Questions</h1>
//                 {console.log("email", userEmail)}
//                 {userEmail === "ayushjha5467@gmail.com" ? (
//                     <Link href={`/addQuestion/${id}`} className={styles.addQues}>
//                         Add Question
//                     </Link>
//                 ) : (
//                     <span className={styles.disabledButton}>Add Question</span>
//                 )}
//                 <button className={styles.addQues} onClick={toggleShowAnswers}>
//                     {showAnswers ? 'Hide All Answers' : 'Show All Answers'}
//                 </button>
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
//                                     <>
//                                         <p
//                                             key={i}
//                                             className={`${styles.option} ${correctAnswerIndexes[key] === i + 1 && (showAnswers || showOneAnswers[key]) ? styles.correctOption : ''}`}
//                                             onClick={(e) => {
//                                                 handleclick(i, ques._id, e.target);
//                                             }}
//                                         >
//                                             {String.fromCharCode(97 + i)}. {val}
//                                         </p>
//                                     </>
//                                 ))}
//                                 <button className={styles.addQues} onClick={() => handleShowAnswer(key)}>
//                                     {showOneAnswers[key] ? 'Hide Answer' : 'Show Answer'}
//                                 </button>
//                                 {/* {selectedQuestionIndex === key && showOneAnswers[key] && (
//                                     <p className={styles.correctOption}>
//                                         Correct Answer: {String.fromCharCode(97 + ques.correctOptionIndex-1)}. {ques.options[ques.correctOptionIndex-1]}
//                                     </p>
//                                 )} */}
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <h1 className={styles.topic}>No Questions To Display. Add Questions!!</h1>
//                 )}
//             </div>
//         </div>
//     );
// }



import { useState, useEffect } from "react";
import Link from "next/link";
import styles from './styles/editTopic.module.css';
import { ThemeProvider, useTheme } from 'next-themes';
import RemoveQues from "./RemoveQues";

export default function EditTopicForm({ id, title, description, updateUserPoints }) {
    const [questions, setQuestions] = useState([]);
    const [user, setUserId] = useState('');
    const [userEmail, setUserEmail] = useState("");
    const [selectedOptionElement, setSelectedOptionElement] = useState(null);
    const [correctAnswerIndexes, setCorrectAnswerIndexes] = useState([]);
    const [showAnswers, setShowAnswers] = useState(false); // State to track whether to show answers or not
    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);
    const [showOneAnswers, setShowOneAnswers] = useState([]); // State to track whether to show answers or not for individual questions
    const [levels, setLevels] = useState([]);
    const [selectedLevel, setSelectedLevel] = useState(1);
    const { resolvedTheme } = useTheme();

    useEffect(() => {
        const Id = localStorage.getItem('userId');
        const email = localStorage.getItem("userEmail");
        setUserId(Id);
        console.log("ididid", Id);
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
                // Extract correct answer indexes from questions
                const correctIndexes = questionsArray.map(ques => ques.correctOptionIndex);
                setCorrectAnswerIndexes(correctIndexes);
                // Initialize showOneAnswers array with false values for each question
                setShowOneAnswers(new Array(questionsArray.length).fill(false));
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
                const backgroundColor = data.message === 'Correct answer!' ? '#2dd72d' : '#f50d0ddb';
                optionElement.style.backgroundColor = backgroundColor;
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

    console.log(questions)
    const toggleShowAnswers = () => {
        setShowAnswers(prevState => !prevState); // Toggle showAnswers state
    };

    const handleShowAnswer = (index) => {
        setShowOneAnswers(prevState => {
            const newShowOneAnswers = [...prevState]; // Create a copy of showOneAnswers array
            newShowOneAnswers[index] = !newShowOneAnswers[index]; // Toggle the value for the clicked question index
            return newShowOneAnswers;
        });
        setSelectedQuestionIndex(index); // Set the selected question index
    };

    const filteredLevel = selectedLevel
        ? questions.filter((ques) => ques.level === selectedLevel)
        : questions;

    console.log(filteredLevel)
    // const handleLevelChange = (event) => {
    //     setSelectedLevel(parseInt(event.target.value));
    // };

    // const existingLevels = Array.from(new Set(questions.map((ques) => ques.level)));

    // const levelsToDisplay = existingLevels.length > 0 ? existingLevels : [1];

    const scrollToQuestion = (questionIndex) => {
        const questionContainer = document.querySelectorAll(`.${styles.questionContainer}`)[questionIndex];
        if (questionContainer) {
            questionContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };
    return (
        <ThemeProvider>
            <div
                //  className={styles.levelContainer}
                className={`${styles.varietyList} ${resolvedTheme === 'dark' ? styles.darkCard : styles.lightCard}`}>
                <div className={styles.content}>
                    <h2 className={styles.ContentHeading}>Levels</h2>
                    <ul>
                        {Array.from(new Set(questions.map((question) => question.level))).map(
                            (level) => (
                                <li key={level} onClick={() => setSelectedLevel(level)}
                                    className={`${styles.filter} ${resolvedTheme === 'dark' ? styles.darkCard : styles.lightCard}`}>
                                    Level {level}
                                </li>
                            )
                        )}
                    </ul>
                </div>
            </div>
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
                    <button className={styles.addQues} onClick={toggleShowAnswers}>
                        {showAnswers ? 'Hide All Answers' : 'Show All Answers'}
                    </button>

                </div>
                <div className={styles.box}>
                    {filteredLevel.length > 0 ? (
                        filteredLevel.map((ques, key) => (
                            <div key={key} className={styles.questionContainer}>
                                <div className={styles.actions}>
                                    <h3 className={styles.question}>
                                        {key + 1}. {ques.text}
                                    </h3>
                                    {userEmail === "ayushjha5467@gmail.com" && (
                                        <RemoveQues id={ques._id} />
                                    )}
                                </div>
                                <div className={styles.optionsContainer}>
                                    {ques.options.map((val, i) => (
                                        <>
                                            <p
                                                key={i}
                                                className={`${styles.option} ${correctAnswerIndexes[key] === i + 1 && (showAnswers || showOneAnswers[key]) ? styles.correctOption : ''}`}
                                                onClick={(e) => {
                                                    handleclick(i, ques._id, e.target);
                                                }}
                                            >
                                                {String.fromCharCode(97 + i)}. {val}
                                            </p>
                                        </>
                                    ))}
                                    <button className={styles.addQues} onClick={() => handleShowAnswer(key)}>
                                        {showOneAnswers[key] ? 'Hide Answer' : 'Show Answer'}
                                    </button>
                                    {/* {selectedQuestionIndex === key && showOneAnswers[key] && (
                                    <p className={styles.correctOption}>
                                        Correct Answer: {String.fromCharCode(97 + ques.correctOptionIndex-1)}. {ques.options[ques.correctOptionIndex-1]}
                                    </p>
                                )} */}
                                </div>
                            </div>
                        ))
                    ) : (
                        <h1 className={styles.topic}>No Questions To Display. Add Questions!!</h1>
                    )}
                </div>
                <div className={`${styles.right} ${resolvedTheme === 'dark' ? styles.darkCard : styles.lightCard}`}>
                    <h2 className={styles.ContentHeading}>Questions</h2>
                    <ul className={styles.quesGrid}>
                        {filteredLevel.map((ques, key) => (
                            <li 
                            className={styles.queLink}
                            key={key} onClick={() => scrollToQuestion(key)}>
                                {key + 1}. 
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </ThemeProvider>
    );
}