import AdminDashboardHeader from "./components/AdminDashboardHeader";
import CopyRight from "./components/CopyRight";

const layout = ({ children }) => {
  return (
    <main className="bg-[#FAFAFA] flex flex-col min-h-screen">
      <AdminDashboardHeader />

      <div className="max-w-[1832px] w-full mx-auto px-4 flex flex-col flex-1">
        <div className="py-8 sm:py-12 flex-1">{children}</div>
      </div>

      <footer>
        <CopyRight />
      </footer>
    </main>
  );
};

export default layout;
