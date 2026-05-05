import { useState } from "react";
import "./App.css";

function App() {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(false);

  async function getJoke() {
    setLoading(true);

    try {
      const randomPage = Math.floor(Math.random() * 147) + 1;
      const response = await fetch(`https://api.freeapi.app/api/v1/public/randomjokes?limit=10&page=${randomPage}`);
      const data = await response.json();

      const filtered = data.data.data.filter(
        (j) => !j.categories.includes("explicit")
      );

      if (filtered.length > 0) {
        const random = filtered[Math.floor(Math.random() * filtered.length)];
        setJoke(random);
      } else {
        setJoke(null); // no safe jokes on this page
      }
    } catch (err) {
      console.error(err);
      setJoke(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="joke-shell">
      <div className="joke-panel">
        <header className="joke-header">
          <p className="joke-eyebrow">Random Jokes</p>
          <h1>😂 Laugh Out Loud</h1>
          <p className="joke-subtitle">
            Get a random, family-friendly joke to brighten your day. No explicit content guaranteed!
          </p>
        </header>

        <button className="joke-button" onClick={getJoke} disabled={loading}>
          {loading ? "Finding a joke..." : "Tell Me a Joke"}
        </button>

        <section className="joke-result">
          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>Searching for the perfect joke...</p>
            </div>
          ) : joke ? (
            <div className="joke-card">
              <p className="joke-content">{joke.content}</p>
            </div>
          ) : (
            <div className="joke-empty">
              <p>No safe joke found on this page. Try again for a different one!</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default App;