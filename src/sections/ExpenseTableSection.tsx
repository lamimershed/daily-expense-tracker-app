import { DataTable } from "@/components/common/DataTable";
import LoadingUI from "@/components/common/LoadingUI";
import { Button } from "@/components/ui/button";
import { db } from "@/firebase";
import { useGetTransactionData } from "@/service/userService";
import { useUserStore } from "@/store/useUserStore";
import { collection, orderBy, query, where } from "firebase/firestore";
import { ArrowUpDown } from "lucide-react";
import { useState } from "react";

export type TtransactionData = {
  date: string;
  name: string;
  type: string;
  amount: string;
  tag: string;
  id: string;
}[];

const ExpenseTableSection = () => {
  const { user } = useUserStore();

  const getallDataQuery = query(
    collection(db, `users/${user?.uid}/transactions`),
  );

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(startOfDay);
  endOfDay.setDate(endOfDay.getDate() + 1);

  const getCurrentDayDataQuery = query(
    collection(db, `users/${user?.uid}/transactions`),
    where("date", ">=", startOfDay),
    where("date", "<=", endOfDay),
    orderBy("date"),
  );
  const startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 7);
  const getCurrentWeekDataQuery = query(
    collection(db, `users/${user?.uid}/transactions`),
    where("date", ">=", startOfWeek),
    where("date", "<=", endOfWeek),
    orderBy("date"),
  );
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const endOfMonth = new Date(startOfMonth);
  endOfMonth.setMonth(endOfMonth.getMonth() + 1);

  const getCurrentMonthDataQuery = query(
    collection(db, `users/${user?.uid}/transactions`),
    where("date", ">=", startOfMonth),
    where("date", "<=", endOfMonth),
    orderBy("date"),
  );
  const getIncomeDataQuery = query(
    collection(db, `users/${user?.uid}/transactions`),
    where("type", "==", "Income"),
    orderBy("date"),
  );
  const getExpenseDataQuery = query(
    collection(db, `users/${user?.uid}/transactions`),
    where("type", "==", "Expense"),
    orderBy("date"),
  );
  const [fetchQuery, setFetchQuery] = useState(getallDataQuery);

  const {
    data: tdata,
    isLoading,
    isError,
    error,
  } = useGetTransactionData(fetchQuery, user?.uid);

  // const { data: chat } = useGetAiResponse(JSON.stringify(tdata));

  if (isLoading) return <LoadingUI />;
  if (isError) {
    return <LoadingUI error message={error?.message} />;
  }
  return (
    <div className="flex flex-col">
      <h1 className="text-[30px] mb-[20px] font-semibold text-gray-800 text-center">
        Transactions
      </h1>
      <h2 className="text-[20px] font-semibold text-gray-800 text-center">
        Transaction Filters
      </h2>
      <div className=" flex justify-center max-xl:flex-wrap items-center gap-[20px] py-[20px]">
        <FilterButton
          title="All"
          onClick={() => setFetchQuery(getallDataQuery)}
        />
        <FilterButton
          title="Today"
          onClick={() => setFetchQuery(getCurrentDayDataQuery)}
        />
        <FilterButton
          title="This Week"
          onClick={() => setFetchQuery(getCurrentWeekDataQuery)}
        />
        <FilterButton
          title="This Month"
          onClick={() => setFetchQuery(getCurrentMonthDataQuery)}
        />
        <FilterButton
          title="Income"
          onClick={() => setFetchQuery(getIncomeDataQuery)}
        />
        <FilterButton
          title="Expense"
          onClick={() => setFetchQuery(getExpenseDataQuery)}
        />
      </div>
      <h2 className="text-[20px] font-semibold text-gray-800 text-center">
        Transaction Table
      </h2>
      <DataTable
        columns={[
          {
            accessorKey: "date",
            header: ({ column }) => {
              return (
                <Button
                  variant="ghost"
                  onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                  }
                >
                  Date
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              );
            },
          },
          {
            accessorKey: "name",
            // header: "Name",
            header: ({ column }) => {
              return (
                <Button
                  variant="ghost"
                  onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                  }
                >
                  Name
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              );
            },
          },
          {
            accessorKey: "type",
            header: "Type",
          },
          {
            accessorKey: "amount",
            header: "Amount",
          },
          {
            accessorKey: "tag",
            header: "Tag",
          },
        ]}
        data={tdata ?? []}
      />
    </div>
  );
};

export default ExpenseTableSection;

const FilterButton = ({
  title,
  onClick,
}: {
  title: string;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="p-[10px_14px] shadow-[0px_0px_5px_#00000040] rounded-lg"
    >
      {title}
    </button>
  );
};
