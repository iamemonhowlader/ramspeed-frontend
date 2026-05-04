"use client";
import Image from "next/image";
import Link from "next/link";

const TrendingProduct = ({ data }) => {
  if (!data) return null;

  const product = {
    id: data.id,
    title: data.name,
    availability: data.availability,
    sku: data.code,
    price: parseFloat(data.price) > 0 ? parseFloat(data.price) : parseFloat(data.price_sup_cy || 0),
    image: (data.product_images && data.product_images.length > 0) 
      ? `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://ramspeed-laravel-api.test'}/storage/product_images/${data.product_images[0].filename}` 
      : "/trending-1.png",
  };

  const productSlug = product.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const productHref = `/shop-now/product/${product.id}-${productSlug}`;

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden grid grid-cols-1 sm:grid-cols-2 p-4 sm:p-6 gap-4 sm:gap-6 group">
      {/* Product Image Section */}
      <div className="flex items-center justify-center">
        <div className="max-w-[300px] sm:max-w-[365px] w-full max-h-[365px] overflow-hidden rounded-lg">
          <Image
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
            src={product.image}
            alt={product.title}
            width={365}
            height={365}
            unoptimized
          />
        </div>
      </div>

      {/* Product Info Section */}
      <div className="flex flex-col justify-center gap-4 px-2 sm:px-0">
        <span className="max-w-max inline-block bg-primary hover:bg-primary/90 text-white py-2 px-5 rounded-lg transition-colors duration-200 text-xs sm:text-sm uppercase tracking-wide">
          NEW PRODUCT
        </span>

        <h2 className="text-xl sm:text-3xl font-bold text-black leading-tight">
          <Link href={productHref}>{product.title}</Link>
        </h2>

        <div className="flex items-center font-semibold text-sm sm:text-base text-gray-700">
          <span className="mr-2">Availability:</span>
          <span className="text-primary">{product.availability} pcs</span>
        </div>

        <div className="flex items-center font-semibold space-x-4">
          <span className="text-xl sm:text-2xl font-bold text-primary">
            €{product.price.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TrendingProduct;
