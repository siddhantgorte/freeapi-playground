import { useState } from "react";
import "./App.css";

function App() {
  const [cat, setCat] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function getCat() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://api.freeapi.app/api/v1/public/cats/cat/random");
      const data = await response.json();
      setCat(data.data);
    } catch (err) {
      console.error(err);
      setError("Unable to fetch a cat right now. Please try again.");
      setCat(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="cat-shell">
      <div className="cat-panel">
        <header className="cat-hero">
          <div>
            <p className="cat-eyebrow">Random Cat Breed</p>
            <h1>Discover a beautiful cat profile</h1>
            <p className="cat-subtitle">
              Fetch a random breed and explore origin, temperament, grooming score, and trusted care links.
            </p>
          </div>
          <button className="cat-button" onClick={getCat} disabled={loading}>
            {loading ? "Fetching cat..." : "Get Random Cat"}
          </button>
        </header>

        {error && <div className="cat-alert">{error}</div>}

        <section className="cat-result">
          {cat ? (
            <article className="cat-card">
              <div className="cat-image-frame">
                <img src={cat.image} alt={cat.name} className="cat-image" />
              </div>
              <div className="cat-info">
                <h2>{cat.name}</h2>
                <div className="cat-tags">
                  <span className="cat-tag">Origin: {cat.origin}</span>
                  <span className="cat-tag">Grooming: {cat.grooming}/5</span>
                </div>

                <div className="cat-details-grid">
                  <div>
                    <span>Life span</span>
                    <strong>{cat.life_span} years</strong>
                  </div>
                  <div>
                    <span>Temperament</span>
                    <strong>{cat.temperament}</strong>
                  </div>
                </div>

                <div className="cat-links">
                  <a href={cat.vetstreet_url} target="_blank" rel="noopener noreferrer">
                    Vetstreet Info
                  </a>
                  <a href={cat.vcahospitals_url} target="_blank" rel="noopener noreferrer">
                    VCA Hospitals Info
                  </a>
                </div>
              </div>
            </article>
          ) : (
            <div className="cat-empty">
              <p>Press the button to reveal a random cat breed profile.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
