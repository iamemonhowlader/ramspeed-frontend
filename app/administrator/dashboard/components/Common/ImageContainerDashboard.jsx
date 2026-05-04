import { cn } from "@/lib/utils";
import Image from "next/image";

function ImageContainerDashboard({
  image,
  bg = "white",
  children,
  title,
  subtitle,
  className,
}) {
  return (
    <div className="relative w-full h-full py-15 px-3">
      {/* Background image layer */}
      <div className="absolute inset-0">
        <Image
          src={image || "/dashboard/image1.png"}
          alt="Background"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* Optional dark overlay */}
      <div className="absolute inset-0 bg-black/40 z-[5]" />

      {/* Foreground content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
        <div
          className={cn(
            "rounded-xl px-4 lg:px-20 py-4 md:py-15 text-[#101828] max-w-max",
            className
          )}
          style={{ backgroundColor: bg }}
        >
          {/* title  */}
          <h1 className="font-semibold text-xl md:text-3xl">{title}</h1>
          <p className="text-xs md:text-base text-gray-500 md:mt-6 md:mb-8 mt-3 mb-4">
            {subtitle}
          </p>
          {children}
        </div>
      </div>
    </div>
  );
}

export default ImageContainerDashboard;
