import React from "react";
import axios from "axios";

const statusOptions = ["planned", "watching", "completed"];
const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:5000";

function MediaList({ media, onRefresh }) {
  const handleDelete = async (id) => {
    await axios.delete(`http://127.0.0.1:5000/media/${id}`);
    onRefresh();
  };

  const handleRating = async (id, rating) => {
    await axios.put(`http://127.0.0.1:5000/media/${id}`, { rating });
    onRefresh();
  };

  const handleStatusChange = async (id, newStatus) => {
    await axios.put(`http://127.0.0.1:5000/media/${id}`, { status: newStatus });
    onRefresh();
  };

  const renderTable = (items, title) => (
    <>
      <h2>{title}</h2>
      <table border="1" cellPadding="8" cellSpacing="0" style={{ marginBottom: "2rem" }}>
        <thead>
          <tr>
            <th>Naslov</th>
            <th>Status</th>
            <th>Ocena</th>
            <th>Spremeni oceno</th>
            <th>Izbriši</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>
                <select
                  value={item.status}
                  onChange={(e) => handleStatusChange(item.id, e.target.value)}
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </td>
              <td>{item.rating ?? "n/a"}</td>
              <td>
                <input
                  type="number"
                  min="1"
                  max="10"
                  placeholder="Ocena"
                  onBlur={(e) =>
                    e.target.value && handleRating(item.id, Number(e.target.value))
                  }
                />
              </td>
              <td>
                <button onClick={() => handleDelete(item.id)}>🗑</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );

  const films = media.filter((item) => item.type === "film");
  const series = media.filter((item) => item.type === "series");

  return (
    <div>
      {renderTable(films, "Filmi")}
      {renderTable(series, "Serije")}
    </div>
  );
}

export default MediaList;
