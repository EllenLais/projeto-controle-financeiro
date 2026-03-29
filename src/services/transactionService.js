import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  where
} from "firebase/firestore";
import { db } from "../lib/firebase";

const transactionsCollection = collection(db, "transactions");

export function subscribeToTransactions(userId, onData, onError) {
  const transactionsQuery = query(transactionsCollection, where("userId", "==", userId));

  return onSnapshot(
    transactionsQuery,
    (snapshot) => {
      const transactions = snapshot.docs
        .filter((currentDoc) => !currentDoc.metadata.hasPendingWrites)
        .map((currentDoc) => ({
          id: currentDoc.id,
          ...currentDoc.data()
        }));

      onData(transactions);
    },
    onError
  );
}

export async function createTransaction(userId, data) {
  return addDoc(transactionsCollection, {
    userId,
    type: data.type,
    amount: data.amount,
    category: data.category,
    date: data.date,
    createdAt: serverTimestamp()
  });
}

export async function removeTransaction(transactionId) {
  return deleteDoc(doc(db, "transactions", transactionId));
}
