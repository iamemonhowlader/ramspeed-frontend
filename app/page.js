import HeaderCategories from "@/components/common/Header/HeaderCategories";
import NewsLetter from "@/components/common/NewsLetter";
import Slider from "@/components/common/Slider";
import BestDeals from "@/components/Widgets/BestDeals/BestDeals";
import BottomFeatured from "@/components/Widgets/BottomFeatured/BottomFeatured";
import FeaturedProducts from "@/components/Widgets/FeaturedProducts/FeaturedProducts";
import Features from "@/components/Widgets/Features/Features";
import Ticker from "@/components/Widgets/Ticker/Ticker";
import TrendingProducts from "@/components/Widgets/TrendingProducts/TrendingProducts";
import NewProducts from "@/components/Widgets/UpcomingProducts/NewProducts";

const HomePage = () => {
  return (
    <>
      <div className="bg-[#F8F8F8]">
        <HeaderCategories />
        <div className="container mx-auto px-4 lg:px-0 2xl:px-0">
          {/* Slider */}
          <div className="">
            <Slider />
          </div>
          {/* Best Deal Grid */}
          {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-8 py-8 sm:py-12 ">
            <BestDealCounter />
            <BestDealProduct />
          </div> */}

          {/* Best Deals */}
          <div className="py-8 sm:py-12">
            <BestDeals />
          </div>

          {/* Upcoming Products */}
          <div className="py-8 sm:py-12">
            <NewProducts />
          </div>
          {/* Featured Products */}
          <div className="py-8 sm:py-12">
            <FeaturedProducts />
          </div>
          {/* Bottom Featured */}
          <div className="py-8 sm:py-12">
            <BottomFeatured />
          </div>
        </div>
      </div>
      <div className="bg-[#f4f4f4]">
        <div className="container mx-auto px-4 lg:px-0">
          {/* Trending Products */}
          <div className="py-8 sm:py-12">
            <TrendingProducts />
          </div>
        </div>
      </div>
      {/* Ticker */}
      <div className="bg-[#FFF]">
        <div className="container mx-auto px-4 lg:px-0">
          <div className="py-8 sm:py-12">
            <Ticker />
          </div>
        </div>
      </div>
      {/* Newsletter */}
      <div className="bg-[url('/newsletter-bg.jpg')] bg-cover bg-center py-10 md:p-12.5 relative">
        <div className="absolute inset-0 bg-black/50"></div> {/* overlay */}
        <div className="relative z-10 container mx-auto px-4 lg:px-0">
          <div className="max-w-7xl mx-auto">
            <NewsLetter />
          </div>
        </div>
      </div>
      {/* Company Features */}
      <div className="bg-[#f4f4f4]">
        <div className="container mx-auto px-4 lg:px-0">
          <div className="py-8 sm:py-12">
            <Features />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
