import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import CalendarPage from "./pages/calender";
import CommunicationPage from "./pages/commication";
import JobPosting from "./pages/Jobposting";
import Profile from "./pages/Profile";

import "./App.css";

function Home() {
  return (
    <div className="home-container">

      <h1 className="title">My Control Panel</h1>
      <p className="subtitle">Choose a module to continue</p>

      <div className="card-grid">

        <Link to="/calendar" className="card">
           Calendar
        </Link>

        <Link to="/communication" className="card">
           Communication
        </Link>

        <Link to="/jobposting" className="card">
           Job Board
        </Link>

        <Link to="/profile" className="card">
           Profile
        </Link>

      </div>

    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/communication" element={<CommunicationPage />} />
        <Route path="/jobposting" element={<JobPosting />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;