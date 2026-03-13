import { useState, useReducer, useEffect, useMemo, useCallback } from "react";
import useFetchPhotos from "../hooks/useFetchPhotos";
import favouritesReducer from "../reducer/favouritesReducer";
import PhotoCard from "./photoCard";

function Gallery() {

  const { photos, loading, error } = useFetchPhotos();

  const [searchText, setSearchText] = useState("");

  const [favourites, dispatch] = useReducer(
    favouritesReducer,
    JSON.parse(localStorage.getItem("favourites")) || []
  );

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const handleSearch = useCallback((event) => {
    setSearchText(event.target.value);
  }, []);

  const filteredPhotos = useMemo(() => {

    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(searchText.toLowerCase())
    );

  }, [photos, searchText]);

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (

    <div className="p-4">

      <input
        type="text"
        placeholder="Search by author"
        className="border p-2 w-full mb-4"
        value={searchText}
        onChange={handleSearch}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

        {filteredPhotos.map((photo) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            favourites={favourites}
            dispatch={dispatch}
          />
        ))}

      </div>

    </div>

  );

}

export default Gallery;