"use client"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

import { socket } from "../../socket"
import Selection from "./components/Selection"
import Camera from "./components/Camera"
import Player from "./components/Player"

//Room page - ask user if device is a camera or a player
export default function Room() {

  const pathname = usePathname()
  const roomId = pathname.split("/")[2]                 // get roomId from url: "/room/42"

  const [ userType, setUserType ] = useState("-")       //"-", "camera", "player"

  const [ users, setUsers ] = useState<string[]>([])    //not counting the current user

  socket.on("new-user-joined-room", userId =>  {
    console.log(`User ${userId} entered the room`)
    setUsers([...users, userId])
  })

  socket.on("list-room-users", roomUsers =>  {
    console.log(`Users already in the room: ${roomUsers}`)
    setUsers(roomUsers)
  })

  socket.on("left-room", userId => {
    console.log(`User ${userId} left the room`)
    setUsers(users.filter(id => id !== userId))
  })

  useEffect(() => {

    socket.connect()
    socket.on("connect", () => {
      console.log(`My ID: ${socket.id}`)
      socket.emit("join-room", roomId)
    })

    return () => {
      //Clean up:
      socket.off("new-user-joined-room")
      socket.off("list-room-users")
      socket.off("left-room")
      socket.disconnect()
    }
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <h1>{`Room: ${roomId}`}</h1>
      
      <h1>{`Users in the room: ${users.length + 1}`}</h1>

      <div>
        {
          userType === "camera" ? <Camera />
          : userType === "player" ? <Player />
          : <Selection setUserType={setUserType}/>
        }
      </div>

    </main>
  )
}
