import Router from "express";
import { registerUser, loginUser, allUser } from "../controllers/user.controller.js                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      "
import { protect } from "../middleware/auth.middleware.js"

const router = Router()

  router.route('/').post(registerUser).get(protect, allUser);
  router.post('/login',loginUser);


export default router