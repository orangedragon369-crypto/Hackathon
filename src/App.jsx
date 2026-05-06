import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'


import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import CalendarPage from './pages/calender';
import './App.css'
import Calender from './pages/calender'

function Home() {
  const [count, setCount] = useState(0)

  return (
    <>
        <Link to="/calendar">
        <button>Open Calendar</button>
        </Link>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calendar" element={<CalendarPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
