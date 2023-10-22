import { useState, useEffect } from 'react'
import Link from "next/link";
import { slide as Menu } from "react-burger-menu";
import styles from "@/styles/Home.module.css";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { create } from 'domain';
import { Priority } from '@prisma/client';

export default function Home() {
  const [list, setList] = useState(["", "", "", "", ""])
  const [taskList, setTaskList] = useState("")
  const [response, setResponse] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("")
  const [duration, setDuration] = useState("")
  

  const handleSubmit= async () => {
    const res = await fetch(
      `${process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : 'https://assignment1-2-theta.vercel.app'}/api/chat?message=Here is my list of to-do's, can you please suggest the order I should work on these and why: ${list.join(",")}`
    )

    if (res.status !== 200) return
    const data = await res.json()
    setResponse(data.response);
  }

  const createTask = async () => {
    const res = await fetch(
      `${process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : 'https://assignment1-2-theta.vercel.app'}/api/tasks/create?description=${description}&priority=${priority}&duration=${duration}&taskListId=${taskListId}}`
    )

    if (res.status !== 200) return
    const data = await res.json()
    setResponse(data.response);
  }

  const createTaskList = async () => {
    const res = await fetch(
      `${process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : 'https://assignment1-2-theta.vercel.app'}/api/tasks/createTaskList?name=${taskList}`
    )

    if (res.status !== 200) return
    const data = await res.json()
    setResponse(data.response);
  }

  const deleteTask = async () => {
    const res = await fetch(
      `${process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : 'https://assignment1-2-theta.vercel.app'}/api/tasks/delete?id=${id}`
    )

    if (res.status !== 200) return
    const data = await res.json()
    setResponse(data.response);
  }

  const deleteTaskList = async () => {
    const res = await fetch(
      `${process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : 'https://assignment1-2-theta.vercel.app'}/api/tasks/deleteTaskList?id=${id}`
    )

    if (res.status !== 200) return
    const data = await res.json()
    setResponse(data.response);
  }

  const getTask = async () => {
    const res = await fetch(
      `${process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : 'https://assignment1-2-theta.vercel.app'}/api/tasks/getTask?id=${id}`
    )

    if (res.status !== 200) return
    const data = await res.json()
    setResponse(data.response);
  }

  const getTaskList = async () => {
    const res = await fetch(
      `${process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : 'https://assignment1-2-theta.vercel.app'}/api/tasks/getTaskLists`
    )

    if (res.status !== 200) return
    const data = await res.json()
    setResponse(data.response);
  }

  const getTasks = async () => {
    const res = await fetch(
      `${process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : 'https://assignment1-2-theta.vercel.app'}/api/tasks/getTasks?userId=${userId}`
    )

    if (res.status !== 200) return
    const data = await res.json()
    setResponse(data.response);
  }

  const updateTask = async () => {
    const res = await fetch(
      `${process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : 'https://assignment1-2-theta.vercel.app'}/api/tasks/update?description=${description}&priority=${priority}&duration=${duration}&taskListId=${taskListId}}`
    )

    if (res.status !== 200) return
    const data = await res.json()
    setResponse(data.response);
  }

  const updateTaskList = async () => {
    const res = await fetch(
      `${process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : 'https://assignment1-2-theta.vercel.app'}/api/tasks/updateTaskList?id=${id}&name=${name}`
    )

    if (res.status !== 200) return
    const data = await res.json()
    setResponse(data.response);
  }

  const updateList = (index: number, value: string) => {
    const updatedList = [...list];
    updatedList[index] = value;
    setList(updatedList);  
  }

  useEffect(() => {
    setList(list)
  }, [list])

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
          <Link className="menu-item" href="/search">
            Search
          </Link>
        </p>
        <p>
          <Link className="menu-item" href="/favorite">
            Favorites
          </Link>
        </p>
        <p>
          <Link className="menu-item" href="/about">
            About
          </Link>
        </p>
      </Menu>
      <Header></Header>
      <main>
<div>
  <div>
    <label>Create Task List:</label>
  <input
      type="text"
      value={taskList}
      autoFocus={true}
      onChange={e => setTaskList(e.target.value)}/>  

<button onClick={ async () => {await createTaskList()}} type="submit">Submit</button>
</div>
<div>
    <label>Create Task:</label>
  <input
      type="text"
      value={description}
      autoFocus={true}
      onChange={e => setDescription(e.target.value)}/>  
      <input
      type="text"
      value={duration}
      autoFocus={true}
      onChange={e => setDuration(e.target.value)}/>
      <input
      type="text"
      value={priority}
      autoFocus={true}
      onChange={e => setPriority(e.target.value)}/>

<button onClick={ async () => {await createTaskList()}} type="submit">Submit</button>
</div>

<label>Input To-Do List:</label>
  <div >
    
    {list.map((listitem, index) => {return <input
      key = {index}
      type="text"
      value={list[index]}
      autoFocus={true}
      onChange={e => updateList(index, e.target.value)}/>})}
    
    <button onClick={ async () => {await handleSubmit()}} type="submit">Generate Recommendations</button>
    <button onClick={ async () => {await createTaskList()}} type="submit">Save Task List</button>
    <button onClick={ async () => {await deleteTaskList()}} type="submit">Delete Task List</button>

    <button onClick={ async () => {await createTask()}} type="submit">Add Task</button>
    <button onClick={ async () => {await deleteTask()}} type="submit">Remove Task</button>




  </div>
</div>
<div>
  {response}
</div>

</main>
<Footer></Footer>
    </>
  )
}
