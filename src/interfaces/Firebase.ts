import type {
  DocumentData,
  WithFieldValue,
  WhereFilterOp,
  Query as QueryObject,
} from "firebase-admin/firestore";

export type Query = [string, WhereFilterOp, any];

export type QueryRef = QueryObject<DocumentData>;

export type Data = WithFieldValue<DocumentData>;
