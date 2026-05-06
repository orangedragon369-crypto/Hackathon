import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Calender from './pages/calender'

function App() {
  const day = (time, sort) => (
    <article>
      <h2>{time.toLocaleDateString()}</h2>
      <p>{sort}</p>
    </article>
  )

  return (
    <div id="app">
      
      <Calender
        sort="all"
        time={new Date()}
        daysToShow={30}
        day={day}
      />
    </div>
  )
}

export default App
