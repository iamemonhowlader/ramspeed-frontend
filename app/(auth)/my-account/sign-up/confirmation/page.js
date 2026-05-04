import Link from "next/link";

const SignUpConfirmation = () => {
  return (
    <div className="bg-[#F8F8F8]">
      <div className="container mx-auto">
        {/* Top Info */}
        <div className="py-4 sm:py-12 max-w-2xl mx-auto ">
          <div className="bg-gray-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="text-center">
                <div className="p-4 sm:p-12 lg:p-16 flex flex-col justify-center">
                  <div
                    className="w-full flex flex-col items-center justify-center gap-6
                  "
                  >
                    <svg
                      width="132"
                      height="132"
                      viewBox="0 0 132 132"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M66 121C40.073 121 27.1095 121 19.052 112.948C11 104.885 11 91.9215 11 66C11 40.073 11 27.1095 19.052 19.052C27.115 11 40.073 11 66 11C91.927 11 104.891 11 112.948 19.052C121 27.115 121 40.073 121 66C121 91.927 121 104.891 112.948 112.943C104.885 121 91.9215 121 66 121ZM88.165 49.335C88.9375 50.1084 89.3714 51.1569 89.3714 52.25C89.3714 53.3431 88.9375 54.3916 88.165 55.165L60.665 82.665C59.8916 83.4375 58.8431 83.8714 57.75 83.8714C56.6569 83.8714 55.6084 83.4375 54.835 82.665L43.835 71.665C43.4297 71.2874 43.1047 70.832 42.8792 70.326C42.6538 69.82 42.5325 69.2737 42.5228 68.7199C42.513 68.166 42.6149 67.6159 42.8223 67.1022C43.0298 66.5886 43.3386 66.122 43.7303 65.7303C44.122 65.3386 44.5886 65.0298 45.1022 64.8223C45.6158 64.6149 46.166 64.513 46.7199 64.5228C47.2737 64.5325 47.82 64.6538 48.326 64.8792C48.832 65.1047 49.2874 65.4297 49.665 65.835L57.75 73.92L82.335 49.335C83.1084 48.5625 84.1569 48.1286 85.25 48.1286C86.3431 48.1286 87.3916 48.5625 88.165 49.335Z"
                        fill="#0068C8"
                      />
                    </svg>

                    <h2 className="text-xl lg:text-3xl font-semibold">
                      Thank you for your interest
                    </h2>

                    <p className="leading-relaxed text-center">
                      Your application has been received and is under review.
                      You will be notified by email once the verification
                      process is complete
                    </p>
                    <Link href={"/"}>
                      <button className="w-auto bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-4 rounded-md transition-colors capitalize duration-200 shadow-sm cursor-pointer text-sm">
                        back to home
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpConfirmation;
