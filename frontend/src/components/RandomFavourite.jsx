import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import favouriteAPI from "../api/modules/favourite.api";

const RandomSelectionButton = ({
  setGlobalLoading,
  setCount,
  setFilteredMedias,
  skip,
  toast,
}) => {
  const [favourites, setFavourites] = useState([]);
  const [randomFavorite, setRandomFavorite] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const getFavourites = async () => {
      dispatch(setGlobalLoading(true));
      const { response, err } = await favouriteAPI.getList();
      dispatch(setGlobalLoading(false));

      if (err) toast.error(err.message);
      if (response) {
        setCount(response.length);
        setFavourites([...response]);
        setFilteredMedias([...response].slice(0, skip));
      }
    };

    getFavourites();
  }, [dispatch, setGlobalLoading, setCount, setFilteredMedias, skip, toast]);

  const generateRandomFavorite = (favourites) => {
    const randomIndex = Math.floor(Math.random() * favourites.length);
    return favourites[randomIndex];
  };

  const handleRandomFavorite = () => {
    const randomFav = generateRandomFavorite(favourites);
    setRandomFavorite(randomFav);
  };

  return (
    <div>
      <button onClick={handleRandomFavorite}>Generate Random Favorite</button>
      {randomFavorite && (
        <div>
          <h2>Your random favorite is:</h2>
          <p>{randomFavorite.name}</p>
        </div>
      )}
    </div>
  );
};

export default RandomSelectionButton;
