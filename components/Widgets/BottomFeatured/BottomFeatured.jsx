import Product from "@/components/Product/Product";
import Image from "next/image";
import Link from "next/link";

const BottomFeatured = () => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-5">
        <div className="flex flex-col md:flex-row gap-6">
          <Product />
          <Product />
        </div>
        <div className="">
          <Link href="#">
            <Image
              src="/bottomnewproduct.png"
              alt="New Product"
              width={400}
              height={800}
              unoptimized
              className="h-full w-full object-cover rounded-2xl "
              priority
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BottomFeatured;
