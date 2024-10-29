import { useEffect, useState } from 'react';
import './App.css'
import { io } from 'socket.io-client'

const socket = io("http://localhost:3001");

function App() {

  const [message, setMessage] = useState<string | null>(null)
  const [sendMessage, setSendMessage] = useState<string | null>(null)
  const [messageRecv, setMessageRecv] = useState<string | null>(null)

  const SendMessage = () => {
    socket.emit("sendMessage", { message })
    setSendMessage(message);
  }

  useEffect(() => {
    socket.on("recieveMessage", (data) => {
      setMessageRecv(data.message)
    })
  }, [socket])

  return (
    <>
      <h1>Last income message:</h1>
      <h2 style={{ fontStyle: 'italic' }}>{messageRecv}</h2>
      <input type="text" placeholder='Message'
        onChange={
          (e) => setMessage(e.target.value)
        }
      />
      <button onClick={SendMessage}> Send Message</button>
      <h1>Your last message </h1>
      {sendMessage}
    </>
  )
}

export default App
