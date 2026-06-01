import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductGallery from "@/components/shop/ProductGallery";
import ProductInfo from "@/components/shop/ProductInfo";
import ProductTabs from "@/components/shop/ProductTabs";
import { getProductBySlug } from "@/lib/data/products";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  return {
    title: product ? `${product.name} - XTRAGENIUS` : 'Product Not Found',
  };
}

export default async function ProductDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Use the gallery if provided, otherwise fallback to the main image
  const galleryImages = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  return (
    <div className="font-sans min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-1 pb-24">
        
        {/* Breadcrumb */}
        <section className="bg-white py-6">
          <div className="mx-auto max-w-[1200px] px-4">
            <nav aria-label="breadcrumb">
              <span className="text-[15px] text-[#696969] font-medium">
                <Link href="/" className="transition-colors hover:text-[#ff6600]">Home</Link>
                <span className="mx-2">/</span>
                <Link href="/shop" className="transition-colors hover:text-[#ff6600]">Products</Link>
                <span className="mx-2">/</span>
                {product.categorySlug && product.categoryName ? (
                  <>
                    <Link href={`/product-category/${product.categorySlug}`} className="transition-colors hover:text-[#ff6600]">
                      {product.categoryName}
                    </Link>
                    <span className="mx-2">/</span>
                  </>
                ) : null}
                <span className="text-[#333333]">{product.name}</span>
              </span>
            </nav>
          </div>
        </section>

        {/* Main Product Area */}
        <section className="bg-white pt-8">
          <div className="mx-auto max-w-[1200px] px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Left Column: Gallery & Lightbox */}
              <div>
                <ProductGallery gallery={galleryImages} altText={product.name} />
              </div>

              {/* Right Column: Info & Pincode Checker */}
              <div>
                <ProductInfo product={product} />
              </div>

            </div>

            {/* Bottom Tabs: Description & Reviews */}
            <ProductTabs description={product.description} productName={product.name} />

          </div>
        </section>

      </main>
      
      <Footer />
    </div>
  );
}
