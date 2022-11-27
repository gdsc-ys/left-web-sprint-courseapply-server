import { Router } from "express";

const myCourseRouter = Router();

/**
 * 수강 신청
 */
myCourseRouter.post("/", (req, res) => {
  res.send("Applied");
});

/**
 * 수강 취소
 */
myCourseRouter.delete("/:id", (req, res) => {
  const courseId = req.params.id;
  res.send(`${courseId} Withdrew`);
});

/**
 * 신청 내역 List
 */
myCourseRouter.get("/", (req, res) => {
  res.send("My course list");
});

export default myCourseRouter;
