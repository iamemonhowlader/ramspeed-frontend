import Image from "next/image";

const B2BLoginImage = () => {
  return (
    <div className="lg:w-1/2">
      <Image
        src="/b2blogin.png"
        alt="Login"
        width={500}
        height={500}
        className="h-full w-full max-h-[866px] object-cover"
      />
    </div>
  );
};

export default B2BLoginImage;
