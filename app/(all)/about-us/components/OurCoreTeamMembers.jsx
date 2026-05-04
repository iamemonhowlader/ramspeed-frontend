const OurCoreTeamMembers = () => {
  return (
    <div className="w-full">
      <div className="pb-8 sm:pb-12">
        {/* Title */}
        <h2 className="text-5xl font-black text-black  text-center">
          Our Core Team <span className="text-primary">Members</span>
        </h2>
      </div>
      {/* Team Members */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            className="bg-[#F7F7F7] flex flex-row items-center border border-[#e4e7e9] rounded-md gap-5 p-8"
            key={index}
          >
            <div className="w-16 h-16 rounded-full bg-[#E6E6E6]"></div>
            <div className="flex gap-2 flex-col">
              <h3 className="text-xl font-black text-black  capitalize">
                Kevin Gilbert
              </h3>
              <p className="text-md capitalize">Chief Executive Officer</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurCoreTeamMembers;
