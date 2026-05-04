import DropDownBtnFilter from "./Filter/DropDownBtnFilter";

const ShopNowHeading = ({ slug, childSlug, navigation }) => {
  // Function to get the title based on slug and childSlug
  const getTitle = () => {
    // Handle base page
    if (!slug) return "Shop Now";

    // Support catch-all route where slug can be an array
    const slugArray = Array.isArray(slug)
      ? slug
      : [slug, childSlug].filter(Boolean);
    const [parentSlug, derivedChildSlug] = slugArray;

    // Find the categories root in navigation
    const categoriesRoot =
      navigation.find((item) => item.slug === "categories")?.children ||
      navigation;

    // Find the parent category under categories root
    const parentCategory = categoriesRoot.find(
      (item) => item.slug === parentSlug
    );
    if (!parentCategory) return "Shop Now";

    const effectiveChildSlug = childSlug || derivedChildSlug;

    // If child slug exists, find matching child under the parent
    if (effectiveChildSlug && parentCategory.children) {
      const childCategory = parentCategory.children.find(
        (child) => child.slug === effectiveChildSlug
      );
      return childCategory ? childCategory.text : parentCategory.text;
    }

    return parentCategory.text;
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
        {/* Title */}
        <h2 className="text-3xl md:text-5xl font-black text-black pb-8 capitalize">
          {getTitle()}
        </h2>
        <div className="flex flex-row gap-4">
          <button className="flex-1 bg-primary whitespace-nowrap hover:bg-primary/90 text-white py-2 px-4 rounded-md transition-colors duration-200 text-xs uppercase tracking-wide cursor-pointer">
            Products in stock
          </button>
          <button className="flex-1 bg-primary whitespace-nowrap hover:bg-primary/90 text-white py-2 px-4 rounded-md transition-colors duration-200 text-xs uppercase tracking-wide cursor-pointer">
            On sale
          </button>
          <DropDownBtnFilter />
        </div>
      </div>
    </div>
  );
};

export default ShopNowHeading;
