const OrderPlaced = () => {
  return (
    <div className="bg-[#F8F8F8]">
      {" "}
      <div className="container mx-auto px-4 lg:px-0">
        <div className="py-8 sm:py-12">
          <div className="max-w-2xl mx-auto flex flex-col items-center justify-center text-center ">
            <svg
              width="133"
              height="132"
              viewBox="0 0 133 132"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.2"
                d="M66.5 115.5C93.8381 115.5 116 93.3381 116 66C116 38.6619 93.8381 16.5 66.5 16.5C39.1619 16.5 17 38.6619 17 66C17 93.3381 39.1619 115.5 66.5 115.5Z"
                fill="#0068C8"
              />
              <path
                d="M89.1875 53.625L58.9203 82.5L43.8125 68.0625"
                stroke="#0068C8"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M66.5 115.5C93.8381 115.5 116 93.3381 116 66C116 38.6619 93.8381 16.5 66.5 16.5C39.1619 16.5 17 38.6619 17 66C17 93.3381 39.1619 115.5 66.5 115.5Z"
                stroke="#0068C8"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <h2 className="text-3xl font-black text-black capitalize my-8">
              Order Confirmed
            </h2>
            <p className="leading-[30px]">
              Thank your for your order. Your order has been confirmed.
            </p>
            <div className="flex gap-5 mt-6">
              <button className="flex-1 bg-white border border-primary text-primary hover:bg-primary/90  hover:text-white py-3 px-6 rounded-md transition-colors duration-200 text-sm uppercase tracking-wide whitespace-nowrap cursor-pointer">
                Print Invoice
              </button>
              <button className="flex-1 bg-primary hover:bg-primary/90 text-white py-3 px-6 rounded-md transition-colors duration-200 text-sm uppercase tracking-wide whitespace-nowrap cursor-pointer">
                Back to home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPlaced;
