// Helper function to flatten nested data
const flattenData = (products) => {
  const result = [];

  const flatten = (items) => {
    items.forEach((item) => {
      const { children, ...rest } = item;
      result.push(rest);
      if (children && children.length > 0) {
        flatten(children);
      }
    });
  };

  flatten(products);
  return result;
};

export default flattenData;
