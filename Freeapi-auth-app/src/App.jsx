import { useState, useEffect } from "react";
import "./App.css";

const API_BASE = "https://api.freeapi.app/api/v1/users";

function App() {
  // ---------------- STATE ----------------
  const [currentView, setCurrentView] = useState('buttons'); // 'buttons', 'register', 'login', 'user'
  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // ---------------- INPUT HANDLERS ----------------
  function handleRegisterChange(e) {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  }

  function handleLoginChange(e) {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  }

  // ---------------- REGISTER ----------------
  async function registerUser() {
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: registerForm.username,
          email: registerForm.email,
          password: registerForm.password,
          role: "ADMIN",
        }),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message);
      } else {
        alert("Registered successfully. Please login.");
        setCurrentView('login');
      }
    } catch (err) {
      alert("Registration failed");
    }

    setLoading(false);
  }

  // ---------------- LOGIN ----------------
  async function loginUser() {
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: loginForm.username,
          password: loginForm.password,
        }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("token", data.data.accessToken);

        // IMPORTANT: fetch real user after login
        await getCurrentUser();
      } else {
        alert("Login failed");
      }
    } catch (err) {
      alert("Login error");
    }

    setLoading(false);
  }

  // ---------------- CURRENT USER ----------------
  async function getCurrentUser() {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const res = await fetch(`${API_BASE}/current-user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        setUser(data.data);
        setCurrentView('user');
      } else {
        // token invalid
        localStorage.removeItem("token");
        setUser(null);
      }
    } catch (err) {
      console.log("Session expired");
      localStorage.removeItem("token");
      setUser(null);
    }
  }

  // ---------------- LOGOUT ----------------
  async function logoutUser() {
    const token = localStorage.getItem("token");

    setLoading(true);

    try {
      await fetch(`${API_BASE}/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.log("Logout error");
    }

    localStorage.removeItem("token");
    setUser(null);
    setCurrentView('buttons');

    setLoading(false);
  }

  // ---------------- SESSION RESTORE ----------------
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      getCurrentUser();
    }
  }, []);

  // ---------------- UI ----------------
  return (
    <div className="app-container">
      <div style={{ position: 'relative', width: '100%', maxWidth: '600px' }}>
        <h1 className="auth-header">🔐 Auth App (FreeAPI)</h1>

        {currentView === 'buttons' && (
          <div className="auth-buttons">
            <button
              className="auth-toggle-btn"
              onClick={() => setCurrentView('register')}
            >
              Register
            </button>
            <button
              className="auth-toggle-btn"
              onClick={() => setCurrentView('login')}
            >
              Login
            </button>
          </div>
        )}

        {currentView === 'register' && (
          <div className="auth-card">
            <button
              className="back-button"
              onClick={() => setCurrentView('buttons')}
            >
              ← Back
            </button>
            <h2>Create Account</h2>

            <div className="input-group">
              <label htmlFor="reg-username">Username</label>
              <input
                id="reg-username"
                name="username"
                placeholder="Choose a username"
                onChange={handleRegisterChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="reg-email">Email</label>
              <input
                id="reg-email"
                name="email"
                type="email"
                placeholder="Enter your email"
                onChange={handleRegisterChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="reg-password">Password</label>
              <input
                id="reg-password"
                name="password"
                type="password"
                placeholder="Create a password"
                onChange={handleRegisterChange}
              />
            </div>

            <button className="auth-button" onClick={registerUser} disabled={loading}>
              {loading ? "Creating Account..." : "Register"}
            </button>
          </div>
        )}

        {currentView === 'login' && (
          <div className="auth-card">
            <button
              className="back-button"
              onClick={() => setCurrentView('buttons')}
            >
              ← Back
            </button>
            <h2>Welcome Back</h2>

            <div className="input-group">
              <label htmlFor="login-username">Username</label>
              <input
                id="login-username"
                name="username"
                placeholder="Enter your username"
                onChange={handleLoginChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="login-password">Password</label>
              <input
                id="login-password"
                name="password"
                type="password"
                placeholder="Enter your password"
                onChange={handleLoginChange}
              />
            </div>

            <button className="auth-button" onClick={loginUser} disabled={loading}>
              {loading ? "Signing In..." : "Login"}
            </button>
          </div>
        )}

        {currentView === 'user' && (
          <div className="user-card">
            <h2>👤 Welcome, {user?.username}!</h2>

            <div className="user-info">
              <p><b>Username:</b> <span>{user?.username}</span></p>
              <p><b>Email:</b> <span>{user?.email}</span></p>
              <p><b>Role:</b> <span>{user?.role}</span></p>
              <p><b>User ID:</b> <span>{user?._id}</span></p>
            </div>

            <button className="logout-button" onClick={logoutUser} disabled={loading}>
              {loading ? "Logging out..." : "Logout"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;