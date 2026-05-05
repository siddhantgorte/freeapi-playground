import { useState } from 'react'
import './App.css'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function getUser() {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('https://api.freeapi.app/api/v1/public/randomusers')
      const data = await res.json()
      const users = data?.data?.data

      if (!Array.isArray(users) || users.length === 0) {
        throw new Error('Unexpected API response')
      }

      const randomNum = Math.floor(Math.random() * users.length)
      setUser(users[randomNum])
    } catch (err) {
      console.error(err)
      setError('Unable to load a random user. Please try again.')
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app-shell">
      <div className="panel">
        <header className="hero">
          <div>
            <p className="eyebrow">Random user generator</p>
            <h1>Discover a new profile with every click.</h1>
            <p className="subtitle">
              Fetch a random user from the public API and view their profile in a clean,
              responsive card layout.
            </p>
          </div>
          <button className="primary-btn" onClick={getUser} disabled={loading}>
            {loading ? 'Loading...' : 'Get Random User'}
          </button>
        </header>

        {error && <div className="status-message error">{error}</div>}

        <section className="result-area">
          {user ? (
            <article className="user-card">
              <div className="avatar-shell">
                <img
                  src={user.picture.large}
                  alt={`${user.name.first} ${user.name.last}`}
                />
                <span className="badge">Verified profile</span>
              </div>

              <div className="user-info">
                <div className="profile-heading">
                  <p className="role">User profile</p>
                  <h2>
                    {user.name.title}. {user.name.first} {user.name.last}
                  </h2>
                  <p className="location">
                    {user.location.city}, {user.location.country}
                  </p>
                </div>

                <div className="info-grid">
                  <div>
                    <span>Age</span>
                    <strong>{user.dob.age}</strong>
                  </div>
                  <div>
                    <span>Email</span>
                    <strong>{user.email}</strong>
                  </div>
                  <div>
                    <span>Phone</span>
                    <strong>{user.phone}</strong>
                  </div>
                  <div>
                    <span>Gender</span>
                    <strong>{user.gender}</strong>
                  </div>
                  <div className="wide-cell">
                    <span>Address</span>
                    <strong>
                      {user.location.street.number} {user.location.street.name},
                      {user.location.state}
                    </strong>
                  </div>
                </div>
              </div>
            </article>
          ) : (
            <div className="empty-state">
              <p>Click the button to display a random user profile.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default App
