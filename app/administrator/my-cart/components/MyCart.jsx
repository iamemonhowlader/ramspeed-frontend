import CartItems from "./CartItems";

const MyCart = () => {
  return (
    <div className="w-full">
      {/* Title */}
      <h2 className="text-3xl font-black text-black mb-6 capitalize">
        My Cart
      </h2>
      {/* Cart Box */}
      <div className="">
        <CartItems />
      </div>
    </div>
  );
};

export default MyCart;
