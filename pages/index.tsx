import { useState, useEffect } from 'react'

export default function Home() {
  const [list, setList] = useState(["", "", "", "", ""])
  const [response, setResponse] = useState("")

  const handleSubmit= async () => {
    const res = await fetch(
      `${process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : 'https://assignment1-2-theta.vercel.app'}/api/chat?message=Here is my list of to-do's, can you please suggest the order I should work on these and why: ${list.join(",")}`
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

      <main>
        <div>
          <label>Input To-Do List:</label>
          <div >
            {list.map((listitem, index) => {return <input
              key = {index}
              type="text"
              value={list[index]}
              autoFocus={true}
              onChange={e => updateList(index, e.target.value)}/>})}
            
            <button onClick={ async () => {await handleSubmit()}} type="submit">Submit</button>
          </div>
        </div>
        <div>
          {response}
        </div>

      </main>
    </>
  )
}
