import Breadcrumb from "@/components/common/Header/Breadcrumb";

const layout = ({ children }) => {
  return (
    <div>
      {/* Breadcrumb */}
      <Breadcrumb />
      {children}
    </div>
  );
};

export default layout;
