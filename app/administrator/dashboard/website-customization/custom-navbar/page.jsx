import DataTable from "@/components/common/DataTable/DataTable";
import ImageContainerDashboard from "../../components/Common/ImageContainerDashboard";
import AddNavbarLinkForm from "./components/AddNavbarLinkForm";
import { navLinks } from "@/data/navbarData";
import NavLinksColumns from "./components/NavLinksColumns";

const CustomNavbarPage = () => {
  return (
    <>
      <ImageContainerDashboard
        title={"Custom Navigation Bar"}
        className={"lg:!p-8"}
      >
        {/* form  */}
        <AddNavbarLinkForm />

        {/* horizontal line  */}
        <div className="h-3 bg-primary rounded-full my-4 md:my-6" />

        {/* table  */}
        <div className="overflow-x-auto w-[75vw] md:w-auto">
          <DataTable columns={NavLinksColumns} data={navLinks} />
        </div>
      </ImageContainerDashboard>
    </>
  );
};

export default CustomNavbarPage;
