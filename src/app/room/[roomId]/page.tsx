"use client"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

import { socket } from '../../socket'

//Room page - ask user if device is a camera or a player
export default function Room() {

  const pathname = usePathname()
  const roomId = pathname.split("/")[2]     // get roomId from url: "/room/42"

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

      <a 
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        href={`/room/${roomId}/camera`}
      >
        Camera
      </a>

      <a
        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" 
        href={`/room/${roomId}/player`}
      >
        Player
      </a>

    </main>
  )
}
