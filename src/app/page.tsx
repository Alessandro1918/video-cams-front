"use client"
import { useState } from "react"

//Homepage - ask user to enter a room or create a new one.
export default function Home() {

  const [ roomId, setRoomId ] = useState('')

  function handleInputChange(text: string) {
    setRoomId(text)
  }

  function handleGenerateRoom() {
    const r = Math.floor(Math.random() * (65 - 1) + 1) //min inclusive, max exclusive
    setRoomId(String(r))
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <div>
        <label >Room ID:</label>
        <input 
          className="text-black"
          type="text" 
          placeholder="Enter room ID"
          value={roomId}
          onChange={event => handleInputChange(event.target.value)}
        >
        </input>
      </div>

      <button 
        className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
        type="button" 
        onClick={handleGenerateRoom}
      >
        Generate new room
      </button>
      
      <a 
        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        href={`/room/${roomId}`}
      >
        Enter room
      </a>
    </main>
  )
}
