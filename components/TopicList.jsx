// import Link from "next/link";
// import RemoveBtn from "./RemoveBtn";
// import { HiPencilAlt } from "react-icons/hi";
// import styles from "./styles/topicList.module.css";
// import EditTopicForm from "./EditTopicForm";


// const getTopics = async () => {
//   try {
//     const res = await fetch("http://localhost:3000/api/topics", {
//       cache: "no-store",
//     });

//     if (!res.ok) {
//       throw new Error("Failed to fetch topics");
//     }

//     return res.json();
//   } catch (error) {
//     console.log("Error loading topics: ", error);
//   }
// };

// export default async function TopicsList() {
//   const { topics } = await getTopics();
//   <EditTopicForm topics={topics} />

//   return (
//     <>


//       <h1 className={styles.heading}>All Courses</h1>
//       <div className={styles.main}>
//         {topics.map((t) => (
//           <div
//             key={t._id}
//             // className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start cursor-pointer"
//             className={styles.card}
//           >
//             <Link href={`/editTopic/${t._id}`}><HiPencilAlt size={24} /></Link>
//             <div>
//               <h2 className="font-bold text-2xl">{t.title}</h2>
//               <div>{t.description}</div>
//               <p className={styles.variety}>{t.variety}</p>
//             </div>

//             {/* <div className="flex gap-2">
//             <RemoveBtn id={t._id} />
//             <Link href={`/editTopic/${t._id}`}>
//               <HiPencilAlt size={24} />
//             </Link>
//           </div> */}
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }

"use client"


import { useState, useEffect } from "react";
import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";
import styles from "./styles/topicList.module.css";
import { ThemeProvider, useTheme } from 'next-themes';
import styles2 from "./styles/navBar.module.css";
import EditTopicForm from "./EditTopicForm";

// Function to fetch topics from the API
const getTopics = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/topics", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
};

export default function TopicsList() {
  // State to manage topics and selected variety
  const [topics, setTopics] = useState([]);
  const [selectedVariety, setSelectedVariety] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const { resolvedTheme } = useTheme();

  // Fetch topics when the component mounts
  useEffect(() => {
    const fetchTopics = async () => {
      const data = await getTopics();
      const email = localStorage.getItem("userEmail");
      console.log("data", data.topics)
      setTopics(data.topics);
      setUserEmail(email);
    };
    fetchTopics();
  }, []);

  // Function to filter topics based on the selected variety
  const filteredTopics = selectedVariety
    ? topics.filter((topic) => topic.variety === selectedVariety)
    : topics;

  return (
    <ThemeProvider>
      {/* Display the list of varieties */}
      <div className={`${styles.varietyList} ${resolvedTheme === 'dark' ? styles.darkCard : styles.lightCard}`}
>
        <div className={styles.content}>
          <h2 className={styles.ContentHeading}>Varieties</h2>
          <ul>
            {/* Display all available varieties */}
            <li onClick={() => setSelectedVariety("")}
            //  className={styles.filter}
            className={`${styles.filter} ${resolvedTheme === 'dark' ? styles.darkCard : styles.lightCard}`}
             >
              All</li>
            {Array.from(new Set(topics.map((topic) => topic.variety))).map(
              (variety) => (
                <li key={variety} onClick={() => setSelectedVariety(variety)}
                //  className={styles.filter}
                className={`${styles.filter} ${resolvedTheme === 'dark' ? styles.darkCard : styles.lightCard}`}
                 >
                  {variety}
                </li>
              )
            )}
          </ul>
        </div>
      </div>

      {/* Display the list of topics */}
      <h1 className={styles.heading}>Courses</h1>
      <div className={styles.main}>
        {filteredTopics.map((topic) => (
          <div
            key={topic._id}
            // className={styles.card}
            className={`${styles.card} ${resolvedTheme === 'dark' ? styles.darkCard : styles.lightCard}`}
          >
            <div className={styles.actions}>
              <Link href={`/editTopic/${topic._id}`}>
                <HiPencilAlt size={24} />
              </Link>
              {userEmail === "ayushjha5467@gmail.com" && (
                <RemoveBtn id={topic._id} />
              )}
            </div>
            <div>
              <h2 className="font-bold text-2xl">{topic.title}</h2>
              <div>{topic.description}</div>

              <div className={styles.info}>
                <p className={styles.variety}>{topic.variety}</p>
                {/* <Link href="https://www.w3schools.com/js/">Read More</Link> */}
                {topic.read && (
                  <Link href={topic.read} className={styles.readMoreLink}>
                    Read More
                  </Link>
                )}
              </div>

            </div>

          </div>
        ))}
      </div>
    </ThemeProvider>
  );
}
