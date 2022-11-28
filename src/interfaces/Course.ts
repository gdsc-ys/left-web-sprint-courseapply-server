import { DayOfWeek } from "./Date";

export enum Degree {
  UNDERGRADUATE = "학부",
  GRADUATE = "대학원",
}

export interface CourseTime {
  dayOfWeek: DayOfWeek; // 요일
  startPeriod: number; // 시작 교시 (0 ~ 13)
  endPeriod: number; // 종료 교시 (0 ~ 13)
}

export interface Course {
  id: string; // 학정번호

  name: string; // 과목명
  degree: Degree; // 학위
  college: string; // 단과대
  major: string; // 전공
  professor: string; // 교수님
  times: CourseTime[]; // 수업 시간
  classroom: string; // 강의실
  personnel: number; // 정원
  credit: number; //학점
}
