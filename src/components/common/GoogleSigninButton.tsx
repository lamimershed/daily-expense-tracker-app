import {
  useSignInWithGoogle,
  useUploadUserDetails,
} from "@/service/userService";
import { useUserStore } from "@/store/useUserStore";
import { useNavigate } from "react-router-dom";
const GoogleSigninButton = () => {
  const navigate = useNavigate();
  const { setUser } = useUserStore();
  const signInWithGoogle = useSignInWithGoogle();
  const uploadUserDetails = useUploadUserDetails();
  const handleSignInWithGoogle = () => {
    signInWithGoogle.mutate(void 0, {
      onSuccess: (data) => {
        setUser(data?.user);
        uploadUserDetails.mutate(
          {
            postdata: {
              email: data.user.email!,
              username: data.user.displayName!,
              profession: "",
              password: "",
              confirmPassword: "",
            },
            user: data.user,
          },
          {
            onSuccess: () => {
              navigate("/", { replace: true });
            },
          }
        );
      },
    });
  };
  return (
    <button
      className="w-full rounded-[12px] bg-blue-600 p-[16px] text-[16px] font-semibold text-white focus:outline-none"
      onClick={() => handleSignInWithGoogle()}
    >
      Sign Up with Google
    </button>
  );
};

export default GoogleSigninButton;
