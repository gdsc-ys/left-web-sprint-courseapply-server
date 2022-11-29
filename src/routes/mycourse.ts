import { Router } from "express";
import { Course } from "../interfaces/Course";

const myCourseRouter = Router();

/**
 * 수강 신청
 */
export interface ApplyRequest extends Pick<Course, "id"> {}

export type ApplyResponse = Course[];

myCourseRouter.post("/", (req, res) => {
  res.send("Applied");
});

/**
 * 수강 취소
 */
export interface WithdrawRequest extends Pick<Course, "id"> {}

export type WithdrawResponse = Course[];

myCourseRouter.delete("/:id", (req, res) => {
  const courseId = req.params.id;
  res.send(`${courseId} Withdrew`);
});

/**
 * 신청 내역 목록 가져오기
 */
export type GetAppliedCoursesRequest = void;

export interface GetAppliedCoursesResponse extends Array<Course> {}

myCourseRouter.get("/", (req, res) => {
  res.send("My course list");
});

export default myCourseRouter;
