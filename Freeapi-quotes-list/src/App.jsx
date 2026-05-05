import { useState } from "react";
import "./App.css";

function App() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);

  function getQuotes() {
    setLoading(true);
    const randomPage = Math.floor(Math.random() * 30) + 1;

    fetch(`https://api.freeapi.app/api/v1/public/quotes?limit=5&page=${randomPage}`)
      .then((res) => res.json())
      .then((data) => {
        setQuotes(data.data.data || []);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }

  return (
    <main className="app-shell">
      <section className="hero-panel">
        <div>
          <p className="eyebrow">FreeAPI Quotes</p>
          <h1>Inspiration on every refresh.</h1>
          <p className="hero-copy">
            Fetch a new batch of quotes from the public FreeAPI endpoint and
            discover short, sharp thoughts to brighten your day.
          </p>
        </div>

        <button className="quote-button" onClick={getQuotes} disabled={loading}>
          {loading ? "Loading…" : "Get Quotes"}
        </button>
      </section>

      <section className="cards-grid">
        {quotes.length === 0 ? (
          <article className="placeholder-card">
            <p>Click the button above to load fresh quotes.</p>
          </article>
        ) : (
          quotes.map((quote) => (
            <article key={quote.id} className="quote-card">
              <p className="quote-content">“{quote.content}”</p>
              <p className="quote-author">— {quote.author || "Unknown"}</p>
              <p className="quote-tags">
                <span className="tag-label">Tags:</span>{" "}
                {quote.tags.length > 0 ? quote.tags.join(", ") : "None"}
              </p>
            </article>
          ))
        )}
      </section>
    </main>
  );
}

export default App;