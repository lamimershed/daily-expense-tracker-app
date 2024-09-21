const SignupStepTwo = () => {
  return (
    <div className="mt-[120px]">
      <h1 className="mb-[40px] text-center text-[40px] font-semibold text-[#1877F2]">
        Tell us about your Organization
      </h1>
      <form className="relative mx-auto mt-[30px] flex w-[500px] flex-col gap-[40px]">
        {/* absoulte element */}
        <div className="absolute left-[-80px] top-[0px] flex flex-col items-center">
          <p className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[#FFC560]">
            2
          </p>
          <div className="h-[135px] border-l-[3px] border-dashed border-[#FFC560]"></div>
          <p className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[#FFC560]">
            3
          </p>
        </div>
        <label className="text-[24px] font-medium text-[#172B4D]">
          What is the name of your organization?
        </label>
        <input
          type="text"
          id="organization"
          className="h-[60px] w-full rounded-[12px] border border-[#E4E4E4] px-[20px] placeholder:text-[#8897AD] focus:outline-none"
          placeholder="Organization name"
        />
        <label className="text-[24px] font-medium text-[#172B4D]">
          How does your organization operate?
        </label>
        {/* redio button */}
        <div className="flex gap-[20px]">
          <button className="flex h-[110px] w-[140px] items-center justify-center rounded-[16px] px-[30px] text-[#020202] shadow-[0px_0px_5px_#00000030]">
            Single Location
          </button>
          <button className="flex h-[110px] w-[140px] items-center justify-center rounded-[16px] px-[30px] text-[#020202] shadow-[0px_0px_5px_#00000030]">
            Multiple Locations
          </button>
        </div>
        <div className="flex justify-end">
          <button className="h-[60px] w-[110px] rounded-[12px]">back</button>
          <button className="h-[60px] w-[110px] rounded-[12px] bg-[#1877F2] text-white">
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupStepTwo;
