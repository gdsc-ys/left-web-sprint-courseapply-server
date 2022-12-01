import { initializeApp, cert, type ServiceAccount } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";
import serviceAccount from "../data/serviceAccount.json";
import type { Data, Query, QueryRef } from "../interfaces/Firebase";

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
  queries?: Query[];
}) => {
  validateDB();

  const ref = db.collection(collection);
  const queryRef = queries
    ? queries.reduce((ref, query) => ref.where(...query), ref as QueryRef)
    : ref;

  const snapshot = await queryRef.get();

  const data = snapshot.docs.map((doc) => doc.data() as T);

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

  await ref.set(data as Data);
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
