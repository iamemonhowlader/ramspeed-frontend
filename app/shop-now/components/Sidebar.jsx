import BrandsFilter from "./Filter/BrandsFilter";
import ColorFilter from "./Filter/ColorFilter";
import ConditionFilter from "./Filter/ConditionFilter";
import PriceFilter from "./Filter/PriceFilter";

const Sidebar = () => {
  return (
    <>
      <PriceFilter />
      <BrandsFilter />
      <ColorFilter />
      <ConditionFilter />
    </>
  );
};

export default Sidebar;
