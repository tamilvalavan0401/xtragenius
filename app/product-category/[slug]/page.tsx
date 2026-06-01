import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/shop/ProductCard";
import { productsData, getCategoryName } from "@/lib/data/products";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const categoryName = getCategoryName(slug);
  return {
    title: `${categoryName} - XTRAGENIUS`,
  };
}

export default async function ProductCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const products = productsData[slug];
  const categoryName = getCategoryName(slug);

  // If we don't have mock data for this slug, we can render an empty state instead of 404
  const displayProducts = products || [];

  return (
    <div className="font-sans min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-1">
        {/* Breadcrumb */}
        <section className="bg-white py-6">
          <div className="mx-auto max-w-[1200px] px-4">
            <nav aria-label="breadcrumb">
              <span className="text-[15px] text-[#696969] font-medium">
                <Link href="/" className="transition-colors hover:text-[#ff6600]">Home</Link>
                <span className="mx-2">/</span>
                <Link href="/shop" className="transition-colors hover:text-[#ff6600]">Products</Link>
                <span className="mx-2">/</span>
                <span className="text-[#333333]">{categoryName}</span>
              </span>
            </nav>
          </div>
        </section>

        {/* Page Title */}
        <section className="bg-white pt-8 pb-12 text-center">
          <div className="mx-auto max-w-[1200px] px-4">
            <h1 className="text-[44px] font-bold text-[#333333]">
              Category: {categoryName}
            </h1>
          </div>
        </section>

        {/* Products Layout */}
        <section className="pb-24">
          <div className="mx-auto max-w-[1200px] px-4">
            
            {/* Header: Count & Sort */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
              <div className="text-[15px] text-[#666666]">
                We found <span className="font-bold text-[#333333]">{displayProducts.length}</span> product{displayProducts.length !== 1 ? 's' : ''} available for you
              </div>
              
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                  <line x1="21" x2="14" y1="4" y2="4"/><line x1="10" x2="3" y1="4" y2="4"/><line x1="21" x2="12" y1="12" y2="12"/><line x1="8" x2="3" y1="12" y2="12"/><line x1="21" x2="16" y1="20" y2="20"/><line x1="12" x2="3" y1="20" y2="20"/><line x1="14" x2="14" y1="2" y2="6"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="16" x2="16" y1="18" y2="22"/>
                </svg>
                <select className="bg-[#f9f9f9] border border-gray-200 text-[#333333] text-[15px] rounded px-4 py-2 outline-none focus:border-[#ff6600] min-w-[200px] appearance-none cursor-pointer">
                  <option value="default">Sort by: Default</option>
                  <option value="popularity">Popularity</option>
                  <option value="rating">Average rating</option>
                  <option value="latest">Latest</option>
                  <option value="price-low">Price: low to high</option>
                  <option value="price-high">Price: high to low</option>
                </select>
              </div>
            </div>

            {/* Grid */}
            {displayProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {displayProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 text-gray-500 text-lg">
                No products found in this category.
              </div>
            )}

          </div>
        </section>

      </main>
      
      <Footer />
    </div>
  );
}
