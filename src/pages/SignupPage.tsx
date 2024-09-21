import { Link } from "react-router-dom";

const SignupPage = () => {
  return (
    <div className="mx-auto flex h-[90vh] flex-col items-center justify-center">
      <div className="relative mt-[0px] flex w-[400px] flex-col gap-[20px]">
        <h1 className="text-center text-[36px] font-semibold text-[#0C1421]">
          Sign up
        </h1>
        <form className="flex flex-col gap-[20px]">
          <div>
            <label
              htmlFor="name"
              className="mb-[10px] block text-[16px] text-[#0C1421]"
            >
              full Name
            </label>
            <input
              type="text"
              id="username"
              className="h-[50px] w-full rounded-[12px] border border-[#E4E4E4] px-[20px] placeholder:text-[#8897AD] focus:outline-none"
              placeholder="email or username"
            />
          </div>
          <div>
            <label
              htmlFor="role"
              className="mb-[10px] block text-[16px] text-[#0C1421]"
            >
              specify Profession/Job
            </label>
            <input
              type="email"
              id="email"
              className="h-[50px] w-full rounded-[12px] border border-[#E4E4E4] px-[20px] placeholder:text-[#8897AD] focus:outline-none"
              placeholder="email"
            />
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
            />
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
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-[10px] block text-[16px] text-[#0C1421]"
            >
              Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="h-[50px] w-full rounded-[12px] border border-[#E4E4E4] px-[20px] placeholder:text-[#8897AD] focus:outline-none"
              placeholder="At least 8 characters"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-[12px] bg-blue-600 p-[16px] text-[16px] font-semibold text-white focus:outline-none"
          >
            Sign up
          </button>
        </form>
        {/* Don't you have an account? Sign in */}
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
