import { initializeApp, credential, type ServiceAccount } from "firebase-admin";
import serviceAccount from "../data/serviceAccount.json";

export const initializeFirebase = () => {
  initializeApp({
    credential: credential.cert(serviceAccount as ServiceAccount),
  });
};
