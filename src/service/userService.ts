import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  UserCredential,
} from "firebase/auth";
import { auth, db, provider } from "../firebase";
import { useMutation, useQuery } from "@tanstack/react-query";
import { TSignupSchema } from "@/pages/SignupPage";
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getAggregateFromServer,
  getDoc,
  getDocs,
  Query,
  query,
  setDoc,
  sum,
  where,
} from "firebase/firestore";
import { TloginSchema } from "@/pages/LoginPage";
import { useUserStore } from "@/store/useUserStore";
import { TaddNewTransactionFormSchema } from "@/components/forms/AddNewTransactionForm";
import { TtransactionData } from "@/sections/ExpenseTableSection";
import { format } from "date-fns";
import { getOpenAIResponse } from "./openai";

// signup user
export const useUserSignup = () => {
  return useMutation({
    mutationFn: async (postdata: TSignupSchema) => {
      const { email, password } = postdata;
      const data = await createUserWithEmailAndPassword(auth, email, password);
      return data;
    },
  });
};
// upload user details
export const useUploadUserDetails = () => {
  return useMutation({
    mutationKey: ["user-details"],
    mutationFn: async ({
      postdata,
      user,
    }: {
      postdata: TSignupSchema;
      user: UserCredential["user"];
    }) => {
      const { username, email, profession } = postdata;
      const userRef = doc(db, "users", user.uid);
      const data = await setDoc(userRef, {
        username: username,
        email,
        photoURL: "",
        createdAt: new Date(),
        profession,
      });
      return data;
    },
  });
};

// signin with email and password
export const useSigninWithEmailPassword = () => {
  return useMutation({
    mutationFn: async (postdata: TloginSchema) => {
      const { email, password } = postdata;
      const data = await signInWithEmailAndPassword(auth, email, password);
      return data;
    },
  });
};
// signin with google
export const useSignInWithGoogle = () => {
  return useMutation({
    mutationFn: async () => {
      const data = await signInWithPopup(auth, provider);
      return data;
    },
  });
};
// get user Details
export const useGetUserDetails = () => {
  const { user } = useUserStore();
  return useQuery({
    // eslint-disable-next-line
    queryKey: ["get-user-details", user?.uid],
    queryFn: async () => {
      if (!user?.uid) {
        return undefined;
      }
      const userRef = doc(db, "users", user.uid);
      try {
        const data = await getDoc(userRef);
        if (data?.exists()) return data;
        else {
          return undefined;
        }
      } catch (e) {
        throw new Error("Error fetching user details");
      }
    },
    enabled: !!user?.uid,
  });
};

// add transcation
export const useAddNewTransaction = () => {
  const { user } = useUserStore();
  const transcationRef = collection(db, `users/${user?.uid}/transactions`);
  return useMutation({
    mutationKey: ["add-new-transaction"],
    mutationFn: async (
      transaction: TaddNewTransactionFormSchema & {
        type: "Income" | "Expense";
      },
    ) => {
      const data = await addDoc(transcationRef, transaction);
      return data;
    },
  });
};
// get transcation data
export const useGetTransactionData = (
  q: Query<DocumentData, DocumentData> | undefined,
  userid: string | undefined,
) => {
  return useQuery({
    queryKey: ["get-transcation-data", q, userid],
    queryFn: async () => {
      if (!userid) {
        return undefined;
      }
      if (!q) {
        return undefined;
      }
      const data = await getDocs(q);
      const dataArr: TtransactionData = [];
      try {
        if (!data?.empty) {
          data?.forEach((doc) =>
            dataArr.push({
              ...doc?.data(),
              id: doc?.id,
              date: format(doc?.data()?.date.toDate(""), "dd-MM-yyyy"),
            } as TtransactionData[0]),
          );
          return dataArr;
        } else {
          if (data?.size === 0) throw new Error("No data found");
          // return undefined;
        }
      } catch (error) {
        throw new Error("No data found");
      }
    },
    enabled: !!userid && !!q,
  });
};
export const useGetTotalIncome = () => {
  const { user } = useUserStore();
  const coll = collection(db, `users/${user?.uid}/transactions`);
  const q = query(coll, where("type", "==", "Income"));
  return useQuery({
    queryKey: ["get-total-income-data", q],
    queryFn: async () =>
      await getAggregateFromServer(q, {
        total: sum("amount"),
      }),
    enabled: !!user?.uid,
  });
};
export const useGetTotalExpense = () => {
  const { user } = useUserStore();
  const coll = collection(db, `users/${user?.uid}/transactions`);
  const q = query(coll, where("type", "==", "Expense"));
  return useQuery({
    queryKey: ["get-total-expanse-data", q],
    queryFn: async () =>
      await getAggregateFromServer(q, {
        totalIncome: sum("amount"),
      }),
    enabled: !!user?.uid,
  });
};

export const useGetAiResponse = (jsonData: string) => {
  return useQuery({
    queryKey: ["get-ai-response", { jsonData }],
    queryFn: async () => {
      const data = await getOpenAIResponse(
        `Here is my transaction data in json. Please generate a report 
        analyzing my income and expenses, pinpoint areas where 
        expense management could be improved, and offer actionable recommendations as summery${jsonData}
        also limit the response to max_tokens: 500 make it lessthan 300 words and short also give in markdown format`,
      );
      return data;
    },
    enabled: !!jsonData,
  });
};
