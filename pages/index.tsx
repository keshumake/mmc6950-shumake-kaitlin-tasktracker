import { useState, useEffect, use } from "react";
import Link from "next/link";
import { slide as Menu } from "react-burger-menu";
import styles from "../styles/Home.module.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../config/session";
import headerImage from "../components/filefolder.jpg";
import Image from "next/image";
import { useRouter } from "next/router";



export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;
    const props = {};
    if (user) {
      props.username = user.username;
      props.isLoggedIn = true;
    } else {
      props.isLoggedIn = false;
    }
    return { props };
  },
  sessionOptions
);
export default function Home(props) {
  const router = useRouter();

  const [taskListName, setTaskListName] = useState("");
  const [taskList, setTaskList] = useState(null);
  const [response, setResponse] = useState("");
  const [description1, setDescription1] = useState("");
  const [priority1, setPriority1] = useState("");
  const [duration1, setDuration1] = useState("");
  const [description2, setDescription2] = useState("");
  const [priority2, setPriority2] = useState("");
  const [duration2, setDuration2] = useState("");
  const [description3, setDescription3] = useState("");
  const [priority3, setPriority3] = useState("");
  const [duration3, setDuration3] = useState("");
  const [description4, setDescription4] = useState("");
  const [priority4, setPriority4] = useState("");
  const [duration4, setDuration4] = useState("");
  const [description5, setDescription5] = useState("");
  const [priority5, setPriority5] = useState("");
  const [duration5, setDuration5] = useState("");
  const [taskLists, setTaskLists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [hasRecommendationBeenGenerated, setHasRecommendationBeenGenerated] =
    useState(false);
  useEffect(() => {
    getTaskLists();
  }, []);

  const getTaskLists = async () => {
    const res = await fetch(
      `${
        process.env.NODE_ENV !== "production"
          ? "http://localhost:3000"
          : "https://mmc6950-shumake-kaitlin-tasktracker.vercel.app"
      }/api/tasks/getTaskLists`
    );

    if (res.status !== 200) return [];
    const data = await res.json();
    setTaskLists(data.data);
    return data.data;
  };

  const generateRecommendations = async (
    listName = taskListName,
    tasksArr = tasks
  ) => {
    setIsLoading(true);
    setHasRecommendationBeenGenerated(true);
    const tasksString = tasksArr
      .map((t) => `${t.description}, ${t.priority}, ${t.duration}`)
      .join(", ");
    const res = await fetch(
      `${
        process.env.NODE_ENV !== "production"
          ? "http://localhost:3000"
          : "https://mmc6950-shumake-kaitlin-tasktracker.vercel.app"
      }/api/chat?message=Here is my list of to-do's, to-do structure is task list name and a series of tasks in the following structure description, priority(HIGH, MEDIUM, LOW, NONE), duration in minutes can you please suggest the order I should work on these and why: ${
        listName + " " + tasksString
      }}`
    );

    if (res.status !== 200) return;
    const data = await res.json();
    setResponse(data.response);
    setIsLoading(false);
  };

  const createTask = async (description, priority, duration) => {
    const res = await fetch(
      `${
        process.env.NODE_ENV !== "production"
          ? "http://localhost:3000"
          : "https://mmc6950-shumake-kaitlin-tasktracker.vercel.app"
      }/api/tasks/create?description=${description}&priority=${priority}&duration=${duration}&taskListId=${
        taskList?.id as string
      }`
    );

    if (res.status !== 200) return;
    const data = await res.json();
    setResponse(data.response);
    await getTaskLists();
    setTasks([...tasks, data.data]);
  };

  const createTaskList = async () => {
    const res = await fetch(
      `${
        process.env.NODE_ENV !== "production"
          ? "http://localhost:3000"
          : "https://mmc6950-shumake-kaitlin-tasktracker.vercel.app"
      }/api/tasks/createTaskList?name=${taskListName}`
    );

    if (res.status !== 200) return;
    const data = await res.json();
    setResponse(data.response);
    setTaskList(data.data);
    await getTaskLists();
  };

  const deleteTask = async (id) => {
    const res = await fetch(
      `${
        process.env.NODE_ENV !== "production"
          ? "http://localhost:3000"
          : "https://mmc6950-shumake-kaitlin-tasktracker.vercel.app"
      }/api/tasks/delete?id=${id}`
    );

    if (res.status !== 200) return;
    const data = await res.json();
    await getTaskLists();
    setResponse(data.response);
  };

  const deleteTaskList = async (id) => {
    const res = await fetch(
      `${
        process.env.NODE_ENV !== "production"
          ? "http://localhost:3000"
          : "https://mmc6950-shumake-kaitlin-tasktracker.vercel.app"
      }/api/tasks/deleteTaskList?id=${id}`
    );

    if (res.status !== 200) return;
    const data = await res.json();
    await getTaskLists();
    setResponse(data.response);
  };
  console.log(isLoading);
  return (
    <>
      <Menu right>
        <p>
          <Link className="menu-item" href="/">
            Home
          </Link>
        </p>
        <p>
          <Link className="menu-item" href="/login">
            Login
          </Link>
        </p>
        <p>
          <Link className="menu-item" href="/signup">
            Sign Up
          </Link>
        </p>
      </Menu>
      <Header isLoggedIn={props.isLoggedIn} username={props.username}></Header>
      <main className={styles.main}>
        <div className={styles.maincontent}>
          <div className={styles.headerimg}>
            <Image
              src={headerImage}
              height={600}
              width={800}
              alt="File Folder"
            ></Image>
          </div>
          <div className={styles.greeting}>
            <h1>Welcome to Task Tracker!</h1>
            <p>
              We’re delighted to welcome you to a platform designed to simplify
              your life and enhance your productivity. Whether you’re managing
              personal tasks, collaborating with a team, or simply striving to
              stay organized, you’ve come to the right place.
            </p>

            <p>
              With our intuitive interface and powerful features, you’ll have
              the ability to streamline your workflow, set and achieve your
              goals, and gain a better grasp of your daily responsibilities.
            </p>

            <p>
              Please click the menu above to create an account or login, and
              start getting organized!
            </p>
          </div>
          {props.isLoggedIn && (
            <>
              <div className={styles.createTaskList}>
                <p>
                  Please type in the desired task list name and submit before
                  adding tasks.
                </p>
                <div className={styles.submitTaskList}>
                  <label>Create Task List:</label>
                  <input
                    type="text"
                    value={taskListName}
                    autoFocus={true}
                    onChange={(e) => setTaskListName(e.target.value)}
                    placeholder="Things to Do"
                  />

                  <button
                    onClick={async () => {
                      await createTaskList();
                    }}
                    type="submit"
                  >
                    Create
                  </button>
                </div>
              </div>
              <div className={styles.taskContainer}>
                <p>
                  Please create tasks by inputting the following information in
                  the appropriate fields: Task Name, Priority level -- HIGH,
                  MEDIUM, LOW, NONE -- and time needed in minutes.
                </p>
                <div className={styles.createTask}>
                  <label>Create Task:</label>
                  <input
                    type="text"
                    value={description1}
                    autoFocus={true}
                    onChange={(e) => setDescription1(e.target.value)}
                    placeholder="doing dishes"
                  />
                  <input
                    type="text"
                    value={priority1}
                    autoFocus={true}
                    onChange={(e) => setPriority1(e.target.value)}
                    placeholder="medium"
                  />
                  <input
                    type="number"
                    value={duration1}
                    autoFocus={true}
                    onChange={(e) => setDuration1(e.target.value)}
                    placeholder="60"
                  />

                  <button
                    onClick={async () => {
                      await createTask(description1, priority1, duration1);
                    }}
                    type="submit"
                  >
                    Create Task
                  </button>
                  </div>
                <div className={styles.createTask}>
                  <label>Create Task:</label>
                  <input
                    type="text"
                    value={description2}
                    autoFocus={true}
                    onChange={(e) => setDescription2(e.target.value)}
                  />
                  <input
                    type="text"
                    value={priority2}
                    autoFocus={true}
                    onChange={(e) => setPriority2(e.target.value)}
                  />
                  <input
                    type="number"
                    value={duration2}
                    autoFocus={true}
                    onChange={(e) => setDuration2(e.target.value)}
                  />

                  <button
                    onClick={async () => {
                      await createTask(description2, priority2, duration2);
                    }}
                    type="submit"
                  >
                    Create Task
                  </button>
                </div>
                <div className={styles.createTask}>
                  <label>Create Task:</label>
                  <input
                    type="text"
                    value={description3}
                    autoFocus={true}
                    onChange={(e) => setDescription3(e.target.value)}
                  />
                  <input
                    type="text"
                    value={priority3}
                    autoFocus={true}
                    onChange={(e) => setPriority3(e.target.value)}
                  />
                  <input
                    type="number"
                    value={duration3}
                    autoFocus={true}
                    onChange={(e) => setDuration3(e.target.value)}
                  />

                  <button
                    onClick={async () => {
                      await createTask(description3, priority3, duration3);
                    }}
                    type="submit"
                  >
                    Create Task
                  </button>
                </div>
                <div className={styles.createTask}>
                  <label>Create Task:</label>
                  <input
                    type="text"
                    value={description4}
                    autoFocus={true}
                    onChange={(e) => setDescription4(e.target.value)}
                  />
                  <input
                    type="text"
                    value={priority4}
                    autoFocus={true}
                    onChange={(e) => setPriority4(e.target.value)}
                  />
                  <input
                    type="number"
                    value={duration4}
                    autoFocus={true}
                    onChange={(e) => setDuration4(e.target.value)}
                  />

                  <button
                    onClick={async () => {
                      await createTask(description4, priority4, duration4);
                    }}
                    type="submit"
                  >
                    Create Task
                  </button>
                </div>
                <div className={styles.createTask}>
                  <label>Create Task:</label>
                  <input
                    type="text"
                    value={description5}
                    autoFocus={true}
                    onChange={(e) => setDescription5(e.target.value)}
                  />
                  <input
                    type="text"
                    value={priority5}
                    autoFocus={true}
                    onChange={(e) => setPriority5(e.target.value)}
                  />
                  <input
                    type="number"
                    value={duration5}
                    autoFocus={true}
                    onChange={(e) => setDuration5(e.target.value)}
                  />

                  <button
                    onClick={async () => {
                      await createTask(description5, priority5, duration5);
                    }}
                    type="submit"
                  >
                    Create Task
                  </button>
                </div>
                

                <div className={styles.recommendations}>
                </div>
                <div className="responseContainer">
                  {taskLists.map((taskList, index) => {
                    return (
                      <div>
                        <div className={styles.taskListResult}>
                          {"Task List: " + taskList.name + ""}
                          <button
                            onClick={async () => {
                              await deleteTaskList(taskList.id);
                            }}
                            type="submit"
                          >
                            Delete Task List
                          </button>
                          <button
                            onClick={async () => {
                              await generateRecommendations(
                                taskList.name,
                                taskList?.tasks ?? []
                              );
                            }}
                            type="submit"
                          >
                            Generate Recommendations
                          </button>
                          {(taskList?.tasks ?? []).map((listitem) => (
                            <div className={styles.taskResult}>
                              {"Task: " +
                                listitem.description +
                                ", " +
                                listitem.priority +
                                ", " +
                                listitem.duration}
                              <button
                                className={styles.resultButton}
                                onClick={async () => {
                                  await deleteTask(listitem.id);
                                }}
                                type="submit"
                              >
                                Delete Task
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              {hasRecommendationBeenGenerated && (
                <div className={styles.response}>{isLoading ? "Loading..." : response}</div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer></Footer>
    </>
  );
}