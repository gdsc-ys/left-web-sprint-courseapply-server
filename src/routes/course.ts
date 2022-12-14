import { Router } from "express";
import type { Course } from "../interfaces/Course";
import type { Query } from "../interfaces/Firebase";
import { getData, listData } from "../utils/firebase";

const courseRouter = Router();

/**
 * 강의 목록 가져오기
 */
export interface GetCoursesRequest
  extends Partial<Pick<Course, "degree" | "college" | "major">> {}

export interface GetCoursesResponse extends Array<Course> {}

courseRouter.get("/", async (req, res) => {
  const { degree, college, major } = req.query as GetCoursesRequest;

  const queries = [
    ...(degree ? [["degree", "==", degree]] : []),
    ...(college ? [["college", "==", college]] : []),
    ...(major ? [["major", "==", major]] : []),
  ] as Query[];

  const courses = await listData<Course>({
    collection: "courses",
    queries,
  });

  res.send(courses);
});

/**
 * 단과대 및 전공 목록 가져오기
 */
export type GetCollegesAndMajorsRequest = void;

export interface GetCollegesAndMajorsResponse {
  colleges: string[];
  majors: string[];
}

courseRouter.get("/colleges-and-majors", async (req, res) => {
  const courses = await listData<Course>({
    collection: "courses",
  });

  const colleges = [...new Set(courses.map((course) => course.college))];
  const majors = [...new Set(courses.map((course) => course.major))];

  const response: GetCollegesAndMajorsResponse = { colleges, majors };

  res.send(response);
});

/**
 * 강의 하나 가져오기
 */
export interface GetCourseRequest extends Pick<Course, "id"> {}

export interface GetCourseResponse extends Course {}

courseRouter.get("/:id", async (req, res) => {
  const { id } = req.params as GetCourseRequest;

  const course = await getData<Course>({
    collection: "courses",
    doc: id,
  });

  if (!course) {
    return res.sendStatus(404);
  }

  res.send(course);
});

export default courseRouter;
