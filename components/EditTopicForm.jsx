"use client";

// // import { useState, useEffect } from "react";
// // import Link from "next/link";
// // import styles from './styles/editTopic.module.css';

// // export default function EditTopicForm({ id, title, description, updateUserPoints }) {
// //     const [questions, setQuestions] = useState([]);
// //     const [user, setUserId] = useState('');
// //     const [userEmail, setUserEmail] = useState("");
// //     const [selectedOptionElement, setSelectedOptionElement] = useState(null);
// //     const [correctAnswerIndexes, setCorrectAnswerIndexes] = useState([]);
// //     const [showAnswers, setShowAnswers] = useState(false); // State to track whether to show answers or not
// //     const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);
// //     const [showOneAnswers, setShowOneAnswers] = useState([]); // State to track whether to show answers or not for individual questions

// //     useEffect(() => {
// //         const Id = localStorage.getItem('userId');
// //         const email = localStorage.getItem("userEmail");
// //         setUserId(Id);
// //         console.log("ididid", Id);
// //         const getQuestions = async () => {
// //             try {
// //                 const res = await fetch(`http://localhost:3000/api/question/${id}`, {
// //                     cache: 'no-store',
// //                 });

// //                 if (!res.ok) {
// //                     throw new Error('Failed to fetch questions');
// //                 }
// //                 const data = await res.json();
// //                 const questionsArray = Array.isArray(data.question) ? data.question : [data.question];
// //                 setQuestions(questionsArray);
// //                 // Extract correct answer indexes from questions
// //                 const correctIndexes = questionsArray.map(ques => ques.correctOptionIndex);
// //                 setCorrectAnswerIndexes(correctIndexes);
// //                 // Initialize showOneAnswers array with false values for each question
// //                 setShowOneAnswers(new Array(questionsArray.length).fill(false));
// //             } catch (error) {
// //                 console.error(error);
// //             }
// //         };
// //         getQuestions();
// //         setUserEmail(email);
// //     }, []);

// //     const handleclick = async (selectedOptionIndex, quesId, optionElement) => {
// //         try {
// //             const res = await fetch(`http://localhost:3000/api/answer/${quesId}`, {
// //                 method: 'POST',
// //                 headers: {
// //                     'Content-type': 'application/json',
// //                 },
// //                 body: JSON.stringify({ selectedOptionIndex, user }),
// //             });

// //             const data = await res.json();
// //             console.log('Response:', data.message);

// //             if (res.ok) {
// //                 if (selectedOptionElement) {
// //                     selectedOptionElement.style.backgroundColor = ''; // Reset previous option's background color
// //                 }
// //                 const backgroundColor = data.message === 'Correct answer!' ? '#2dd72d' : '#f50d0ddb';
// //                 optionElement.style.backgroundColor = backgroundColor;
// //                 setSelectedOptionElement(optionElement);

// //                 // Call the updateUserPoints function to update points in the Navbar
// //                 // updateUserPoints();
// //             } else {
// //                 throw new Error('Failed to add text');
// //             }
// //         } catch (error) {
// //             console.log(error);
// //         }
// //     };

// //     const toggleShowAnswers = () => {
// //         setShowAnswers(prevState => !prevState); // Toggle showAnswers state
// //     };

// //     const handleShowAnswer = (index) => {
// //         setShowOneAnswers(prevState => {
// //             const newShowOneAnswers = [...prevState]; // Create a copy of showOneAnswers array
// //             newShowOneAnswers[index] = !newShowOneAnswers[index]; // Toggle the value for the clicked question index
// //             return newShowOneAnswers;
// //         });
// //         setSelectedQuestionIndex(index); // Set the selected question index
// //     };

