"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

// Type definitions for better code maintainability
const PRODUCT_TYPES = {
  CATEGORY: "Category",
  PRODUCT_LISTING: "Product listing",
  SUBCATEGORY: "Subcategory",
};

const STATUS_TYPES = {
  ACTIVE: "active",
  INACTIVE: "inactive",
};

// Data validation utilities
const validateProductData = (data) => {
  if (!data || typeof data !== "object") {
    throw new Error("Invalid product data: must be an object");
  }

  const requiredFields = ["id", "name", "type", "active"];
  const missingFields = requiredFields.filter((field) => !(field in data));

  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
  }

  if (!Object.values(PRODUCT_TYPES).includes(data.type)) {
    throw new Error(`Invalid product type: ${data.type}`);
  }

  return true;
};

// Data transformation utilities
const transformProductData = (rawData) => {
  try {
    if (!Array.isArray(rawData)) {
      throw new Error("Product data must be an array");
    }

    return rawData.map((item, index) => {
      // Ensure each item has required fields
      const transformedItem = {
        id: item.id || `product-${index}`,
        serialNumber:
          item.serialNumber || `SN${String(index + 1).padStart(3, "0")}`,
        name: item.name || "Unknown Product",
        type: item.type || PRODUCT_TYPES.PRODUCT_LISTING,
        active: item.active !== undefined ? item.active : true,
        category: item.category || "General",
        subcategory: item.subcategory || null,
        price: item.price || 0,
        stock: item.stock || 0,
        description: item.description || "",
        createdAt: item.createdAt || new Date().toISOString(),
        updatedAt: item.updatedAt || new Date().toISOString(),
        // Handle nested children if present
        children: item.children ? transformProductData(item.children) : [],
      };

      validateProductData(transformedItem);
      return transformedItem;
    });
  } catch (error) {
    console.error("Data transformation error:", error);
    throw new Error(`Failed to transform product data: ${error.message}`);
  }
};

// Flatten hierarchical data for table display
const flattenProductData = (products, level = 0) => {
  const flattened = [];

  products.forEach((product) => {
    flattened.push({
      ...product,
      level,
      hasChildren: product.children && product.children.length > 0,
    });

    if (product.children && product.children.length > 0) {
      flattened.push(...flattenProductData(product.children, level + 1));
    }
  });

  return flattened;
};

// Mock API service (replace with actual API calls)
const productService = {
  async fetchProducts() {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulate potential API errors
    if (Math.random() < 0.1) {
      // 10% chance of error
      throw new Error("Failed to fetch products from server");
    }

    // Mock API response
    return [
      {
        id: "cat-1",
        name: "Electronics",
        type: PRODUCT_TYPES.CATEGORY,
        active: true,
        category: "Main Category",
        children: [
          {
            id: "subcat-1",
            name: "Home Appliances",
            type: PRODUCT_TYPES.SUBCATEGORY,
            active: true,
            category: "Electronics",
            children: [
              {
                id: "prod-1",
                name: "Electric Kettle Pro",
                type: PRODUCT_TYPES.PRODUCT_LISTING,
                active: true,
                price: 89.99,
                stock: 25,
                description:
                  "High-quality electric kettle with temperature control",
              },
              {
                id: "prod-2",
                name: "Smart Coffee Maker",
                type: PRODUCT_TYPES.PRODUCT_LISTING,
                active: true,
                price: 199.99,
                stock: 12,
                description: "WiFi-enabled coffee maker with app control",
              },
              {
                id: "prod-3",
                name: "Vintage Toaster",
                type: PRODUCT_TYPES.PRODUCT_LISTING,
                active: false,
                price: 45.99,
                stock: 0,
                description: "Retro-style 2-slice toaster",
              },
            ],
          },
          {
            id: "subcat-2",
            name: "Mobile Accessories",
            type: PRODUCT_TYPES.SUBCATEGORY,
            active: true,
            category: "Electronics",
            children: [
              {
                id: "prod-4",
                name: "Samsung Galaxy Case",
                type: PRODUCT_TYPES.PRODUCT_LISTING,
                active: true,
                price: 24.99,
                stock: 50,
                description: "Protective case for Samsung Galaxy series",
              },
              {
                id: "prod-5",
                name: "Wireless Charger",
                type: PRODUCT_TYPES.PRODUCT_LISTING,
                active: true,
                price: 39.99,
                stock: 30,
                description: "Fast wireless charging pad",
              },
            ],
          },
        ],
      },
      {
        id: "cat-2",
        name: "Computer Components",
        type: PRODUCT_TYPES.CATEGORY,
        active: true,
        category: "Main Category",
        children: [
          {
            id: "prod-6",
            name: "Gaming Motherboard",
            type: PRODUCT_TYPES.PRODUCT_LISTING,
            active: true,
            price: 299.99,
            stock: 8,
            description: "High-performance motherboard for gaming",
          },
          {
            id: "prod-7",
            name: "RGB Memory Kit",
            type: PRODUCT_TYPES.PRODUCT_LISTING,
            active: true,
            price: 159.99,
            stock: 15,
            description: "32GB DDR4 RGB memory kit",
          },
        ],
      },
    ];
  },

  async updateProduct(productId, updates) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log(`Updating product ${productId}:`, updates);
    return { success: true, productId, updates };
  },

  async deleteProduct(productId) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log(`Deleting product ${productId}`);
    return { success: true, productId };
  },
};

