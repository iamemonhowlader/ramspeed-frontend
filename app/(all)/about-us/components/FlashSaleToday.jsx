import Product from "@/components/Product/Product";

const FlashSaleToday = () => {
  return (
    <div className="w-full">
      <div className="flex flex-row mb-8">
        {/* Title */}
        <h2 className="text-3xl font-black text-black capitalize">
          Flash Sale Today
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {Array.from({ length: 4 }).map((product, index) => (
          <Product key={index} product={product?.[index]} />
        ))}
      </div>
    </div>
  );
};

export default FlashSaleToday;
