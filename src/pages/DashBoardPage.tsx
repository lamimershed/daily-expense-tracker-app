import ExpenseTableSection from "@/sections/ExpenseTableSection";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AddNewTransactionForm from "@/components/forms/AddNewTransactionForm";
import { useGetTotalExpense, useGetTotalIncome } from "@/service/userService";
import LoadingUI from "@/components/common/LoadingUI";

const DashBoardPage = () => {
  const totalIncome = useGetTotalIncome();
  const totalExpense = useGetTotalExpense();

  return (
    <div className="p-4 xl:p-8 flex flex-col gap-8">
      {totalIncome?.isLoading ? (
        <LoadingUI />
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <Card
            heading="Total Income "
            amount={totalIncome?.data?.data().total! ?? 0}
            buttonTitle="Add Income"
            form={<AddNewTransactionForm formType="INCOME" />}
          />
          <Card
            heading="Total Expense"
            amount={totalExpense?.data?.data()?.totalIncome ?? 0}
            buttonTitle="Add Expense"
            form={<AddNewTransactionForm formType="EXPENSE" />}
          />
          <Card
            heading="Balance"
            amount={
              totalIncome?.data?.data().total! -
                totalExpense?.data?.data()?.totalIncome! ?? 0
            }
            buttonTitle="Add Transaction"
          />
        </div>
      )}
      <ExpenseTableSection />
    </div>
  );
};

export default DashBoardPage;

const Card = ({
  heading,
  amount,
  buttonTitle,
  form,
}: {
  heading: string;
  amount: number;
  buttonTitle: string;
  form?: React.ReactNode;
}) => {
  return (
    <div className="bg-white shadow-[0px_0px_20px_#00000040] p-4 rounded-md gap-3 flex flex-col">
      <h1 className="text-xl font-medium text-gray-800">{heading}</h1>
      <p className="text-md text-gray-800">{amount}</p>
      {!!form && (
        <Dialog>
          <DialogTrigger asChild>
            <button className="bg-blue-600 w-full text-white p-2 rounded-md">
              {buttonTitle}
            </button>
          </DialogTrigger>
          <DialogContent className="xl:w-[400px] p-5">{form}</DialogContent>
        </Dialog>
      )}
    </div>
  );
};
