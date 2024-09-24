// images
import { Link, Navigate, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSigninWithEmailPassword } from "@/service/userService";
import GoogleSigninButton from "@/components/common/GoogleSigninButton";
import { useUserStore } from "@/store/useUserStore";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z
    .string()
    .min(8, "Password must be more than 8 characters")
    .max(30, "Password must be less than 30 characters"),
});

export type TloginSchema = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const navigate = useNavigate();
  const { setUser, user } = useUserStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TloginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const login = useSigninWithEmailPassword();
  const onSubmit = async (data: TloginSchema) => {
    login.mutate(data, {
      onSuccess: (data) => {
        setUser(data?.user);
        reset();
        navigate("/", { replace: true });
      },
    });
  };

  if (user) {
    return <Navigate to={"/"} replace />;
  }

  if (login.isPending) {
    return <div>loading</div>;
  }

  return (
    <div className="flex justify-center">
      <div className="flex h-[90vh] flex-col items-start justify-center">
        <h1 className="w-[400px] text-center text-[36px] font-semibold text-[#0C1421]">
          Welcome{" "}
        </h1>
        {/* form  */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-[40px] w-[400px]">
          <div className="">
            <label
              htmlFor="username"
              className="mb-[10px] block text-[16px] text-[#0C1421]"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="h-[60px] w-full rounded-[12px] border border-[#E4E4E4] px-[20px] placeholder:text-[#8897AD] focus:outline-none"
              placeholder="email or username"
              {...register("email")}
            />

            <p className="h-[20px] text-[12px] text-[#FF0000]">
              {errors.email ? errors?.email?.message : ""}
            </p>
          </div>
          <div className="">
            <label
              htmlFor="password"
              className="mb-[10px] block text-[16px] text-black"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="h-[60px] w-full rounded-[12px] border border-[#E4E4E4] px-[20px] placeholder:text-[#8897AD] focus:outline-none"
              placeholder="At least 8 characters"
              {...register("password")}
            />
            <p className="h-[20px] text-[12px] text-[#FF0000]">
              {errors?.password ? errors?.password?.message : ""}
            </p>
          </div>
          {/* forgot password feature in progress */}
          {/* <Link
            to="/sign-up"
            className="my-[16px] flex justify-center text-[16px] text-[#1877F2] hover:underline"
          >
            Forgot password?
          </Link> */}
          <button
            disabled={isSubmitting}
            type="submit"
            className="w-full rounded-[12px] bg-blue-600 p-[16px] text-[16px] font-semibold text-white focus:outline-none disabled:opacity-50"
          >
            Sign in
          </button>
        </form>
        {/* divider */}
        <div className="my-[30px] flex w-[400px] items-center gap-[20px] text-[#294957]">
          <div className="h-[1px] w-full bg-[#CFDFE2]"></div>
          or
          <div className="h-[1px] w-full bg-[#CFDFE2]"></div>
        </div>
        <GoogleSigninButton />
        {/* sign up */}
        <div className="flex w-[400px] justify-center">
          <p className="text-[16px] text-[#0C1421]">
            {`Don't have an account? `}
            <Link
              to="/sign-up"
              className="text-[16px] text-blue-600 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
