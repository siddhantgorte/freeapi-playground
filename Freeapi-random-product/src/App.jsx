import { useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  function getProducts() {
    setLoading(true);
    const randomPage = Math.floor(Math.random() * 10) + 1;

    fetch(`https://api.freeapi.app/api/v1/public/randomproducts?limit=6&page=${randomPage}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data.data || []);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }

  return (
    <main className="product-shell">
      <header className="product-hero">
        <div>
          <p className="eyebrow">FreeAPI Products</p>
          <h1>Discover curated finds in one click.</h1>
          <p className="hero-copy">
            Load a fresh batch of random products with price, rating, discount,
            and brand details in a sleek responsive layout.
          </p>
        </div>

        <button className="product-button" onClick={getProducts} disabled={loading}>
          {loading ? "Loading…" : "Show Products"}
        </button>
      </header>

      <section className="product-grid">
        {products.length === 0 ? (
          <div className="empty-state">
            <p>Press the button to reveal the latest random product picks.</p>
          </div>
        ) : (
          products.map((product) => {
            const finalPrice = product.price - (product.price * product.discountPercentage) / 100;

            return (
              <article key={product.id} className="product-card">
                {product.thumbnail && (
                  <img src={product.thumbnail} alt={product.title} className="product-image" />
                )}
                <div className="product-card-header">
                  <div>
                    <h2>{product.title}</h2>
                    <p className="product-subtitle">{product.brand} · {product.category}</p>
                  </div>
                  <span className="product-badge">{product.rating.toFixed(1)} ★</span>
                </div>

                <div className="product-details">
                  <div className="price-row">
                    <span className="price-label">Final</span>
                    <strong>${finalPrice.toFixed(2)}</strong>
                  </div>
                  <div className="price-row muted">
                    <span>Original</span>
                    <span className="original-price">${product.price.toFixed(2)}</span>
                  </div>
                  <div className="price-row muted">
                    <span>Discount</span>
                    <span>{product.discountPercentage}%</span>
                  </div>
                </div>

                <p className="product-description">{product.description}</p>
              </article>
            );
          })
        )}
      </section>
    </main>
  );
}

export default App;