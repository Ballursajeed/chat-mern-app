import Router from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
   accessChat,
   getChat,
   createGroupChat,
   renameGroup,
   removeFromGroup,
   addToGroup
       } from "../controllers/chat.controller.js";

const router = Router();

router.route('/').post(accessChat);
router.route('/').get(protect,getChat);
router.route('/group').post(protect,createGroupChat);
router.route('/rename').put(protect,renameGroup);
router.route('/groupremove').put(protect,removeFromGroup);
router.route('/groupadd').put(protect,addToGroup);

export default router