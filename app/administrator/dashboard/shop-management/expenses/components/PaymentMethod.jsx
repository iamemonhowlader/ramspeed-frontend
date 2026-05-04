import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const paymentMethods = [
  {
    id: "cash",
    name: "Cash",
  },
  {
    id: "bankTransfer",
    name: "Bank Transfer",
  },
  {
    id: "cheque",
    name: "Cheque Number",
  },
];

const PaymentMethod = () => {
  const [paymentMethod, setPaymentMethod] = useState("cash");
  return (
    <div>
      <Label className={"mb-2 md:mb-6"}>Choose Payment method</Label>
      <div className="flex gap-2 lg:gap-4">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className="flex items-center gap-2 px-2 md:px-3 py-1 md:py-2 border border-[#D0D5DD] rounded-[12px]"
          >
            <input
              type="radio"
              id={method.id}
              name="paymentMethod"
              value={method.id}
              checked={paymentMethod === method.id}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <Label
              className={"text-xs md:text-lg font-semibold text-gray-500"}
              htmlFor={method.id}
            >
              {method.name}
            </Label>
          </div>
        ))}
      </div>

      <div className=" mt-4 md:mt-8 grid md:grid-cols-2">
        {paymentMethod === "cheque" && (
          <div>
            <Input
              label="Enter check number"
              id="checkNumber"
              placeholder="Write check number"
              type="number"
              step="1"
            />
          </div>
        )}

        {paymentMethod === "bankTransfer" && (
          <div>
            <Input
              label="Transaction number"
              id="bankTransactionNumber"
              placeholder="Write transaction number here"
              type="number"
              step="1"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentMethod;
