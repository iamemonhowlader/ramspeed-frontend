import ProductDescription from "@/components/Product/ProductDetails/ProductDescription";
import ProductDetails from "@/components/Product/ProductDetails/ProductDetails";
import RelatedProducts from "./components/RelatedProducts";
import YouMayLike from "./components/YouMayLike";
import { apiFetch } from "@/lib/api";

export default async function Page({ params, searchParams }) {
  const { productSlug } = params || {};
  
  // Extract ID from slug (e.g., "3102-forever-wireless-headset" -> "3102")
  const productId = productSlug.split('-')[0];

  let product = null;
  try {
    // Try to fetch product by ID from API
    const response = await apiFetch(`/api/frontend/products/${productId}`);
    if (response.success) {
      // Handle nested data from show() method
      product = response.data.product || response.data;
      // Add calculated prices to product object if available
      if (response.data.price) product.calculated_price = response.data.price;
      if (response.data.price_cy) product.calculated_price_cy = response.data.price_cy;
    }
  } catch (error) {
    console.error("Error fetching product details:", error);
  }

  // Fallback to searchParams if API fails or for legacy support
  if (!product && searchParams?.data) {
    try {
      product = JSON.parse(decodeURIComponent(searchParams.data));
    } catch (e) {
      // Ignore
    }
  }

  return (
    <div className="bg-[#F8F8F8]">
      <div className="container mx-auto px-4 lg:px-0">
        {/* Product Details */}
        <div className="py-8 sm:py-12">
          {product ? (
            <ProductDetails product={product} slug={productSlug} />
          ) : (
            <div className="text-center py-20">Product not found.</div>
          )}
        </div>
        
        {product && (
          <>
            {/* Product Description */}
            <div className="py-8 sm:py-12">
              <ProductDescription product={product} slug={productSlug} />
            </div>
            {/* You may also like */}
            <div className="py-8 sm:py-12">
              <h2 className="text-3xl font-black text-black mb-6 capitalize">
                You may also like
              </h2>
              <YouMayLike categoryId={product.menu_item_id} />
            </div>
            {/* Related Products */}
            <div className="py-8 sm:py-12">
              <h2 className="text-3xl font-black text-black mb-6 capitalize">
                Related Products
              </h2>
              <RelatedProducts categoryId={product.menu_item_id} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
