import publicClient from "../client/public.client.js";

const genreEndPoints = {
  list: ({ mediaType }) => `${mediaType}/genres`,
};

const genreAPI = {
  getList: async ({ mediaType }) => {
    try {
      const response = await publicClient.get(
        genreEndPoints.list({
          mediaType,
        })
      );

      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default genreAPI;
