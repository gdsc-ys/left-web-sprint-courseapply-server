import { Router } from "express";

const courseRouter = Router();

/**
 * 강의 목록 가져오기
 */
courseRouter.get("/", (req, res) => {
  res.send("Course List");
});

/**
 * 단과대 및 전공 목록 가져오기
 */
courseRouter.get("/colleges-and-majors", (req, res) => {
  res.send("Colleges and Majors");
});

/**
 * 강의 하나 가져오기
 */
courseRouter.get("/:id", (req, res) => {
  const courseId = req.params.id;

  res.send(`Course ${courseId}`);
});

export default courseRouter;
