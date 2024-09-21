const SignupStepThree = () => {
  return (
    <div className="mt-[120px]">
      <h1 className="mb-[40px] text-center text-[40px] font-semibold text-[#1877F2]">
        Tell us about your Facility
      </h1>
      <form className="relative mx-auto mt-[30px] flex w-[500px] flex-col gap-[40px]">
        {/* absoulte element */}
        <div className="absolute left-[-80px] top-[0px] flex flex-col items-center">
          <p className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[#FFC560]">
            4
          </p>
          <div className="h-[135px] border-l-[3px] border-dashed border-[#FFC560]"></div>
          <p className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[#FFC560]">
            5
          </p>
        </div>
        <label className="text-[24px] font-medium text-[#172B4D]">
          What is the name of your facility?
        </label>
        <input
          type="text"
          id="Facility name"
          className="h-[60px] w-full rounded-[12px] border border-[#E4E4E4] px-[20px] placeholder:text-[#8897AD] focus:outline-none"
          placeholder="Facility name"
        />
        <label className="text-[24px] font-medium text-[#172B4D]">
          Where is it located?
        </label>
        <input
          type="text"
          id="Search Location"
          className="h-[60px] w-full rounded-[12px] border border-[#E4E4E4] px-[20px] placeholder:text-[#8897AD] focus:outline-none"
          placeholder="Search Location"
        />
        {/* Do you serve international patrons at this facility ? */}
        <label className="text-[16px] text-[#172B4D]">
          Do you serve international patrons at this facility ?
        </label>
        {/* radio button */}
        {/* <div className='flex gap-[20px]'> */}
        {/* <button className='flex h-[110px] w-[140px] items-center justify-center rounded-[16px] px-[30px] text-[#020202] shadow-[0px_0px_5px_#00000030]'>
            Yes
          </button>
          <button className='flex h-[110px] w-[140px] items-center justify-center rounded-[16px] px-[30px] text-[#020202] shadow-[0px_0px_5px_#00000030]'>
            No
          </button> */}
        <div className="flex items-center gap-[20px]">
          <input
            type="radio"
            id="yes"
            name="international"
            value="yes"
            className="accent-[#1877F2]"
          />
          <label htmlFor="yes">Yes</label>
          <input type="radio" id="no" name="international" value="no" />
          <label htmlFor="no">No</label>
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

export default SignupStepThree;
