import { DataTable } from "@/components/common/DataTable";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

const data = [
  {
    date: "2021-09-01",
    name: "John Doe",
    type: "Food",
    amount: "$100.00",
    tag: "Personal",
  },
  {
    date: "2021-09-02",
    name: "Jane Doe",
    type: "Transport",
    amount: "$200.00",
    tag: "Business",
  },
  {
    date: "2021-09-03",
    name: "John Doe",
    type: "Food",
    amount: "$300.00",
    tag: "Personal",
  },
  {
    date: "2021-09-04",
    name: "Jane Doe",
    type: "Transport",
    amount: "$400.00",
    tag: "Business",
  },
  {
    date: "2021-09-04",
    name: "Jane Doe",
    type: "Transport",
    amount: "$400.00",
    tag: "Business",
  },
];

const ExpenseTableSection = () => {
  return (
    <>
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
            header: "Name",
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
        data={data}
      />
    </>
  );
};

export default ExpenseTableSection;
