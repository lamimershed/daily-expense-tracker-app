import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { DialogHeader, DialogTitle } from "../ui/dialog";
import DropDownComponent from "../common/DropDownComponent";
import DatePicker from "../common/DatePicker";
import { useAddNewTransaction } from "@/service/userService";
import { useQueryClient } from "@tanstack/react-query";

const AddNewTransactionFormSchema = z.object({
  date: z.date(),
  name: z
    .string()
    .min(3, "name must be more than 3 characters")
    .max(30, "name must be less than 30 characters"),
  // amout must be string or number
  amount: z
    .number({ message: "Amount is required" })
    .positive("Amount must be positive")
    .min(1, "Amount must be at least 1"),
  tag: z.string({ message: "please select tag" }),
  // type: z.enum(["Income"]),
});

export type TaddNewTransactionFormSchema = z.infer<
  typeof AddNewTransactionFormSchema
>;

const AddNewTransactionForm = ({
  formType,
}: {
  formType: "INCOME" | "EXPENSE";
}) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TaddNewTransactionFormSchema>({
    resolver: zodResolver(AddNewTransactionFormSchema),
  });
  const queryClient = useQueryClient();
  const incomeTypes = [
    { id: 1, name: "Salary" },
    { id: 2, name: "Bonus" },
    { id: 3, name: "Investment" },
    { id: 4, name: "Rental Income" },
    { id: 5, name: "Other" },
  ];
  const expenseType = [
    { id: 1, name: "Rent" },
    { id: 2, name: "Food" },
    { id: 3, name: "Travel" },
    { id: 4, name: "Cosmetics" },
    { id: 5, name: "Bills" },
    { id: 6, name: "Other" },
  ];

  const addNewTransaction = useAddNewTransaction();
  const onSubmit = (data: TaddNewTransactionFormSchema) => {
    addNewTransaction.mutate(
      {
        ...data,
        type: formType === "INCOME" ? "Income" : "Expense",
      },
      {
        onSuccess() {
          reset();
          queryClient?.invalidateQueries({
            queryKey: ["get-transcation-data"],
          });
        },
      },
    );
  };
  return (
    <div className="flex flex-col w-full max-w-[400px] bg-white rounded-lg">
      <DialogHeader>
        <DialogTitle className="text-center text-xl border-b border-gray-300 pb-3">
          {formType === "INCOME" ? "Add Income" : "Add Expense"}
        </DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-4">
        <div>
          <label htmlFor="name" className="mb-2 block text-gray-800">
            Date
          </label>
          <Controller
            control={control}
            name="date"
            render={({ field: { onChange, value } }) => (
              <DatePicker
                date={value ? new Date(value) : undefined}
                setDate={(date) => {
                  onChange(date);
                }}
              />
            )}
          />
          <p className="h-[20px] text-[12px] text-[#FF0000]">
            {errors?.date ? errors?.date?.message : ""}
          </p>
        </div>
        <div>
          <label htmlFor="name" className="mb-2 block text-gray-800">
            Name
          </label>
          <input
            type="text"
            placeholder="Name"
            className="p-2 rounded-md border w-full border-gray-300"
            {...register("name")}
          />
          <p className="h-[20px] text-[12px] text-[#FF0000]">
            {errors?.name ? errors?.name?.message : ""}
          </p>
        </div>
        <div>
          <label htmlFor="amount" className="mb-2 block text-gray-800">
            Amount
          </label>
          <input
            type="number"
            placeholder="Amount"
            className="p-2 rounded-md border w-full border-gray-300"
            {...register("amount", { valueAsNumber: true })}
          />
          <p className="h-[20px] text-[12px] text-[#FF0000]">
            {errors?.amount ? errors?.amount?.message : ""}
          </p>
        </div>
        <div>
          <label htmlFor="tag" className="mb-2 block text-gray-800">
            Tag
          </label>
          <Controller
            control={control}
            name="tag"
            render={({ field: { onChange, value } }) => (
              <DropDownComponent
                options={formType === "INCOME" ? incomeTypes : expenseType}
                className=""
                value={value ? watch("tag") + "" : undefined}
                placeholder="Select Tag"
                onChange={(values) => {
                  onChange(values);
                }}
                name="tag"
              />
            )}
          />
          <p className="h-[20px] text-[12px] text-[#FF0000]">
            {errors?.tag ? errors?.tag?.message : ""}
          </p>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white p-2 rounded-md"
        >
          {formType === "INCOME" ? "Add Income" : "Add Expense"}
        </button>
      </form>
    </div>
  );
};

export default AddNewTransactionForm;
