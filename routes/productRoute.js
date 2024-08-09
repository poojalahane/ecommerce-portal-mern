import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  deleteProductController,
  getAllProductController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productFilterController,
  productListController,
  productPhotoController,
  relatedProductController,
  searchProductController,
  updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

//! Create Product
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);
// //! update category
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

// //! get all Product
router.get("/get-product", getAllProductController);
// //! get single  Product
router.get("/get-product/:slug", getSingleProductController);
// //! delete single Product
router.delete(
  "/delete-product/:id",
  requireSignIn,
  isAdmin,
  deleteProductController
);

//! Filter Product
router.post('/product-filters', productFilterController)

//! get photo
router.get("/product-photo/:pid", productPhotoController);


//! PRODUCT COUNT
router.get('/product-count', productCountController)


//! PRODUCT PER PAGE
router.get('/product-list/:page', productListController)

//! serarch product
router.get('/search/:keyword', searchProductController)

//! Similar product
router.get('/related-product/:pid/:cid', relatedProductController)

//! Category wise product
router.get('/product-category/:slug', productCategoryController)

export default router;
