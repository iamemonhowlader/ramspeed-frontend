import Image from "next/image";

const ProductDescription = ({ product, slug }) => {
  if (!product) return null;

  const productImage = (product.product_images && product.product_images.length > 0)
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://ramspeed-laravel-api.test'}/storage/product_images/${product.product_images[0].filename}`
    : "/controller.png";

  return (
    <div className="max-w-6xl mx-auto leading-[36px] border rounded-2xl p-10">
      <div className="flex items-center justify-center">
        <h2 className="text-3xl font-black text-black capitalize relative after:absolute after:content-[''] after:block after:w-full after:h-2 after:bg-primary after:mt-2">
          description
        </h2>
      </div>
      <div className="py-8 sm:py-15 text-center ">
        <div 
          className="product-description-content"
          dangerouslySetInnerHTML={{ __html: product.description || product.descriptiongr }} 
        />
      </div>
      
      {productImage && (
        <div className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-15 py-8 sm:py-15">
          <div>
            <Image
              src={productImage}
              alt={product.name}
              width={400}
              height={400}
              unoptimized
              className="h-auto max-w-[300px] lg:max-w-[400px] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDescription;
