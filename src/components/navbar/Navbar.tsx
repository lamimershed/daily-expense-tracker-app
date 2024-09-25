import { useGetUserDetails, useLogout } from "@/service/userService";
import { useUserStore } from "@/store/useUserStore";
import LoadingUI from "../common/LoadingUI";
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const { toast } = useToast();
  const { user, setUser } = useUserStore();
  const { data, isLoading, isError } = useGetUserDetails();
  const logout = useLogout();

  if (isLoading) return <LoadingUI />;
  if (isError) {
    return <LoadingUI error />;
  }

  const handleLogout = () => {
    logout.mutate(void 0, {
      onSuccess: () => {
        setUser(undefined);
        toast({
          title: "Success",
          description: "User logged out successfully",
        });
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error?.message,
        });
      },
    });
  };
  return (
    <nav className="h-[7vh] w-full bg-blue-600 px-[20px]">
      <div className="flex h-full w-full items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-[20px] max-xl:text-[16px] font-semibold text-white">
            Expense Tracker
          </h1>
        </div>
        <div className="flex items-center gap-[20px]">
          {user?.uid && (
            <>
              <p className="text-sm text-white text-nowrap line-clamp-1">
                Hi {user?.displayName ?? data?.data()?.username} !
              </p>
              <button
                className="text-blue-600 bg-white rounded-sm p-[4px_10px]"
                onClick={() => handleLogout()}
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