// //     return (
// //         <div className={styles.main}>
// //             <h1 className={styles.topic}>Course: {title}</h1>
// //             <h4 className={styles.description}>{description}</h4>
// //             <div className={styles.header}>
// //                 <h1>All Questions</h1>
// //                 {console.log("email", userEmail)}
// //                 {userEmail === "ayushjha5467@gmail.com" ? (
// //                     <Link href={`/addQuestion/${id}`} className={styles.addQues}>
// //                         Add Question
// //                     </Link>
// //                 ) : (
// //                     <span className={styles.disabledButton}>Add Question</span>
// //                 )}
// //                 <button className={styles.addQues} onClick={toggleShowAnswers}>
// //                     {showAnswers ? 'Hide All Answers' : 'Show All Answers'}
// //                 </button>
// //             </div>
// //             <div className={styles.box}>
// //                 {questions.length > 0 ? (
// //                     questions.map((ques, key) => (
// //                         <div key={key} className={styles.questionContainer}>
// //                             <h3 className={styles.question}>
// //                                 {key + 1}. {ques.text}
// //                             </h3>
// //                             <div className={styles.optionsContainer}>
// //                                 {ques.options.map((val, i) => (
// //                                     <>
// //                                         <p
// //                                             key={i}
// //                                             className={`${styles.option} ${correctAnswerIndexes[key] === i + 1 && (showAnswers || showOneAnswers[key]) ? styles.correctOption : ''}`}
// //                                             onClick={(e) => {
// //                                                 handleclick(i, ques._id, e.target);
// //                                             }}
// //                                         >
// //                                             {String.fromCharCode(97 + i)}. {val}
// //                                         </p>
// //                                     </>
// //                                 ))}
// //                                 <button className={styles.addQues} onClick={() => handleShowAnswer(key)}>
// //                                     {showOneAnswers[key] ? 'Hide Answer' : 'Show Answer'}
// //                                 </button>
// //                                 {/* {selectedQuestionIndex === key && showOneAnswers[key] && (
// //                                     <p className={styles.correctOption}>
// //                                         Correct Answer: {String.fromCharCode(97 + ques.correctOptionIndex-1)}. {ques.options[ques.correctOptionIndex-1]}
// //                                     </p>
// //                                 )} */}
// //                             </div>
// //                         </div>
// //                     ))
// //                 ) : (
// //                     <h1 className={styles.topic}>No Questions To Display. Add Questions!!</h1>
// //                 )}
// //             </div>
// //         </div>
// //     );
// // }

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./styles/editTopic.module.css";
import { ThemeProvider, useTheme } from "next-themes";
import RemoveQues from "./RemoveQues";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "./ui/button";

