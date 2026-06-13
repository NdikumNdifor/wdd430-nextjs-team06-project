'use client';

import { FormEvent, useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import type { Product } from '../../lib/definitions';
import { ProductCard } from './product-card';
import styles from './products.module.css';

type ProductCatalogProps = {
  products: Product[];
};

type SortOption = 'name-asc' | 'price-asc' | 'price-desc';

const craftOptions = [
  'All crafts',
  'Ceramics',
  'Textiles',
  'Jewelry',
  'Woodwork',
  'Home goods',
];

const sortOptions: SortOption[] = ['name-asc', 'price-asc', 'price-desc'];

function getProductCraft(product: Product) {
  const text = `${product.name} ${product.description}`.toLowerCase();

  if (text.includes('mug') || text.includes('stoneware')) return 'Ceramics';
  if (text.includes('wool') || text.includes('tote') || text.includes('shibori')) {
    return 'Textiles';
  }
  if (text.includes('silver') || text.includes('ring')) return 'Jewelry';
  if (text.includes('oak') || text.includes('board')) return 'Woodwork';

  return 'Home goods';
}

function createUrl(pathname: string, params: URLSearchParams) {
  const queryString = params.toString();
  return queryString ? `${pathname}?${queryString}` : pathname;
}

export function ProductCatalog({ products }: ProductCatalogProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const queryParam = searchParams.get('query') ?? '';
  const craftParam = searchParams.get('craft') ?? 'All crafts';
  const selectedCraft = craftOptions.includes(craftParam)
    ? craftParam
    : 'All crafts';
  const minPriceParam = searchParams.get('minPrice') ?? '';
  const maxPriceParam = searchParams.get('maxPrice') ?? '';
  const rawSortParam = searchParams.get('sort') ?? 'name-asc';
  const sortParam = sortOptions.includes(rawSortParam as SortOption)
    ? (rawSortParam as SortOption)
    : 'name-asc';

  const filteredProducts = useMemo(() => {
    const normalizedQuery = queryParam.trim().toLowerCase();
    const normalizedCraft = selectedCraft;
    const minimumPrice = Number(minPriceParam);
    const maximumPrice = Number(maxPriceParam);

    return products
      .filter((product) => {
        const price = Number(product.price);
        const productCraft = getProductCraft(product);
        const searchableText =
          `${product.name} ${product.description}`.toLowerCase();

        const matchesSearch =
          !normalizedQuery || searchableText.includes(normalizedQuery);
        const matchesCraft =
          normalizedCraft === 'All crafts' || productCraft === normalizedCraft;
        const matchesMinimum =
          !minPriceParam || (!Number.isNaN(minimumPrice) && price >= minimumPrice);
        const matchesMaximum =
          !maxPriceParam || (!Number.isNaN(maximumPrice) && price <= maximumPrice);

        return matchesSearch && matchesCraft && matchesMinimum && matchesMaximum;
      })
      .sort((firstProduct, secondProduct) => {
        if (sortParam === 'price-asc') {
          return Number(firstProduct.price) - Number(secondProduct.price);
        }

        if (sortParam === 'price-desc') {
          return Number(secondProduct.price) - Number(firstProduct.price);
        }

        return firstProduct.name.localeCompare(secondProduct.name);
      });
  }, [maxPriceParam, minPriceParam, products, queryParam, selectedCraft, sortParam]);

  function updateParams(updates: Record<string, string>) {
    const params = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    router.replace(createUrl(pathname, params), { scroll: false });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    updateParams({
      query: String(formData.get('query') ?? '').trim(),
      minPrice: String(formData.get('minPrice') ?? '').trim(),
      maxPrice: String(formData.get('maxPrice') ?? '').trim(),
    });
  }

  function clearFilters() {
    router.replace(pathname, { scroll: false });
  }

  return (
    <section className={styles.catalog} aria-labelledby="catalog-title">
      <div className={styles.catalogHeader}>
        <p>Product catalog</p>
        <h1 id="catalog-title">Browse handcrafted goods</h1>
        <span>
          Search and filter the marketplace with URL-based controls that are
          easy to share, bookmark, and revisit.
        </span>
      </div>

      <form
        className={styles.filterPanel}
        key={searchParams.toString()}
        onSubmit={handleSubmit}
      >
        <label>
          Search
          <input
            name="query"
            placeholder="Mug, wool, silver..."
            type="search"
            defaultValue={queryParam}
          />
        </label>

        <label>
          Craft
          <select
            name="craft"
            value={selectedCraft === 'All crafts' ? '' : selectedCraft}
            onChange={(event) => updateParams({ craft: event.target.value })}
          >
            {craftOptions.map((craft) => (
              <option key={craft} value={craft === 'All crafts' ? '' : craft}>
                {craft}
              </option>
            ))}
          </select>
        </label>

        <label>
          Min price
          <input
            min="0"
            name="minPrice"
            placeholder="20"
            type="number"
            defaultValue={minPriceParam}
          />
        </label>

        <label>
          Max price
          <input
            min="0"
            name="maxPrice"
            placeholder="100"
            type="number"
            defaultValue={maxPriceParam}
          />
        </label>

        <label>
          Sort
          <select
            name="sort"
            value={sortParam}
            onChange={(event) => updateParams({ sort: event.target.value })}
          >
            <option value="name-asc">Name A-Z</option>
            <option value="price-asc">Price low to high</option>
            <option value="price-desc">Price high to low</option>
          </select>
        </label>

        <div className={styles.filterActions}>
          <button type="submit">Apply filters</button>
          <button type="button" onClick={clearFilters}>
            Clear
          </button>
        </div>
      </form>

      <div className={styles.resultSummary} aria-live="polite">
        Showing {filteredProducts.length} of {products.length} products
      </div>

      {filteredProducts.length > 0 ? (
        <div className={styles.productGrid}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <h2>No products match these filters</h2>
          <p>Try a broader search or clear the filters to see the full catalog.</p>
        </div>
      )}
    </section>
  );
}
