import Image from "next/image";
const companyLogos = [
  "slack",
  "framer",
  "netflix",
  "google",
  "linkedin",
  "instagram",
  "facebook",
  "slack",
  "framer",
  "netflix",
  "google",
];
const Ticker = () => {
  return (
    <div className="overflow-hidden w-full relative max-w-8xl mx-auto select-none">
      <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />

      <div className="flex marquee-inner will-change-transform max-w-8xl mx-auto">
        {[...companyLogos, ...companyLogos].map((company, index) => (
          <Image
            width={300}
            height={300}
            key={index}
            className="mx-4 md:mx-8"
            src={`https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/${company}.svg`}
            alt={company}
          />
        ))}
      </div>

      <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
    </div>
  );
};

export default Ticker;
