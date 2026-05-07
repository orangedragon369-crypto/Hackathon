import { BrowserRouter, Routes, Route, Link } from "react-router-dom";


import CalendarPage from './pages/calender/Calender';
import CommunicationPage from "./pages/commication";
import JobPosting from "./pages/Jobposting";
import Profile from "./pages/Profile";

import { useEffect, useState } from "react";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from './environment/environment';

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
      <SignIn />
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

function SignIn() {
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    return onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthError("");
    });
  }, []);

  const handleSignIn = async () => {
    try {
      setAuthError("");
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.log("Sign-in error:", err);
      setAuthError(err.message);
    }
  };

  const handleSignOut = async () => {
    try {
      setAuthError("");
      await signOut(auth);
    } catch (err) {
      console.log("Sign-out error:", err);
      setAuthError(err.message);
    }
  };

  return (
    <div className="sign-in">
      {user ? (
        <div className="topbar">
          <div>{user.displayName || user.email}</div>
          <Link to="/">
            Home
          </Link>
          <button onClick={handleSignOut} type="button">
            Sign out
          </button>
        </div>
      ) : (
        <button onClick={handleSignIn} type="button">
          Sign in with Google
        </button>
      )}
      {authError && <p className="sign-in-error">{authError}</p>}
    </div>
  );
}