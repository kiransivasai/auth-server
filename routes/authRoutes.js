import { Router } from "express";
import {
  signup,
  login,
  logout,
  verifyUser,
} from "../controllers/authControllers.js";

const router = Router();
router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/verifyuser", verifyUser);

export default router;
