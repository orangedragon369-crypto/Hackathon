import { useEffect, useState } from "react";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import CalendarPage from './pages/calender/Calender';
import { auth, googleProvider } from './environment/environment';
import './App.css'

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
          {/* <Link to="/">Home</Link> */}
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

function Home() {
  return (
    <main className="home">
      <Link to="/calendar">
        <button>Open Calendar</button>
      </Link>
    </main>
  )
}

function App() {
  return (
    <BrowserRouter>
      <SignIn />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<CalendarPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App