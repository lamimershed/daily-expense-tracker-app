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

export const useUserSignup = () => {
  return useMutation({
    mutationFn: async (postdata: TSignupSchema) => {
      const { email, password } = postdata;
      const data = await createUserWithEmailAndPassword(auth, email, password);
      return data;
    },
  });
};
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

export const useSigninWithEmailPassword = () => {
  return useMutation({
    mutationFn: async (postdata: TloginSchema) => {
      const { email, password } = postdata;
      const data = await signInWithEmailAndPassword(auth, email, password);
      return data;
    },
  });
};
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
    //  85:5  error  The following dependencies are missing in your queryKey: user.uid  @tanstack/qu

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

// export const useGetTransactionData = () => {
//   // const { user } = useUserStore();
//   // const q = query(
//   //   collection(db, `users/${user?.uid}/transactions`),
//   //   where("type", "==", "Expense")
//   // );
//   return useMutation({
//     mutationKey: ["get-transcation-data"],
//     mutationFn: async (q: Query<DocumentData, DocumentData>) => {
//       return await getDocs(q);
//     },
//   });
// };
export const useGetTransactionData = (
  q: Query<DocumentData, DocumentData>,
  userid: string | undefined,
) => {
  return useQuery({
    queryKey: ["get-transcation-data", q, userid],
    queryFn: async () => {
      if (!userid) {
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
    enabled: !!userid,
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
    queryKey: ["get-ai-response", jsonData],
    queryFn: async () => {
      const data = await getOpenAIResponse(
        `Here is my transaction data in json. Please generate a report 
        analyzing my income and expenses, pinpoint areas where 
        expense management could be improved, and offer actionable recommendations as summery${jsonData}`,
      );
      return data;
    },
    enabled: !!jsonData,
  });
};
