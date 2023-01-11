import publicClient from "../client/public.client.js";

const personEndPoints = {
  detail: ({ personId }) => `person/${personId}`,
  medias: ({ personId }) => `person/${personId}/medias`,
};

const personAPI = {
  detail: async ({ personId }) => {
    try {
      const response = await publicClient.get(
        personEndPoints.detail({
          personId,
        })
      );

      return { response };
    } catch (error) {
      return { error };
    }
  },
  medias: async ({ personId }) => {
    try {
      const response = await publicClient.get(
        personEndPoints.medias({
          personId,
        })
      );

      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default personAPI;
