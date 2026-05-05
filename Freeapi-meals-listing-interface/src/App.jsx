import { useState } from "react";
import "./App.css";

function App() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getMeals() {
    setLoading(true);
    try {
      const randomPage = Math.floor(Math.random() * 30) + 1;
      const response = await fetch(`https://api.freeapi.app/api/v1/public/meals?limit=6&page=${randomPage}`);
      const data = await response.json();
      setMeals(data.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h2>🍽️ Random Meals</h2>
        <p>Discover delicious recipes from around the world</p>
      </header>

      <button className="btn" onClick={getMeals} disabled={loading}>
        {loading ? "Loading..." : "Get 6 Random Meals"}
      </button>

      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Finding delicious meals...</p>
        </div>
      )}

      <div className="meals-container">
        {meals.map((meal) => (
          <div key={meal.idMeal} className="meal-card">
            <div className="meal-image-container">
              <img src={meal.strMealThumb} alt={meal.strMeal} className="meal-image" />
              <div className="meal-overlay">
                <span className="category-badge">{meal.strCategory}</span>
              </div>
            </div>

            <div className="meal-content">
              <h3 className="meal-title">{meal.strMeal}</h3>

              <div className="meal-meta">
                <div className="meta-item">
                  <span>{meal.strCategory}</span>
                </div>

                <div className="meta-item">
                  <span>{meal.strArea}</span>
                </div>

                {meal.strYoutube && (
                  <a
                    href={meal.strYoutube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="youtube-link"
                  >
                    <span className="meta-icon">▶️</span>
                    Watch Video
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {meals.length === 0 && !loading && (
        <div className="empty-state">
          <div className="empty-icon">🍽️</div>
          <h3>No meals loaded yet</h3>
          <p>Click the button above to discover delicious recipes!</p>
        </div>
      )}
    </div>
  );
}

export default App;