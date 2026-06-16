import { Suspense } from 'react';
import { fetchProducts } from '../lib/data';
import { placeholderProducts } from '../lib/placeholder-data';
import { Footer } from '../ui/home/footer';
import { SiteHeader } from '../ui/home/site-header';
import { ProductCatalog } from '../ui/products/product-catalog';

export const metadata = {
  title: 'Products | Handcrafted Haven',
  description:
    'Browse handcrafted products and filter the catalog by search, craft, price, and sort order.',
};

export default async function ProductsPage() {
  let products = placeholderProducts;

  try {
    products = await fetchProducts();
  } catch (error) {
    console.error('[products] Falling back to placeholder products:', error);
  }

  // const products = await fetchProducts();

  return (
    <>
      <SiteHeader />
      <main>
        <Suspense>
          <ProductCatalog products={products} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}