export default function EditTopicForm({
  id,
  title,
  description,
  updateUserPoints,
}) {
  const [questions, setQuestions] = useState([]);
  const [user, setUserId] = useState("");
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
    const Id = localStorage.getItem("userId");
    const email = localStorage.getItem("userEmail");
    setUserId(Id);
    console.log("ididid", Id);
    const getQuestions = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/question/${id}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch questions");
        }
        const data = await res.json();
        const questionsArray = Array.isArray(data.question)
          ? data.question
          : [data.question];
        setQuestions(questionsArray);
        // Extract correct answer indexes from questions
        const correctIndexes = questionsArray.map(
          (ques) => ques.correctOptionIndex
        );
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
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ selectedOptionIndex, user }),
      });

      const data = await res.json();
      console.log("Response:", data.message);

      if (res.ok) {
        if (selectedOptionElement) {
          selectedOptionElement.style.backgroundColor = ""; // Reset previous option's background color
        }
        const backgroundColor =
          data.message === "Correct answer!" ? "#2dd72d" : "#f50d0ddb";
        optionElement.style.backgroundColor = backgroundColor;
        setSelectedOptionElement(optionElement);

        // Call the updateUserPoints function to update points in the Navbar
        // updateUserPoints();
      } else {
        throw new Error("Failed to add text");
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(questions);
  const toggleShowAnswers = () => {
    setShowAnswers((prevState) => !prevState); // Toggle showAnswers state
  };

  const handleShowAnswer = (index) => {
    setShowOneAnswers((prevState) => {
      const newShowOneAnswers = [...prevState]; // Create a copy of showOneAnswers array
      newShowOneAnswers[index] = !newShowOneAnswers[index]; // Toggle the value for the clicked question index
      return newShowOneAnswers;
    });
    setSelectedQuestionIndex(index); // Set the selected question index
  };

  const filteredLevel = selectedLevel
    ? questions.filter((ques) => ques.level === selectedLevel)
    : questions;

  console.log(filteredLevel);
  // const handleLevelChange = (event) => {
  //     setSelectedLevel(parseInt(event.target.value));
  // };

  // const existingLevels = Array.from(new Set(questions.map((ques) => ques.level)));

  // const levelsToDisplay = existingLevels.length > 0 ? existingLevels : [1];

//   const scrollToQuestion = (questionIndex) => {
//     const questionContainer = document.querySelectorAll(
//         '.bg-white.rounded-lg.shadow-md.p-4'
//     )[questionIndex];
//     if (questionContainer) {
//       questionContainer.scrollIntoView({ behavior: "smooth", block: "start" });
//     }
//   };
const scrollToQuestion = (questionIndex) => {
    const questionContainers = document.querySelectorAll('.bg-white.rounded-lg.shadow-md.p-4');
    if (questionContainers.length > 0) {
      const questionContainer = questionContainers[questionIndex];
      if (questionContainer) {
        questionContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };
  return (
    <ThemeProvider>
      <div className="max-w-auto px-1 mx-auto flex-col flex-wrap">
        {/* //level filter */}
        <div className="sticky bg-white top-20 flex flex-wrap items-center justify-between border-b-2  text-neutral-400 ">
          <div className=" pl-4 pb-7 flex items-center gap-x-3">
            {`/${title}.svg` ? (
              <Image src={`/${title}.svg`} height={50} width={50} alt="icon" />
            ) : (
              <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">
                {title}
              </h1>
            )}
          </div>
          <div className="flex justify-between items-center">
            <div className="flex-col m-5">
              {userEmail === "ayushjha5467@gmail.com" && (
                <Link href={`/addQuestion/${id}`} className="mt-1">
                  <Button size="sm" variant="sidebar">
                    {" "}
                    <span>
                      <Image src="/plus.svg" alt="add" height={30} width={30} />
                      Question
                    </span>
                  </Button>
                </Link>
              )}
            </div>

            <div className="flex-col m-5">
              <Button
                size="sm"
                variant="sidebar"
                onClick={() => setShowAnswers(!showAnswers)}
              >
                {showAnswers ? (
                  <span>
                    <Image src="/hide.svg" height={30} width={30} /> Hide All{" "}
                  </span>
                ) : (
                  <span>
                    <Image src="/show.svg" height={30} width={30} /> Show ALL{" "}
                  </span>
                )}
              </Button>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="sidebar">
                  <span>
                    <Image
                      src="/levels.svg"
                      alt="level"
                      height={25}
                      width={25}
                    />
                    Level
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Level</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {Array.from(
                  new Set(questions.map((question) => question.level))
                ).map((level) => (
                  <DropdownMenuItem
                    key={level}
                    onClick={() => setSelectedLevel(level)}
                  >
                    Level {level}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {/* //fiter and buttons ends here  */}

        {/* card  */}

        <div className={styles.box}>
          {/* Question Cards */}
          <div className="overflow-y-scroll ">
            <div className="space-y-4">
              {/* Display Questions */}
              {filteredLevel.length > 0 ? (
                filteredLevel.map((ques, key) => (
                  <div key={key} className="bg-white rounded-lg shadow-md p-4 hover:shadow-2xl">
                    {/* Question Header */}
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg text-gray-800">
                        {key + 1}. {ques.text}
                      </h3>
                      {/* Remove Button */}
                      {userEmail === "ayushjha5467@gmail.com" && (
                        <RemoveQues id={ques._id} />
                      )}
                    </div>
                    {/* Options */}
                    <div className="mt-2 space-y-2">
                      {ques.options.map((val, i) => (
                        <p
                          key={i}
                          className={`cursor-pointer ${
                            correctAnswerIndexes[key] === i + 1 &&
                            (showAnswers || showOneAnswers[key])
                              ? "text-green-600" // Correct answer
                              : "text-gray-800" // Regular option
                          }`}
                          onClick={(e) => handleclick(i, ques._id, e.target)}
                        >
                          {String.fromCharCode(97 + i)}. {val}
                        </p>
                      ))}
                    </div>
                    {/* Show/Hide Answer Button */}
                    <div className="mt-4">
                      <Button
                        size="sm"
                        variant="sidebar"
                        onClick={() => handleShowAnswer(key)}
                      >
                        {showOneAnswers[key] ? (
                          <>
                            <Image
                              src="/hide.svg"
                              height={30}
                              width={30}
                              alt="Hide"
                            />{" "}
                            Hide
                          </>
                        ) : (
                          <>
                            <Image
                              src="/show.svg"
                              height={30}
                              width={30}
                              alt="Show"
                            />{" "}
                            Show
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                // No Questions
                <h1 className="text-lg font-semibold text-gray-800">
                  No Questions To Display. Add Questions!!
                </h1>
              )}
            </div>
          </div>
          {/* Question Grid */}
          <div className="sticky mt-[25px] h-full md:w-1/4">
            <div className="grid grid-cols-4 gap-2 p-4 bg-sky-500/15 text-sky-500 border-2 border-sky-300 hover:bg-sky-500/20 transition-none">
              {/* Display Question Numbers */}
              {filteredLevel.map((ques, key) => (
                <Button
                  key={key}
                  size="sm"
                  variant="superOutline"
                  onClick={() => scrollToQuestion(key)}
                >
                  {key + 1}.
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

