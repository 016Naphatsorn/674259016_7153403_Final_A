import { Router } from "express";
import {
  createbook,
  getAllbook,
  getbookById,
  updatebook,
  deletebook,
} from "../controller/bookController.js";

const bookRouter = Router();

bookRouter.post("/", createbook);
bookRouter.get("/", getAllbook);
bookRouter.get("/:id", getbookById);
bookRouter.put("/:id", updatebook);
bookRouter.delete("/:id", deletebook);

export default bookRouter;
