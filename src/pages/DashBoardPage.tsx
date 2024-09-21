import ExpenseTableSection from "@/sections/ExpenseTableSection";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
import AddIncomeForm from "@/components/forms/AddIncomeForm";
import AddExpenseForm from "@/components/forms/AddExpenseForm";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const DashBoardPage = () => {
  return (
    <div className="p-4 xl:p-8 flex flex-col gap-8">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card
          heading="Total Income "
          amount={2000}
          buttonTitle="Add Income"
          form={<AddIncomeForm />}
        />
        <Card
          heading="Total Expense"
          amount={1000}
          buttonTitle="Add Expense"
          form={<AddExpenseForm />}
        />
        <Card
          heading="Balance"
          amount={1000}
          buttonTitle="Add Transaction"
          form={<div>Form</div>}
        />
      </div>
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
  amount: number | string;
  buttonTitle: string;
  form: React.ReactNode;
}) => {
  return (
    <div className="bg-white shadow-[0px_0px_20px_#00000040] p-4 rounded-md gap-3 flex flex-col">
      <h1 className="text-xl font-medium text-gray-800">{heading}</h1>
      <p className="text-md text-gray-800">{amount}</p>
      <Dialog>
        <DialogTrigger asChild>
          <button className="bg-blue-600 w-full text-white p-2 rounded-md">
            {buttonTitle}
          </button>
        </DialogTrigger>
        <DialogContent className="xl:w-[400px] p-5">{form}</DialogContent>
      </Dialog>
    </div>
  );
};
