import { FaCreditCard, FaDollarSign, FaHeadphones } from "react-icons/fa";
import { FaTruckFast } from "react-icons/fa6";
import Feature from "./Feature";

const featuresData = [
  {
    key: "freeDelivery",
    title: "Free delivery",
    subtitle: "FREE SHIPPING ON ALL ORDER",
    icon: <FaTruckFast color="#0068C8" size={44} />,
  },
  {
    key: "returns",
    title: "Returns",
    subtitle: "BACK GUARANTEE UNDER 7 DAYS",
    icon: <FaDollarSign color="#0068C8" size={44} />,
  },
  {
    key: "support24_7",
    title: "Support 24/7",
    subtitle: "SUPPORTS ONLINE 24/7 A DAY",
    icon: <FaHeadphones color="#0068C8" size={44} />,
  },
  {
    key: "payment",
    title: "Payment",
    subtitle: "100% PAYMENT SECURITY",
    icon: <FaCreditCard color="#0068C8" size={44} />,
  },
];

const Features = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4  gap-6 lg:gap-18">
      {featuresData.map((feature) => (
        <Feature
          key={feature.key}
          title={feature.title}
          subtitle={feature.subtitle}
          icon={feature.icon}
        />
      ))}
    </div>
  );
};

export default Features;
