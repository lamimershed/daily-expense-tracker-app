import { cn } from "@/utils/cn";

const LoadingUI = ({
  error,
  message,
}: {
  error?: "ERROR" | "NODATA" | boolean;
  message?: string;
}) => {
  if (error) {
    return (
      <div className="w-full flex justify-center items-center h-[100px] overflow-scroll">
        <div className="flex flex-col">
          <button
            type="button"
            className="bg-blue-600 text-white  px-[20px] items-center rounded-md flex gap-[10px] justify-center"
            disabled
          >
            <div
              className={cn(
                "w-[10px] h-[10px] animate-spin bg-white",
                error && "animate-none bg-red-500",
              )}
            ></div>
            {error === true && "something went wrong ....."}
            {error === "NODATA" && "No data found"}
          </button>
          <p className="text-sm text-center">{message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center items-center h-[100px]">
      <button
        type="button"
        className="bg-blue-600 text-white  px-[20px] items-center rounded-md flex gap-[10px] justify-center"
        disabled
      >
        <div className="w-[10px] h-[10px] animate-spin bg-white"></div>
        Loading...
      </button>
    </div>
  );
};

export default LoadingUI;
