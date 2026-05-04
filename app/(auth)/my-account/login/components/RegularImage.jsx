import Image from "next/image";

const RegularLoginImage = () => {
  return (
    <div className="lg:w-1/2">
      <Image
        src="/retaillogin.png"
        alt="Login"
        width={500}
        height={500}
        className="h-full w-full max-h-[866px] object-cover"
      />
    </div>
  );
};

export default RegularLoginImage;
