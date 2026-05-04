import HeaderCategories from "@/components/common/Header/HeaderCategories";
import MyCart from "./components/MyCart";

const AdministratorCart = () => {
  return (
    <>
      <HeaderCategories />
      <div className="container mx-auto px-4 lg:px-0">
        <div className="pb-8 sm:pb-12 ">
          <MyCart />
        </div>
      </div>
    </>
  );
};

export default AdministratorCart;
