import DashboardFormContainer from "../components/DashboardFormContainer";
import AddProductForm from "./components/AddProductForm";

const addProduct = () => {
  return (
    <DashboardFormContainer
      title={"Add your product details here"}
      subtitle={"Add your product details and create new product"}
    >
      {/* form  */}
      <AddProductForm />
    </DashboardFormContainer>
  );
};

export default addProduct;
