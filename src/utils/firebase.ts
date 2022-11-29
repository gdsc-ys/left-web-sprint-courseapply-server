import { initializeApp, cert, type ServiceAccount } from "firebase-admin/app";
import {
  type DocumentData,
  getFirestore,
  type WithFieldValue,
  type Firestore,
} from "firebase-admin/firestore";
import serviceAccount from "../data/serviceAccount.json";

let db: Firestore;

export const initializeFirebase = () => {
  initializeApp({
    credential: cert(serviceAccount as ServiceAccount),
  });

  db = getFirestore();
};

const validateDB = () => {
  if (!db) {
    throw Error("Database is NOT intialized!");
  }
};

/**
 * LIST
 */
export const listData = async ({ collection }: { collection: string }) => {
  validateDB();

  const ref = db.collection(collection);
  const data = await ref.get();

  return data;
};

/**
 * GET
 */
export const getData = async <T>({
  collection,
  doc,
}: {
  collection: string;
  doc: string;
}) => {
  validateDB();

  const ref = db.collection(collection).doc(doc);
  const data = await ref.get();

  return data.data() as T;
};

/**
 * POST
 */
export const postData = async <T>({
  collection,
  doc,
  data,
}: {
  collection: string;
  doc: string;
  data: T;
}) => {
  validateDB();

  const ref = db.collection(collection).doc(doc);

  await ref.set(data as WithFieldValue<DocumentData>);
};

/**
 * example
 * {
    id: "CSI2011",
    name: "CSI2011",
    degree: Degree.UNDERGRADUATE,
    college: "공과대학",
    major: "컴퓨터과학과",
    professor: "교수님",
    times: [{ dayOfWeek: DayOfWeek.MONDAY, startPeriod: 1, endPeriod: 3 }],
    classroom: "공A000",
    personnel: 70,
    credit: 3,
  }
 */
