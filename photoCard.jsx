function PhotoCard({ photo, favourites, dispatch }) {

  const isFavourite = favourites.includes(photo.id);

  function handleFavourite() {
    dispatch({
      type: "TOGGLE_FAV",
      payload: photo.id
    });
  }

  return (

    <div className="border rounded shadow">

      <img
        src={photo.download_url}
        alt={photo.author}
        className="w-full h-48 object-cover"
      />

      <div className="flex justify-between items-center p-2">

        <p>{photo.author}</p>

        <button onClick={handleFavourite}>
          {isFavourite ? "❤️" : "🤍"}
        </button>

      </div>

    </div>

  );

}

export default PhotoCard;