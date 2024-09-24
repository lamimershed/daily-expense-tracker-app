import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  // useSignInWithGoogle,
  useUploadUserDetails,
  useUserSignup,
} from "@/service/userService";
import GoogleSigninButton from "@/components/common/GoogleSigninButton";
import { useUserStore } from "@/store/useUserStore";

const signupSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
    username: z.string().min(3),
    profession: z.string().min(3),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "passwords do not match",
  });

export type TSignupSchema = z.infer<typeof signupSchema>;

const SignupPage = () => {
  const navigate = useNavigate();
  const { setUser, user } = useUserStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TSignupSchema>({
    resolver: zodResolver(signupSchema),
  });
  const userSignup = useUserSignup();
  const uploadUserDetails = useUploadUserDetails();
  // const signInWithGoogle = useSignInWithGoogle();

  const onSubmit = async (data: TSignupSchema) => {
    console.log(data);
    userSignup.mutate(data, {
      onSuccess: async (data, value) => {
        console.log(data);
        uploadUserDetails.mutate(
          { postdata: value, user: data.user },
          {
            onSuccess: () => {
              console.log(user);
              setUser(data.user);
              navigate("/", { replace: true });
              reset();
            },
          }
        );
      },
    });
  };

  // const handleSignInWithGoogle = () => {
  //   signInWithGoogle.mutate(void 0, {
  //     onSuccess: (data) => {
  //       uploadUserDetails.mutate(
  //         {
  //           postdata: {
  //             email: data.user.email!,
  //             username: data.user.displayName!,
  //             profession: "",
  //             password: "",
  //             confirmPassword: "",
  //           },
  //           user: data.user,
  //         },
  //         {
  //           onSuccess: () => {
  //             navigate("/", { replace: true });
  //             reset();
  //           },
  //         }
  //       );
  //     },
  //   });
  // };

  if (user) {
    return <Navigate to={"/"} replace />;
  }

  if (userSignup.isPending || uploadUserDetails.isPending) {
    return <div>loading</div>;
  }

  return (
    <div className="mx-auto flex h-[90vh] flex-col items-center justify-center">
      <div className="relative mt-[0px] flex w-[400px] flex-col gap-[20px]">
        <h1 className="text-center text-[36px] font-semibold text-[#0C1421]">
          Sign up
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-[0px]"
        >
          <div>
            <label
              htmlFor="username"
              className="mb-[10px] block text-[16px] text-[#0C1421]"
            >
              full Name
            </label>
            <input
              type="text"
              id="username"
              className="h-[50px] w-full rounded-[12px] border border-[#E4E4E4] px-[20px] placeholder:text-[#8897AD] focus:outline-none"
              placeholder="username"
              {...register("username")}
            />
            <p className="h-[20px] text-[12px] text-[#FF0000]">
              {errors?.username ? errors?.username?.message : ""}
            </p>
          </div>
          <div>
            <label
              htmlFor="profession"
              className="mb-[10px] block text-[16px] text-[#0C1421]"
            >
              specify Profession/Job
            </label>
            <input
              type="text"
              id="profession"
              className="h-[50px] w-full rounded-[12px] border border-[#E4E4E4] px-[20px] placeholder:text-[#8897AD] focus:outline-none"
              placeholder="Profession/Job"
              {...register("profession")}
            />
            <p className="h-[20px] text-[12px] text-[#FF0000]">
              {errors?.profession ? errors?.profession?.message : ""}
            </p>
          </div>
          <div>
            <label
              htmlFor="email"
              className="mb-[10px] block text-[16px] text-[#0C1421]"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="h-[50px] w-full rounded-[12px] border border-[#E4E4E4] px-[20px] placeholder:text-[#8897AD] focus:outline-none"
              placeholder="email"
              {...register("email")}
            />
            <p className="h-[20px] text-[12px] text-[#FF0000]">
              {errors?.email ? errors?.email?.message : ""}
            </p>
          </div>
          <div>
            <label
              htmlFor="password"
              className="mb-[10px] block text-[16px] text-[#0C1421]"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="h-[50px] w-full rounded-[12px] border border-[#E4E4E4] px-[20px] placeholder:text-[#8897AD] focus:outline-none"
              placeholder="At least 8 characters"
              {...register("password")}
            />
            <p className="h-[20px] text-[12px] text-[#FF0000]">
              {errors?.password ? errors?.password?.message : ""}
            </p>
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-[10px] block text-[16px] text-[#0C1421]"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="h-[50px] w-full rounded-[12px] border border-[#E4E4E4] px-[20px] placeholder:text-[#8897AD] focus:outline-none"
              placeholder="At least 8 characters"
              {...register("confirmPassword")}
            />
            <p className="h-[20px] text-[12px] text-[#FF0000]">
              {errors?.confirmPassword ? errors?.confirmPassword?.message : ""}
            </p>
          </div>

          <button
            disabled={isSubmitting}
            type="submit"
            className="w-full rounded-[12px] bg-blue-600 p-[16px] text-[16px] font-semibold text-white focus:outline-none"
          >
            Sign up
          </button>
        </form>
        {/* divider */}
        <div className="my-[30px] flex w-[400px] items-center gap-[20px] text-[#294957]">
          <div className="h-[1px] w-full bg-[#CFDFE2]"></div>
          or
          <div className="h-[1px] w-full bg-[#CFDFE2]"></div>
        </div>
        {/* <button
          className="w-full rounded-[12px] bg-blue-600 p-[16px] text-[16px] font-semibold text-white focus:outline-none"
          onClick={() => handleSignInWithGoogle()}
        >
          Sign Up with Google
        </button> */}
        <GoogleSigninButton />
        <div>
          <p className="text-center text-[16px] text-[#0C1421]">
            {`Don't you have an account? `}
            <Link
              to="/login"
              className="text-[16px] text-blue-600 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
