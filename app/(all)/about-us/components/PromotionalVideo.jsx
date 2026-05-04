const PromotionalVideo = () => {
  return (
    <div className="container mx-auto px-4 lg:px-0">
      <div className="max-w-md">
        {/* Details */}
        <div className="flex flex-col gap-6">
          <h2 className="text-3xl md:text-5xl font-black text-white leading-10 md:leading-[64px]">
            Your trusted and reliable ratail store
          </h2>
          <p className="text-md text-[#B8B8B8] leading-7">
            Praesent sed semper metus. Nunc aliquet dolor mauris, et fringilla
            elit gravida eget. Nunc consequat auctor urna a placerat.
          </p>
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.3844 11.9989L7.89375 3.74888C7.78018 3.67883 7.64998 3.64034 7.51658 3.63739C7.38318 3.63444 7.25141 3.66713 7.13486 3.7321C7.0183 3.79706 6.92119 3.89194 6.85354 4.00695C6.78589 4.12197 6.75015 4.25295 6.75 4.38638V20.8864C6.75015 21.0198 6.78589 21.1508 6.85354 21.2658C6.92119 21.3808 7.0183 21.4757 7.13486 21.5407C7.25141 21.6056 7.38318 21.6383 7.51658 21.6354C7.64998 21.6324 7.78018 21.5939 7.89375 21.5239L21.3844 13.2739C21.4952 13.2084 21.5869 13.1151 21.6507 13.0033C21.7145 12.8916 21.748 12.7651 21.748 12.6364C21.748 12.5077 21.7145 12.3812 21.6507 12.2694C21.5869 12.1576 21.4952 12.0644 21.3844 11.9989Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionalVideo;
