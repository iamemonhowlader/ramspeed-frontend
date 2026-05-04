import Breadcrumb from "@/components/common/Header/Breadcrumb";

const layout = ({ children }) => {
  return (
    <div>
      <Breadcrumb />
      {children}
    </div>
  );
};

export default layout;
