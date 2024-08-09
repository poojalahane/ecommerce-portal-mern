import express from "express";
import {
  forgotPasswordController,
  loginController,
  registerController,
  testController,
  updateProfileController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router object
const router = express();

//routing
//! register || method post
router.post("/register", registerController);

//! login || method post
router.post("/login", loginController);

//! FORGOT PASSWORD
router.post("/forgot-password", forgotPasswordController);

router.get("/test", requireSignIn, isAdmin, testController);

//! Protected Route auth
// router.get("/user-auth", requireSignIn, (req, res)=>{
//   res.status(200).send({ok:true});
// })
//protected route auth user
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected route auth for admin
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});


//! update profile
router.put('/profile', requireSignIn,  updateProfileController)
export default router;
