import Image from "next/image";
import Link from "next/link";

const NewProduct = ({ data }) => {
  if (!data) return null;

  const product = {
    id: data.id,
    title: data.name,
    image: (data.product_images && data.product_images.length > 0) 
      ? `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://ramspeed-laravel-api.test'}/storage/product_images/${data.product_images[0].filename}` 
      : "/upcoming-1.png",
  };

  const productSlug = product.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const productHref = `/shop-now/product/${product.id}-${productSlug}`;

  return (
    <div className="relative group overflow-hidden rounded-2xl">
      <Link href={productHref}>
        <Image
          src={product.image}
          alt={product.title}
          width={400}
          height={800}
          unoptimized
          className="w-full rounded-2xl object-contain bg-gray-50 max-h-[370px] h-[370px] 2xl:max-h-[460px] 2xl:h-[460px] group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
          <h3 className="text-white font-bold truncate">{product.title}</h3>
        </div>
      </Link>
    </div>
  );
};

export default NewProduct;
