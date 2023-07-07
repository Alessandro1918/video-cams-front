"use client"
// import { useState } from "react"

export default function Home() {

  // const [ roomId, setRoomId ] = useState('')

  // function handleInputChange(text: string) {
  //   console.log(text)
  //   setRoomId(text)
  // }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <div>
        <label >Room ID:</label>
        <input 
          type="text" 
          placeholder="Enter room ID"
          // value={roomId}
          // onChange={event => handleInputChange(event.target.value)}
        >
        </input>
      </div>

      <a href={`/room/16/camera`}>Camera</a>

      <a href={`/room/16/player`}>Player</a>

    </main>
  )
}
