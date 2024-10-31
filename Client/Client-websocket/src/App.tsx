import { useEffect, useState } from 'react';
import './App.css'
import { io } from 'socket.io-client'
import { Button, TextField } from '@mui/material';

const socket = io("http://localhost:3001");

function App() {
  const [message, setMessage] = useState<string | null>(null)
  const [incomeMessage, setIncomeMessage] = useState<string | null>(null)
  const [room, setRoom] = useState<string | null>(null)

  useEffect(() => {
    socket.on("recvMsg", data => {
      setIncomeMessage(data)
    })
  }, [socket])

  function sendMessage() {
    socket.emit("sendMsg", message)
  }

  function enterRoom() {
    socket.emit("enterRoom", room)
  }

  return (
    <>
      <div className='w-full h-32 pb-8 flex items-center bg-white rounded-t-2xl'>
        <div className='w-full flex justify-evenly'>
          <div className='flex'>
            <TextField variant='standard' color='secondary' label="room" size='medium'
              onChange={(e) => setRoom(e.target.value)} />
            <Button variant='contained' color='success' size='large'
              onClick={enterRoom}> Connect </Button>
          </div>
          <Button variant='contained' color='error' size='large'> Disconnect </Button>
        </div>
      </div>
      <div className='w-50vw h-50vh bg-white rounded-b-2xl flex flex-col'>
        <div className='w-full h-1/2'>
          <TextField variant='filled' margin='none' label="message" size='small'
            onChange={(e) => setMessage(e.target.value)} />
          <Button variant='contained' color='primary' size='large'
            onClick={sendMessage}> Send </Button>
        </div>
        <div className='w-full h-1/2'>
          <h1 className='text-black'>{incomeMessage}</h1>
        </div>
      </div>
    </>
  )
}

export default App