const AdministratorManageProducts = () => {
  // State management
  const [rawProducts, setRawProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [processingActions, setProcessingActions] = useState(new Set());
  const router = useRouter();

  // Data transformation with memoization for performance
  const transformedProducts = useMemo(() => {
    try {
      if (!rawProducts.length) return [];
      return transformProductData(rawProducts);
    } catch (err) {
      setError(err.message);
      return [];
    }
  }, [rawProducts]);

  const flattenedProducts = useMemo(() => {
    try {
      return flattenProductData(transformedProducts);
    } catch (err) {
      setError(err.message);
      return [];
    }
  }, [transformedProducts]);

  // Data fetching with error handling and retry logic
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await productService.fetchProducts();
      setRawProducts(data);
      setRetryCount(0);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Retry mechanism
  const handleRetry = useCallback(() => {
    if (retryCount < 3) {
      setRetryCount((prev) => prev + 1);
      fetchProducts();
    }
  }, [fetchProducts, retryCount]);

  // Product action handlers
  const handleEditProduct = useCallback(
    async (productId) => {
      try {
        setProcessingActions((prev) => new Set(prev).add(`edit-${productId}`));
        await productService.updateProduct(productId, {
          lastModified: new Date().toISOString(),
        });
        console.log(`Edit product ${productId}`);
        // Refresh data after successful edit
        await fetchProducts();
      } catch (err) {
        setError(`Failed to edit product: ${err.message}`);
      } finally {
        setProcessingActions((prev) => {
          const newSet = new Set(prev);
          newSet.delete(`edit-${productId}`);
          return newSet;
        });
      }
    },
    [fetchProducts]
  );

  const handleDeleteProduct = useCallback(
    async (productId) => {
      if (!window.confirm("Are you sure you want to delete this product?")) {
        return;
      }

      try {
        setProcessingActions((prev) =>
          new Set(prev).add(`delete-${productId}`)
        );
        await productService.deleteProduct(productId);
        // Refresh data after successful deletion
        await fetchProducts();
      } catch (err) {
        setError(`Failed to delete product: ${err.message}`);
      } finally {
        setProcessingActions((prev) => {
          const newSet = new Set(prev);
          newSet.delete(`delete-${productId}`);
          return newSet;
        });
      }
    },
    [fetchProducts]
  );

  const handleManageProduct = useCallback((productId) => {
    console.log(`Manage product ${productId}`);
    // Navigate to product management page or open modal
  }, []);

  // Initial data fetch
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Prevent body scroll when component is mounted
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Render loading state
  if (loading) {
    return (
      <div className="flex-1 min-h-0 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="flex-1 min-h-0 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Error Loading Products
          </h3>
          <p className="text-gray-600 mb-4">{error}</p>
          {retryCount < 3 && (
            <button
              onClick={handleRetry}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              Retry ({retryCount + 1}/3)
            </button>
          )}
          {retryCount >= 3 && (
            <p className="text-sm text-gray-500">
              Maximum retry attempts reached. Please refresh the page or contact
              support.
            </p>
          )}
        </div>
      </div>
    );
  }

  // Render empty state
  if (!flattenedProducts.length) {
    return (
      <div className="flex-1 min-h-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">📦</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No Products Found
          </h3>
          <p className="text-gray-600">
            There are no products to display at the moment.
          </p>
        </div>
      </div>
    );
  }

  // Main table render
  return (
    <div className="overflow-x-auto overflow-y-auto flex-1 min-h-0">
      <table className="w-full min-w-max text-sm font-semibold text-center">
        <thead className="bg-gray-50 sticky top-0 z-10">
          <tr className="text-center bg-white">
            <th className="px-4 py-3 text-left text-xs font-bold text-primary uppercase tracking-wider">
              Serial
            </th>
            <th className="px-4 py-3 text-left text-xs font-bold text-primary uppercase tracking-wider">
              Name
            </th>
            <th className="px-4 py-3 text-left text-xs font-bold text-primary uppercase tracking-wider">
              Type
            </th>
            <th className="px-4 py-3 text-left text-xs font-bold text-primary uppercase tracking-wider">
              Active
            </th>
            <th
              colSpan={4}
              className="px-4 py-3 text-left text-xs font-bold text-primary uppercase tracking-wider"
            >
              Options
            </th>
          </tr>
        </thead>
        <tbody className="bg-[#f8f8f8]">
          {flattenedProducts.map((product, index) => (
            <tr key={product.id} className="hover:bg-gray-50">
              <td className="whitespace-nowrap border-2 border-transparent">
                <span className="px-4 py-3 text-primary font-medium cursor-pointer inline-block border-1 rounded-md h-full w-full">
                  {product.serialNumber}
                </span>
              </td>
              <td className="whitespace-nowrap border-2 border-transparent">
                <span
                  className="px-4 py-3 font-medium cursor-pointer inline-block border-1 rounded-md h-full w-full"
                  style={{ paddingLeft: `${16 + product.level * 20}px` }}
                >
                  {product.name}
                </span>
              </td>
              <td className="whitespace-nowrap border-2 border-transparent">
                <span className="px-4 py-3 font-medium cursor-pointer inline-block border-1 border-[#69A200] text-[#69A200] rounded-md h-full w-full">
                  {product.type}
                </span>
              </td>
              <td className="whitespace-nowrap border-2 border-transparent">
                <span className="px-4 py-3 font-medium cursor-pointer border-1 rounded-md h-full w-full text-center flex items-center justify-center">
                  {product.active ? (
                    <span className="border-[#54D62C] rounded-md px-2 py-1">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.2302 17.7247C9.17715 17.7247 9.12467 17.7137 9.07607 17.6924C9.02747 17.6712 8.98379 17.6401 8.94778 17.6011L1.3329 9.36399C1.28213 9.30907 1.24848 9.24055 1.23606 9.16681C1.22363 9.09306 1.23298 9.0173 1.26295 8.94878C1.29292 8.88026 1.34221 8.82197 1.40479 8.78104C1.46738 8.7401 1.54054 8.7183 1.61532 8.71829H5.2807C5.33574 8.7183 5.39013 8.73011 5.44021 8.75293C5.49029 8.77575 5.53489 8.80904 5.57101 8.85056L8.11594 11.7784C8.39097 11.1905 8.9234 10.2116 9.8577 9.01872C11.2389 7.25526 13.8081 4.66176 18.2036 2.32052C18.2886 2.27528 18.3874 2.26354 18.4806 2.28762C18.5738 2.31169 18.6546 2.36984 18.707 2.45057C18.7594 2.5313 18.7796 2.62875 18.7637 2.72368C18.7478 2.8186 18.6968 2.9041 18.6209 2.96329C18.6042 2.97641 16.9094 4.31103 14.9589 6.7556C13.1639 9.00522 10.7776 12.6837 9.60343 17.4325C9.58281 17.516 9.53483 17.5901 9.46716 17.6431C9.3995 17.696 9.31603 17.7248 9.23009 17.7248L9.2302 17.7247Z"
                          fill="#54D62C"
                        />
                      </svg>
                    </span>
                  ) : (
                    <span className="border-[#DD2831] text-[#DD2831] rounded-md px-2 py-1">
                      ✕
                    </span>
                  )}
                </span>
              </td>
              <td className="whitespace-nowrap border-2 border-transparent">
                <span className="px-4 py-3 text-white font-bold cursor-pointer inline-block border-1 rounded-md h-full w-full">
                  <span className="bg-[#FF6B9C] px-2 py-1 text-white capitalize rounded-2xl">
                    Add
                  </span>
                </span>
              </td>
              <td className="whitespace-nowrap border-2 border-transparent">
                <button
                  onClick={() => handleManageProduct(product.id)}
                  disabled={processingActions.has(`manage-${product.id}`)}
                  className="px-4 py-3 bg-[#CEF0FF] border-[#179BD7] text-[#179BD7] font-bold cursor-pointer inline-block border-1 rounded-md h-full w-full hover:bg-[#B8E6FF] transition-colors disabled:opacity-50"
                >
                  {processingActions.has(`manage-${product.id}`)
                    ? "Processing..."
                    : "Manage products"}
                </button>
              </td>
              <td className="whitespace-nowrap border-2 border-transparent">
                <button
                  onClick={() => router.push(`/administrator/dashboard/products/edit/${product.id}`)}
                  className="px-4 py-3 bg-[#CAE6FF] border-primary text-primary font-bold cursor-pointer inline-block border-1 rounded-md h-full w-full hover:bg-[#B0DAFF] transition-colors"
                >
                  Edit
                </button>
              </td>
              <td className="whitespace-nowrap border-2 border-transparent">
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  disabled={processingActions.has(`delete-${product.id}`)}
                  className="px-4 py-3 text-[#DD2831] font-bold cursor-pointer inline-block border-1 bg-[#FFDADC] border-[#DD2831] rounded-md h-full w-full hover:bg-[#FFCCCF] transition-colors disabled:opacity-50"
                >
                  {processingActions.has(`delete-${product.id}`)
                    ? "Deleting..."
                    : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdministratorManageProducts;
