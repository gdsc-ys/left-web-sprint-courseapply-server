import { initializeApp, cert, type ServiceAccount } from "firebase-admin/app";
import {
  type DocumentData,
  getFirestore,
  type WithFieldValue,
  type Firestore,
  type WhereFilterOp,
  type Query,
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
export const listData = async <T>({
  collection,
  queries,
}: {
  collection: string;
  queries?: [string, WhereFilterOp, any][];
}) => {
  validateDB();

  const ref = db.collection(collection);
  const queryRef = queries
    ? queries.reduce(
        (ref, query) => ref.where(...query),
        ref as Query<DocumentData>
      )
    : ref;

  const snapshot = await queryRef.get();

  const data: T[] = [];

  snapshot.forEach((doc) => {
    data.push(doc.data() as T);
  });

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
  const snapshot = await ref.get();
  const data = snapshot.data() as T;

  return data;
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
 * DELETE
 */
export const deleteData = async ({
  collection,
  doc,
}: {
  collection: string;
  doc: string;
}) => {
  validateDB();

  const ref = db.collection(collection).doc(doc);

  await ref.delete();
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
