import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  CategoryController,
  createCategoryController,
  deleteCategoryController,
  getSingleCategoryController,
  updateCategoryController,
} from "../controllers/categoryController.js";

const router = express.Router();

//! Create Category
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);
//! update category
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);
//! get all categories
router.get("/get-category", CategoryController);
// //! get single  category
router.get("/single-catogory/:slug", getSingleCategoryController);
// //! delete single category
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);

export default router;
