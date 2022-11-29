import { Router } from "express";
import { Course } from "../interfaces/Course";
import { postData } from "../utils/firebase";

const courseRouter = Router();

/**
 * 강의 목록 가져오기
 */
export interface GetCoursesRequest
  extends Partial<Pick<Course, "degree" | "college" | "major">> {}

export interface GetCoursesResponse extends Array<Course> {}

courseRouter.get("/", (req, res) => {
  res.send("Course List");
});

/**
 * 단과대 및 전공 목록 가져오기
 */
export type GetCollegesAndMajorsRequest = void;

export interface GetCollegesAndMajorsResponse {
  colleges: string[];
  majors: string[];
}

courseRouter.get("/colleges-and-majors", (req, res) => {
  res.send("Colleges and Majors");
});

/**
 * 강의 하나 가져오기
 */
export interface GetCourseRequest extends Pick<Course, "id"> {}

export interface GetCourseResponse extends Course {}

courseRouter.get("/:id", (req, res) => {
  const courseId = req.params.id;

  res.send(`Course ${courseId}`);
});

export default courseRouter;
