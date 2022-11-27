import { Router } from "express";

const courseRouter = Router();

/**
 * 강의 목록
 */
courseRouter.get("/", (req, res) => {
  res.send("Course List");
});

export default courseRouter;
