import { useEffect, useState } from "react";
import { Modal } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import MediaItem from "../components/common/MediaItem";
import Container from "../components/common/Container";
import uiConfigs from "../configs/ui.configs";
import favouriteAPI from "../api/modules/favourite.api";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import { removeFavourite } from "../redux/features/userSlice";
import Typed from "react-typed";

const FavouriteItem = ({ media, onRemoved }) => {
  const dispatch = useDispatch();

  const [onRequest, setOnRequest] = useState(false);

  const onRemove = async () => {
    if (onRequest) return;
    setOnRequest(true);
    const { response, err } = await favouriteAPI.remove({
      favouriteId: media.id,
    });
    setOnRequest(false);

    if (err) toast.error(err.message);
    if (response) {
      toast.success(`Removed "${media.mediaTitle}" from your Favourites List`);
      dispatch(removeFavourite({ mediaId: media.mediaId }));
      onRemoved(media.id);
    }
  };

  return (
    <>
      <MediaItem media={media} mediaType={media.mediaType} />
      <LoadingButton
        fullWidth
        variant="contained"
        sx={{ marginTop: 2 }}
        startIcon={<DeleteIcon />}
        loadingPosition="start"
        loading={onRequest}
        onClick={onRemove}
      >
        remove
      </LoadingButton>
    </>
  );
};

const FavouriteList = () => {
  const [medias, setMedias] = useState([]);
  const [filteredMedias, setFilteredMedias] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  // Random Favourite

  const [selectedMedia, setSelectedMedia] = useState(null);
  const [open, setOpen] = useState(false);
  // Random Favoutite

  const dispatch = useDispatch();

  const skip = 8;

  useEffect(() => {
    const getFavourites = async () => {
      dispatch(setGlobalLoading(true));
      const { response, err } = await favouriteAPI.getList();
      dispatch(setGlobalLoading(false));

      if (err) toast.error(err.message);
      if (response) {
        setCount(response.length);
        setMedias([...response]);

        // console.log([...response]);

        setFilteredMedias([...response].splice(0, skip));
      }
    };

    getFavourites();
  }, [dispatch]);

  // console.log(medias);

  const onLoadMore = () => {
    setFilteredMedias([
      ...filteredMedias,
      ...[...medias].splice(page * skip, skip),
    ]);
    setPage(page + 1);
  };

  const onRemoved = (id) => {
    const newMedias = [...medias].filter((e) => e.id !== id);
    setMedias(newMedias);
    setFilteredMedias([...newMedias].splice(0, page * skip));
    setCount(count - 1);
  };

  // Random Favourite
  const handleOpen = () => {
    const randomIndex = Math.floor(Math.random() * medias.length);
    setSelectedMedia(medias[randomIndex]);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedMedia(null);
  };

  // Random Favourite

  // Pick again
  const [newPick, setNewPick] = useState(null);
  const pickAgain = () => {
    setSelectedMedia(null);
    const randomIndex = Math.floor(Math.random() * medias.length);
    setNewPick(setSelectedMedia(medias[randomIndex]));
  };
  // Pick again

  // console.log(medias);

  // console.log(selectedMedia);

  return (
    <Box sx={{ ...uiConfigs.style.mainContent }}>
      <Container header={`Your favourites (${count})`}>
        {/* Filter by Genre */}
        {/* Filter by Genre */}

        <Typography
          variant="h4"
          fontWeight="700"
          color="#68b0ab"
          textAlign="center"
          marginTop="50px !important"
        >
          Can't Decide What to Watch??...
        </Typography>

        {/* Random Favourite */}
        <Button
          onClick={handleOpen}
          sx={{
            width: { xs: "90%", sm: "40%", md: "50%" },
            // height: "300px",
            backgroundColor: "#c8d5b9",
            color: "#333",
            // margin: "4rem auto",
            alignSelf: "center",
            fontWeight: 800,
            fontSize: { xs: "1rem", sm: "1.2rem", md: "1.5rem" },
            margin: "50px 0 !important",

            "&:hover": {
              backgroundColor: "#c8d5b9",
              opacity: "0.7",
            },
          }}
        >
          Try a RANDOM &nbsp;
          <span style={{ color: "#4a7c59" }}> Quick Pick!</span>
        </Button>
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              position: "relative",
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0,0,0,0.8)",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                width: { xs: "80%", sm: "50%", md: "40%", lg: "25%" },
                // height: "50%",
                backgroundColor: "#68b0ab",
                padding: "5rem 3rem 3rem",
                borderRadius: "10px",
              }}
            >
              <Button
                onClick={pickAgain}
                sx={{
                  position: "absolute",
                  top: "20px",
                  left: "20px",
                  backgroundColor: "#c8d5b9",
                  color: "#333",
                  fontWeight: 800,

                  "&:hover": {
                    backgroundColor: "#faf3dd",
                  },
                }}
              >
                Choose Again
              </Button>
              <Button
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  backgroundColor: "#c8d5b9",
                  color: "#333",
                  fontWeight: 800,

                  "&:hover": {
                    backgroundColor: "#faf3dd",
                  },
                }}
              >
                Close
              </Button>
              {selectedMedia && (
                <MediaItem
                  media={selectedMedia}
                  mediaType={selectedMedia.mediaType}
                />
              )}
              {newPick && (
                <MediaItem
                  media={selectedMedia}
                  mediaType={selectedMedia.mediaType}
                />
              )}
            </Box>
          </Box>
        </Modal>
        {/* Random Favourite */}

        <Grid container spacing={1} sx={{ marginRight: "-8px!important" }}>
          {filteredMedias.map((media, index) => (
            <Grid item xs={6} sm={4} md={3} key={index}>
              <FavouriteItem media={media} onRemoved={onRemoved} />
            </Grid>
          ))}
        </Grid>
        {filteredMedias.length < medias.length && (
          <Button onClick={onLoadMore}>load more</Button>
        )}
      </Container>
    </Box>
  );
};

export default FavouriteList;
