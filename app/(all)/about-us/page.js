import Features from "@/components/Widgets/Features/Features";
import FlashSaleToday from "./components/FlashSaleToday";
import OurMission from "./components/OurMission";
import PromotionalVideo from "./components/PromotionalVideo";
import TopInfo from "./components/TopInfo";

const AboutPage = () => {
  return (
    <div className="bg-[#F8F8F8]">
      <div className="container mx-auto px-4 lg:px-0">
        {/* Top Info */}
        <div className="py-8 sm:py-12">
          <TopInfo />
        </div>
        {/* Our Mission */}
        <div className="py-8 sm:py-12">
          <OurMission />
        </div>
        {/* Our Core Team Members */}
        {/* <div className="py-8 sm:py-12">
          <OurCoreTeamMembers />
        </div> */}
      </div>
      {/* Promotional Video */}
      <div className="py-8 sm:py-12 bg-[url('/about-promo-video.png')] text-white relative z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 -z-10"></div>
        <PromotionalVideo />
      </div>
      {/* Features */}
      <div className="bg-[#f4f4f4]">
        <div className="container mx-auto px-4 lg:px-0">
          <div className="py-8 sm:py-12">
            <Features />
          </div>
        </div>
      </div>
      {/* Flash sale today */}
      <div className="container mx-auto px-4 lg:px-0">
        <div className="py-8 sm:py-12">
          <FlashSaleToday />
        </div>
      </div>
    </div>
  );
};
export default AboutPage;
