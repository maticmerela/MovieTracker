import React, { useEffect, useState } from "react";
import axios from "axios";
// import MediaList from "./components/MediaList";
import MediaList from "./components/MediaList";


function App() {
  const [media, setMedia] = useState([]);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("film");
  const [rating, setRating] = useState(0);
  // const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const API_URL = `${window.location.protocol}//${window.location.hostname}:5000`;


  const fetchMedia = async () => {
    const res = await axios.get(`${API_URL}/media`);
    setMedia(res.data);
  };

 const addMedia = async () => {
  await axios.post(`${API_URL}/media`, {
    title,
    type,
    rating,
  });
  setTitle("");
  setRating(0);
  fetchMedia();
};

  useEffect(() => {
    fetchMedia();
  }, []);

  return (
    <div className="App" style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Moj seznam filmov in serij 🎬</h1>
      <input
        placeholder="Naslov"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
      type="number"
      min="1"
      max="10"
      placeholder="Ocena (1-10)"
      value={rating}
      onChange={(e) => setRating(Number(e.target.value))}
    />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="film">Film</option>
        <option value="series">Serija</option>
      </select>
      <button onClick={addMedia}>Dodaj</button>

      <MediaList media={media} onRefresh={fetchMedia} />
    </div>
  );
}

export default App;
