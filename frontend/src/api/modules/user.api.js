import privateClient from "../client/private.client.js";
import publicClient from "../client/public.client.js";

const userEndpoints = {
  signIn: "user/signIn",
  signUp: "user/signUp",
  getInfo: "user/info",
  passwordUpdate: "user/update-password",
};

const userAPI = {
  signIn: async ({ username, password }) => {
    try {
      const response = await publicClient.post(userEndpoints.signIn, {
        username,
        password,
      });
      return { response };
    } catch (error) {
      return { error };
    }
  },
  signUp: async ({ username, password, confirmPassword, displayName }) => {
    try {
      const response = await publicClient.post(userEndpoints.signUp, {
        username,
        password,
        confirmPassword,
        displayName,
      });
      return { response };
    } catch (error) {
      return { error };
    }
  },
  getInfo: async () => {
    try {
      const response = await privateClient.get(userEndpoints.getInfo);
      return { response };
    } catch (error) {
      return { error };
    }
  },
  passwordUpdate: async ({ password, newPassword, confirmNewPassword }) => {
    try {
      const response = await privateClient.put(userEndpoints.signUp, {
        password,
        newPassword,
        confirmNewPassword,
      });

      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default userAPI;
