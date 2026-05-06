import { useState } from "react";
import "./App.css";

function App() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  function getVideos() {
    setLoading(true);
    const randomPage = Math.floor(Math.random() * 16) + 1;

    fetch(`https://api.freeapi.app/api/v1/public/youtube/videos?page=${randomPage}`)
      .then((res) => res.json())
      .then((data) => {
        setVideos(data.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num;
  };

  return (
    <div className="app-container">
      <div className="header">
        <h2>🎬 YouTube Videos</h2>
        <p>Discover trending videos from around the world</p>
      </div>

      <div className="button-container">
        <button className="fetch-button" onClick={getVideos} disabled={loading}>
          {loading ? "Loading..." : "Get Random Videos"}
        </button>
      </div>

      <div className="videos-grid">
        {videos.map((video, index) => {
          const item = video.items;

          // Format date
          const publishedDate = new Date(item.snippet.publishedAt)
            .toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            });

          return (
            <div key={index} className="video-card">
              <div className="video-thumbnail">
                <img
                  src={item.snippet.thumbnails.medium.url}
                  alt={item.snippet.title}
                />
                <div className="play-icon"></div>
              </div>

              <div className="video-content">
                <h3 className="video-title">{item.snippet.title}</h3>
                
                <div className="video-info">
                  <div className="info-row">
                    <span className="info-label">Views:</span>
                    <span className="info-value">{formatNumber(item.statistics.viewCount)}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Likes:</span>
                    <span className="info-value">{formatNumber(item.statistics.likeCount)}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Published:</span>
                    <span className="info-value">{publishedDate}</span>
                  </div>
                </div>

                <div className="channel-name">
                  <strong>📺</strong> {item.snippet.channelTitle}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;