import Product from "@/components/Product/Product";

const TodaysHotOffer = () => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-start">
        {/* Title */}
        <h2 className="text-3xl font-black text-black mb-6 capitalize">
          Today’s best hot offers
        </h2>

        <div className="">COUNTER</div>
      </div>

      {/* Three Column Product Layout */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
        {Array.from({ length: 12 }).map((_, index) => (
          <Product key={index} />
        ))}
      </div>
    </div>
  );
};

export default TodaysHotOffer;
