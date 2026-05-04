import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import DevicePasswordTerm from "@/data/DevicePasswordTerm";
import { Info } from "lucide-react";

const DevicePasswordTermsToolTip = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <span className="cursor-pointer">
          <Info
            size={18}
            className="text-gray-600 hover:text-blue-700 transition-colors duration-200"
            aria-label="Device password info"
          />
        </span>
      </PopoverTrigger>
      <PopoverContent
        align="center"
        side="bottom"
        className="
          bg-white text-base md:text-sm text-gray-700 border border-gray-200 shadow-lg rounded-xl
          p-4 md:p-5
          max-w-[92vw] w-auto sm:max-w-[400px]
        "
      >
        <div className="flex flex-col gap-5">
          {/* Greek Paragraph */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-blue-600 text-[1rem] md:text-base">
                Κωδικός Πρόσβασης
              </span>
              <span className="inline-block h-1 w-1 rounded-full bg-blue-400" />
              {/* <span className="uppercase text-xs text-gray-400 tracking-wide">
                GR
              </span> */}
            </div>
            <div className="ml-1 pl-1 border-l-2 border-blue-100 text-gray-700 leading-relaxed text-[0.97em] md:text-[1em]">
              {DevicePasswordTerm.cy}
            </div>
          </div>

          <div className="h-px bg-gray-200" />

          {/* English Paragraph */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-blue-600 text-[1rem] md:text-base">
                Passcode
              </span>
              <span className="inline-block h-1 w-1 rounded-full bg-blue-400" />
              {/* <span className="uppercase text-xs text-gray-400 tracking-wide">
                EN
              </span> */}
            </div>
            <div className="ml-1 pl-1 border-l-2 border-blue-100 text-gray-700 leading-relaxed text-[0.97em] md:text-[1em]">
              {DevicePasswordTerm.en}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DevicePasswordTermsToolTip;
