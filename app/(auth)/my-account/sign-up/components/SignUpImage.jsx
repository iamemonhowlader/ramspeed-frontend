import Image from "next/image";

const SignUpImage = () => {
  return (
    <div className="lg:w-1/2 hidden sm:block">
      <Image
        src="/signup.png"
        alt="Sign Up"
        width={500}
        height={500}
        className="h-full w-full max-h-full"
      />
    </div>
  );
};

export default SignUpImage;
