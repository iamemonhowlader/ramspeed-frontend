import Mastercard from "@/public/mastercard.svg";
import Paypal from "@/public/paypal.svg";
import Visa from "@/public/visa.svg";

import Image from "next/image";
import Link from "next/link";
const ecommerceTags = [
  { tag: "Shoes" },
  { tag: "Sneakers" },
  { tag: "Running" },
  { tag: "Sportswear" },
  { tag: "Men" },

  { tag: "Women" },
  { tag: "Dresses" },
  { tag: "Casual" },
  { tag: "Summer" },
  { tag: "Trendy" },

  { tag: "Accessories" },
  { tag: "Belts" },
  { tag: "Leather" },
  { tag: "Classic" },
  { tag: "Formal" },

  { tag: "Electronics" },
  { tag: "Smartphones" },
  { tag: "Android" },
  { tag: "5G" },
  { tag: "Camera" },
];
const TrendingTags = () => {
  return (
    <div className="w-full pt-8 sm:pt-12 ">
      <div className="mb-8">
        {/* Title */}
        <h2 className="text-2xl font-black text-black">Trending Tags:</h2>
      </div>
      {/* Tags */}
      <div className="flex flex-row flex-wrap gap-2 lg:gap-5">
        {/* Tag */}

        {ecommerceTags.map((item, index) => (
          <Link
            href={"/shop-now/tags/" + item.tag.toLowerCase()}
            className="hover:text-primary bg-white border border-[#919eab] hover:border-primary transition duration-100 rounded-md md:rounded-xl px-3 md:px-5 py-1 md:py-2 text-sm"
            key={index}
          >
            {item.tag}
          </Link>
        ))}
      </div>
      {/* Payment Partner Logos */}
      <div className="flex flex-row flex-wrap items-end justify-end gap-5 mt-8">
        {/* Payment Partner Logo */}
        <Image
          src={Mastercard}
          width={120}
          height={80}
          alt="Payment Partner 1"
          className="w-12 h-8 object-contain"
        />
        <Image
          src={Paypal}
          width={120}
          height={80}
          alt="Payment Partner 1"
          className="w-12 h-8 object-contain"
        />
        <Image
          src={Visa}
          width={120}
          height={80}
          alt="Payment Partner 1"
          className="w-12 h-8 object-contain"
        />
      </div>
    </div>
  );
};

export default TrendingTags;
