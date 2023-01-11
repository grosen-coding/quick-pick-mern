import express from "express";
import { body } from "express-validator";
import favouriteController from "../controllers/favourite.controller.js";
import userController from "../controllers/user.controller.js";
import requestHandler from "../handlers/request.handler.js";
import userModel from "../models/user.model.js";
import tokenMiddleware from "../middleware/token.middleware.js";

const router = express.Router();

router.post(
  "/signUp",
  body("username")
    .exists()
    .withMessage("Please select a username.")
    .isLength({ min: 6 })
    .withMessage("Username must contain min 6 characters.")
    .custom(async (value) => {
      const user = await userModel.findOne({ username: value });
      if (user)
        return Promise.reject(
          "Sorry, username already in use! Please pick a new one."
        );
    }),
  body("password")
    .exists()
    .withMessage("Please create a password.")
    .isLength({ min: 6 })
    .withMessage("Password must contain min 6 characters."),
  body("confirmPassword")
    .exists()
    .withMessage("Please confirm your password.")
    .isLength({ min: 6 })
    .withMessage("Password must contain min 6 characters.")
    .custom((value, { req }) => {
      if (value !== req.body.password)
        throw new Error(
          "Sorry, your passwords do not seem to match, please try again."
        );
      return true;
    }),
  body("displayName")
    .exists()
    .withMessage("Please create a Display Name")
    .isLength({ min: 6 })
    .withMessage("Your Display name must contain min 6 characters."),
  requestHandler.validate,
  userController.signUp
);

router.post(
  "/signIn",
  body("username")
    .exists()
    .withMessage("A username is required.")
    .isLength({ min: 6 })
    .withMessage("You username minimum 6 characters."),
  body("password")
    .exists()
    .withMessage("A password is required.")
    .isLength({ min: 6 })
    .withMessage("Your password must be minimum 6 characters."),
  requestHandler.validate,
  userController.signIn
);

router.put(
  "/update-password",
  tokenMiddleware.auth,
  body("password")
    .exists()
    .withMessage("Please enter your old password.")
    .isLength({ min: 6 })
    .withMessage("Your password must be minimum 6 characters."),
  body("newPassword")
    .exists()
    .withMessage("Please enter a NEW password.")
    .isLength({ min: 6 })
    .withMessage("Your NEW password must contain min 6 characters"),
  body("confirmNewPassword")
    .exists()
    .withMessage("Please confirm your NEW password")
    .isLength({ min: 6 })
    .withMessage("Your NEW password must contain min 6 characters")
    .custom((value, { req }) => {
      if (value !== req.body.newPassword)
        throw new Error(
          "Sorry, your NEW passwords do not match, please try again."
        );
      return true;
    }),
  requestHandler.validate,
  userController.updatePassword
);

router.get("/info", tokenMiddleware.auth, userController.getInfo);

router.get(
  "/favourites",
  tokenMiddleware.auth,
  favouriteController.getFavouritesOfUser
);

router.post(
  "/favourites",
  tokenMiddleware.auth,
  body("mediaType")
    .exists()
    .withMessage("mediaType is required")
    .custom((type) => ["movie", "tv"].includes(type))
    .withMessage("mediaType invalid"),
  body("mediaId")
    .exists()
    .withMessage("mediaId is required")
    .isLength({ min: 1 })
    .withMessage("mediaId cannot be empty"),
  body("mediaTitle").exists().withMessage("mediaTitle is required"),
  body("mediaPoster").exists().withMessage("mediaPoster is required"),
  //   body("mediaRate").exists().withMessage("mediaRate is required"),
  requestHandler.validate,
  favouriteController.addFavourite
);

router.delete(
  "/favourites/:favouriteId",
  tokenMiddleware.auth,
  favouriteController.removeFavourite
);

export default router;
