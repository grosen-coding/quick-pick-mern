import privateClient from "../client/private.client.js";

const favouriteEndPoints = {
  list: "user/favourites",
  add: "user/favourites",
  remove: ({ favouriteId }) => `user/favourites/${favouriteId}`,
};

const favouriteAPI = {
  getList: async () => {
    try {
      const response = await privateClient.get(favouriteEndPoints.list);

      return { response };
    } catch (error) {
      return { error };
    }
  },
  add: async ({ mediaId, mediaType, mediaTitle, mediaPoster, mediaRating }) => {
    try {
      const response = await privateClient.post(favouriteEndPoints.add, {
        mediaId,
        mediaType,
        mediaTitle,
        mediaPoster,
        mediaRating,
      });

      return { response };
    } catch (error) {
      return { error };
    }
  },
  remove: async ({ favouriteId }) => {
    try {
      const response = await privateClient.delete(
        favouriteEndPoints.remove({ favouriteId })
      );

      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default favouriteAPI;
