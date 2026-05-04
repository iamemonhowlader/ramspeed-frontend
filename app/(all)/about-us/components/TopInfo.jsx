import Image from "next/image";

const TopInfo = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-10 sm:gap-25 py-8 sm:py-12">
        <div className="w-full sm:w-1/2">
          <h1 className="text-3xl md:text-5xl font-bold text-black mb-6 sm:mb-10 leading-10 md:leading-[64px]">
            <span className="text-primary">Ramspeed </span>, Exclusive
            electronics retail shop in the world.
          </h1>
          <p className=" text-xl leading-[36px] text-justify">
            Pellentesque ultrices, dui vel hendrerit iaculis, ipsum velit
            vestibulum risus, ac tincidunt diam lectus id magna. Praesent
            maximus lobortis neque sit amet rhoncus. Nullam tempus lectus a dui
            aliquet, non ultricies nibh elementum. Nulla ac nulla dolor.{" "}
          </p>
        </div>
        <div className="w-1/2">
          <Image
            src="/about-1.png"
            alt="About Us"
            width={500}
            height={500}
            className="max-h-[620px] w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
      {/* Second Info  */}

      <div className="flex flex-col sm:flex-row-reverse justify-between items-center gap-10 sm:gap-25 py-8 sm:py-12">
        <div className="w-full sm:w-1/2">
          <h1 className="text-3xl md:text-5xl font-bold text-black mb-6 sm:mb-10 leading-10 md:leading-[64px]">
            <span className="text-primary">Who </span>
            we are
          </h1>
          <p className=" text-xl leading-[36px] text-justify">
            Pellentesque ultrices, dui vel hendrerit iaculis, ipsum velit
            vestibulum risus, ac tincidunt diam lectus id magna. Praesent
            maximus lobortis neque sit amet rhoncus. Nullam tempus lectus a dui
            aliquet, non ultricies nibh elementum. Nulla ac nulla dolor.
          </p>
        </div>
        <div className="w-1/2">
          <Image
            src="/about-2.png"
            alt="About Us"
            width={500}
            height={500}
            className="max-h-[620px] w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default TopInfo;
