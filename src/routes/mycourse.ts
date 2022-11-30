import { Router } from "express";
import { Course } from "../interfaces/Course";
import { deleteData, listData, postData } from "../utils/firebase";

const myCourseRouter = Router();

/**
 * 수강 신청
 */
export interface ApplyRequest extends Pick<Course, "id"> {}

export type ApplyResponse = Course[];

myCourseRouter.post("/", async (req, res) => {
  const { id } = req.body as ApplyRequest;

  await postData<ApplyRequest>({
    collection: "mycourses",
    doc: id,
    data: { id },
  });

  res.sendStatus(200);
});

/**
 * 수강 취소
 */
export interface WithdrawRequest extends Pick<Course, "id"> {}

export type WithdrawResponse = Course[];

myCourseRouter.delete("/:id", async (req, res) => {
  const { id } = req.params as WithdrawRequest;

  await deleteData({ collection: "mycourses", doc: id });

  res.sendStatus(200);
});

/**
 * 신청 내역 목록 가져오기
 */
export type GetAppliedCoursesRequest = void;

export interface GetAppliedCoursesResponse extends Array<Course> {}

myCourseRouter.get("/", async (req, res) => {
  const myCourses = await listData<Course>({
    collection: "mycourses",
  });

  res.send(myCourses);
});

export default myCourseRouter;
