import { useGetUserDetails } from "@/service/userService";
import { useUserStore } from "@/store/useUserStore";
import LoadingUI from "../common/LoadingUI";

const Navbar = () => {
  const { user, setUser } = useUserStore();
  const { data, isLoading, isError } = useGetUserDetails();

  if (isLoading) return <LoadingUI />;
  if (isError) {
    return <LoadingUI error />;
  }
  return (
    <nav className="h-[7vh] w-full bg-blue-600 px-[20px]">
      <div className="flex h-full w-full items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-[20px] font-semibold text-white">
            Expense Tracker
          </h1>
        </div>
        <div className="flex items-center gap-[20px]">
          {user?.uid && (
            <>
              <p className="text-sm text-white">
                Hi {user?.displayName ?? data?.data()?.username} !
              </p>
              <button
                className="text-blue-600 bg-white rounded-sm p-[4px_10px]"
                onClick={() => setUser(undefined)}
              >
                logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
