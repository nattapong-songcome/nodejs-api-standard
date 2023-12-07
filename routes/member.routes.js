import { Router } from "express";
import { create, getById, updateOne, deleteOne } from "../controllers/member.controller.js";
const router = Router();
router.post("/create", create);
router.get(["/", "/:_id"], getById);
router.patch(["/", "/:_id"], updateOne);
router.delete(["/", "/:_id"], deleteOne);
export default router;
