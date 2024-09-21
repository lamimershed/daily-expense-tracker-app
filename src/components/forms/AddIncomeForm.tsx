import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { DialogHeader, DialogTitle } from "../ui/dialog";
import DropDownComponent from "../common/DropDownComponent";
import DatePicker from "../common/DatePicker";

// input types for the form
// date - string
// name - string
// type - string
// amount - number
// tag - string
const AddIncomeFormSchema = z.object({
  date: z.date(),
  name: z
    .string()
    .min(3, "name must be more than 3 characters")
    .max(30, "name must be less than 30 characters"),
  // amout must be string or number
  amount: z.string({ message: "amount is required" }),
  tag: z.number({ message: "please select role" }),
});

type TAddIncomeFormSchema = z.infer<typeof AddIncomeFormSchema>;

const AddIncomeForm = () => {
  // const [date, setDate] = useState<Date | undefined>(new Date());
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TAddIncomeFormSchema>({
    resolver: zodResolver(AddIncomeFormSchema),
  });
  const dataOptions = [
    { id: 1, name: "lami" },
    { id: 2, name: "mershed" },
    { id: 4, name: "tp" },
    { id: 3, name: "mohammed" },
  ];
  return (
    <div className="flex flex-col w-full max-w-[400px] bg-white rounded-lg">
      <DialogHeader>
        <DialogTitle className="text-center text-xl border-b border-gray-300 pb-3">
          Add Income
        </DialogTitle>
      </DialogHeader>
      <form
        onSubmit={handleSubmit((data) => {
          // console.log(data);
          data;
          reset();
        })}
        className="flex flex-col mt-4"
      >
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
            {...register("amount")}
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
                options={dataOptions}
                className=""
                value={value ? watch("tag") + "" : undefined}
                placeholder="Select Tag"
                onChange={(values) => {
                  onChange(+values);
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
          Add Income
        </button>
      </form>
    </div>
  );
};

export default AddIncomeForm;
