import DatePicker from "@/components/common/DatePicker";
import LoadingUI from "@/components/common/LoadingUI";

import { db } from "@/firebase";
import { useGetAiResponse, useGetTransactionData } from "@/service/userService";
import { useUserStore } from "@/store/useUserStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { collection, orderBy, query, where } from "firebase/firestore";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Markdown from "react-markdown";
import { z } from "zod";

const addNewTransactionFormSchema = z.object({
  fromDate: z.date(),
  toDate: z.date(),
});

export type TaddNewTransactionFormSchema = z.infer<
  typeof addNewTransactionFormSchema
>;

const GenerateAiSummary = () => {
  const { user } = useUserStore();
  const [fetchQuery, setFetchQuery] = useState<any | undefined>(undefined);
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TaddNewTransactionFormSchema>({
    resolver: zodResolver(addNewTransactionFormSchema),
  });

  const onSubmit = (data: TaddNewTransactionFormSchema) => {
    const startOfDay = new Date(data?.fromDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(data?.toDate);
    endOfDay.setHours(23, 59, 59, 999);

    const transactionQuery = query(
      collection(db, `users/${user?.uid}/transactions`),
      where("date", ">=", startOfDay),
      where("date", "<=", endOfDay),
      orderBy("date"),
    );

    setFetchQuery(transactionQuery);

    queryClient.refetchQueries({
      queryKey: ["get-transaction-data", transactionQuery, user?.uid],
    });
  };

  const {
    data: transactions,
    isLoading,
    isError,
    error,
  } = useGetTransactionData(fetchQuery, user?.uid);

  const {
    data: aiFeedback,
    isLoading: chatLoading,
    isError: chatError,
  } = useGetAiResponse(JSON.stringify(transactions));

  if (isLoading || chatLoading) {
    return <LoadingUI />;
  }
  if (isError || chatError) {
    return (
      <LoadingUI error message={error?.message || "Something went wrong"} />
    );
  }

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex max-xl:flex-col items-center justify-between"
      >
        {/* Date range inputs */}
        <div className="w-[31%] max-xl:w-full">
          <label htmlFor="fromDate" className="mb-2 block text-gray-800">
            From Date
          </label>
          <Controller
            control={control}
            name="fromDate"
            render={({ field: { onChange, value } }) => (
              <DatePicker
                date={value ? new Date(value) : undefined}
                setDate={(date) => onChange(date)}
              />
            )}
          />
          <p className="h-[20px] text-[12px] text-[#FF0000]">
            {errors?.fromDate?.message || ""}
          </p>
        </div>
        <div className="w-[31%] max-xl:w-full">
          <label htmlFor="toDate" className="mb-2 block text-gray-800">
            To Date
          </label>
          <Controller
            control={control}
            name="toDate"
            render={({ field: { onChange, value } }) => (
              <DatePicker
                date={value ? new Date(value) : undefined}
                setDate={(date) => onChange(date)}
              />
            )}
          />
          <p className="h-[20px] text-[12px] text-[#FF0000]">
            {errors?.toDate?.message || ""}
          </p>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="bg-blue-600 max-xl:w-full w-[31%] h-[60px] text-white p-2 rounded-md"
        >
          Get AI Feedback
        </button>
      </form>

      {/* AI Feedback Output */}
      {fetchQuery ? (
        chatLoading ? (
          <LoadingUI />
        ) : chatError ? (
          <LoadingUI error message="Something went wrong" />
        ) : (
          <div className=" p-5 shadow-[0px_0px_10px_#00000040] rounded-xl">
            <h4 className="text-xl font-semibold text-gray-800 text-center mb-[15px]">
              AI Feedback
            </h4>
            <hr />
            <div className="mt-[20px]">
              <Markdown>{aiFeedback?.choices[0]?.message?.content}</Markdown>
            </div>
            <button
              disabled={isSubmitting}
              className="bg-blue-600 w-full text-white p-2 rounded-md mt-[20px]"
              onClick={() => {
                setFetchQuery(undefined);
                reset();
              }}
            >
              clear
            </button>
          </div>
        )
      ) : (
        ""
      )}
    </div>
  );
};

export default GenerateAiSummary;
