import Product from "@/components/Product/Product";
import Image from "next/image";
import Link from "next/link";

const BottomFeatured = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-2 gap-4">
        {/* Featured Products */}
        <Link href="#">
          <Image
            src="/bottomfeature1.png"
            alt="Featured Product 1"
            width={400}
            height={400}
            className="h-full w-full object-cover rounded-2xl"
          />
        </Link>
        <Link href="#">
          <Image
            src="/bottomfeature2.png"
            alt="Featured Product 2"
            width={400}
            height={400}
            className="h-full w-full object-cover rounded-2xl"
          />
        </Link>
      </div>
    </div>
  );
};

export default BottomFeatured;
