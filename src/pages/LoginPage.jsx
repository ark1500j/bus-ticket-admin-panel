import admin from "../assets/admin.jpg"
import './LoginPage.css';
import  { useState } from 'react';
import { auth } from '../firebase/firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";



const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError ] = useState(null);
  const db = getFirestore();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Sign in with email and password using Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, username, password);

      // Get the user document from Firestore
      const userDoc = await getDoc(doc(db, 'admins', userCredential.user.uid));

      if (userDoc.exists()) {
        const userData = userDoc.data();

        // Check if the user is an admin
        if (userData.role === 'admin') {
          console.log("Admin logged in:", userCredential.user);
          // Redirect to admin dashboard or another page
          navigate("/dashboard", {
            replace: true
          });
        } else {
          setError("Access denied. You are not an admin.");
          await auth.signOut(); // Sign out if not an admin
        }
      } else {
        setError("No user data found.");
        await auth.signOut(); // Sign out if no user data
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Failed to sign in. Please check your credentials.");
    }
  };

  

  return (
    <div className="login-container">
      <div className="illustration-container">
        <img
          src={admin}
          alt="admin"
          className="illustration"
        />
      </div>
      <div className="form-container">
        <div className="logo">
          <h1>
            <span>Admin</span> <span>Login</span>
          </h1>
        </div>
        <form className="login-form" onSubmit={handleLogin}>
          {error && <p className="error-message">{error}</p>}
          <div className="input-group">
            <label htmlFor="username">Username or email</label>
            <input 
              type="text" 
              id="username" 
              placeholder="enter email/username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required 
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              placeholder="enter password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          {/* <div className="forgot-password">
            <a href="/forgot-password">Forgot password?</a>
          </div> */}
          <button type="submit" className="login-button">Sign in</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
