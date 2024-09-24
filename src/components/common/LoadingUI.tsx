const LoadingUI = ({
  error,
  message,
}: {
  error?: boolean;
  message?: string;
}) => {
  if (error) {
    return (
      <div className="w-full flex justify-center items-center h-[100px]">
        <div className="flex flex-col">
          <button
            type="button"
            className="bg-blue-600 text-white  px-[20px] items-center rounded-md flex gap-[10px] justify-center"
            disabled
          >
            <div className="w-[10px] h-[10px] animate-spin bg-white"></div>
            something went wrong .....
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
