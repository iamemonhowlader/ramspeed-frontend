import NewProducts from "@/components/Widgets/UpcomingProducts/NewProducts";
import { WeekDeal } from "@/components/Widgets/WeekDeal";
import BottomBanner from "./components/BottomBanner";
import Hero from "./components/Hero";
import TodaysHotOffer from "./components/TodaysHotOffer";

const HomePage = () => {
  return (
    <>
      <div className="">
        <div className="bg-[url('/flash-sale.png')] bg-cover bg-no-repeat bg-center mx-auto py-[100px] sm:py-[120px] md:py-[164px] px-4 sm:px-0">
          <Hero />
        </div>
        <div className="bg-[#F8F8F8]">
          <div className="container mx-auto px-4 lg:px-0 2xl:px-0">
            {/* Week Deal */}
            <div className="py-8 sm:py-12">
              <WeekDeal title="Grap your craze" />
            </div>

            {/* Todays Hot Offer */}
            <div className="py-8 sm:py-12">
              <TodaysHotOffer />
            </div>
            {/* Bottom Banner */}
            <div className="py-8 sm:py-12">
              <BottomBanner />
            </div>
            {/* Upcoming Products */}
            <div className="py-8 sm:py-12">
              <NewProducts />
            </div>
          </div>
        </div>
      </div>
      {/* Trending Tags */}
      {/* <div className="bg-[#fff]">
        <div className="container mx-auto px-4 lg:px-0">
          <div className="py-8 sm:py-12">
            <TrendingTags />
          </div>
        </div>
      </div> */}
    </>
  );
};

export default HomePage;
