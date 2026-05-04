import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClipboardClock, Settings, User } from "lucide-react";
import SignOutButton from "./components/SignOutButton";
import ProfileTab from "./components/ProfileTab";
import SettingTab from "./components/SettingTab";
import OrderTab from "./components/OrderTab";

//*-----------------------------------------------------------------------
//* Tab configuration data
//*-----------------------------------------------------------------------
const tabItems = [
  { value: "profile", label: "Edit Profile", icon: <User /> },
  { value: "setting", label: "Edit Settings", icon: <Settings /> },
  { value: "order", label: "Order History", icon: <ClipboardClock /> },
];

const tabContents = [
  { value: "profile", component: <ProfileTab /> },
  { value: "setting", component: <SettingTab /> },
  { value: "order", component: <OrderTab /> },
];

//*-----------------------------------------------------------------------
//* Main Component: EditProfile
//*-----------------------------------------------------------------------
const EditProfile = () => {
  return (
    <div className="bg-[#F8F8F8]">
      <div className="container mx-auto py-12 px-4">
        {/* Page Title */}
        <h1 className="text-2xl md:text-5xl font-bold">My account</h1>

        {/* Tabs Section */}
        <div className="mt-4 md:mt-12">
          <Tabs defaultValue="profile" className="flex flex-col lg:flex-row">
            {/* Tab List */}
            <TabsList className="flex flex-col border border-[#E4E7E9] h-fit w-auto md:w-[230px] xl:w-[328px] px-0 py-2 md:py-4 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
              {/* Tab Triggers */}
              {tabItems.map((item) => (
                <TabsTrigger
                  key={item.value}
                  className="!shadow-none w-full data-[state=active]:bg-[#0068C8] data-[state=active]:text-white rounded-none text-sm font-medium justify-start text-[#5F6C72] cursor-pointer px-6 py-1 md:py-[10px]"
                  value={item.value}
                >
                  {item.icon}
                  {item.label}
                </TabsTrigger>
              ))}

              {/* Sign Out */}
              <SignOutButton />
            </TabsList>

            {/* Tab Content */}
            {tabContents.map((item) => (
              <TabsContent
                key={item.value}
                className="border border-[#E4E7E9] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] rounded-xl"
                value={item.value}
              >
                {item.component}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
