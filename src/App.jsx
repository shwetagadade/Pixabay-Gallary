import React, { useEffect, useState } from "react";
import './Gallary.css'
const App = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`https://pixabay.com/api/?key=40258800-c4ae8c1b1fa7ecfd88b45f046&q=${search}&image_type=photo`)
      .then((res) => res.json())
      .then((d) => {
        setData(d.hits || []); 
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [search]);

  const openImage = (image) => {
    setSelectedImage(image);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };
  return (
    <div>
      
      <input  placeholder="Search Images" name="Search"  type="search" onChange={(e) => setSearch(e.target.value)} />
      {loading && <p>Loading...</p>}
      <section style={{ display: "flex", justifyContent: "space-around", alignItems: "center", flexWrap: "wrap" }}>
        {data.map((x) => (
          <div key={x.id} onClick={() => openImage(x)}>
            <img src={x.largeImageURL} alt={x.tags} width={x.previewWidth} height={x.previewHeight} />
          </div>
        ))}
      </section>
      {selectedImage && (
        <div className="modal-container">
          <div className="modal-content">
            <span className="modal-close" onClick={closeImage}>&times;</span>
            <img src={selectedImage.largeImageURL} alt={selectedImage.tags} />
            <button onClick={closeImage}>X</button>
          </div>
        </div>
      )}
    </div>
);
};

export default App;