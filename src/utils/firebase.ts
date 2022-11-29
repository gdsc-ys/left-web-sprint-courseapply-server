import { initializeApp, cert, type ServiceAccount } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";
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

export const postData = () => {
  validateDB();
};
