import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { terms } from "@/data/termsData";
import notImplemented from "@/lib/notImplemented";
import { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

const RMACustomerAgreement = ({ customer, open, onOpenChange }) => {
  const sigRef = useRef(null);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[90vw] max-h-[90vh]  sm:max-w-xl md:max-w-3xl lg:max-w-4xl !p-4 sm:!p-8">
        <DialogHeader>
          <DialogTitle className="text-[#101828] font-semibold text-left text-xl sm:text-3xl md:text-4xl">
            Confirm Repair{" "}
            <span className="text-[#0068C8]">management form</span>
          </DialogTitle>
          <div>
            <h2 className="text-sm sm:text-xl font-bold text-[#0068C8] text-left mb-2">
              Terms and Conditions
            </h2>
            <div className="text-gray-500 text-xs text-left sm:text-base leading-relaxed space-y-10 overflow-auto h-100 lg:h-120">
              <p>{terms.cy}</p>
              <p>{terms.en}</p>

              {/* signature box */}
              <div className="w-full relative border rounded-xl overflow-hidden mx-auto my-4">
                <p className="absolute text-[#9CA3AF] top-2 left-4">
                  Put signature here
                </p>
                <SignatureCanvas
                  ref={sigRef}
                  penColor="black"
                  canvasProps={{
                    className: "w-[75%] lg:w-[800px] h-[150px] lg:h-[200px] z-10",
                  }}
                />
              </div>

              {/* action buttons  */}
              <div className="flex flex-col sm:flex-row gap-1 md:gap-3 justify-end mt-4">
                <Button variant={"outline"}>Cancel</Button>
                <Button
                  className={"bg-gray-500 border-gray-500 hover:text-gray-500"}
                  onClick={() => sigRef.current.clear()}
                >
                  Reset
                </Button>
                <Button onClick={() => notImplemented()}>Print Ticket</Button>
              </div>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default RMACustomerAgreement;
