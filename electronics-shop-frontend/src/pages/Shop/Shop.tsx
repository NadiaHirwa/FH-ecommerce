import React, { useState, useEffect } from 'react';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import type { Product } from '../../types';
import laptop from '../../assets/categories/laptop.jpg';
import monitor from '../../assets/categories/monitor.jpg';
import keyboard from '../../assets/categories/keyboard-mouse.jpg';
import headphones from '../../assets/categories/headphones.jpg';
import storage from '../../assets/categories/storage.jpg';
import accessory from '../../assets/categories/accessory.jpg';
import { CATEGORY_DATA } from '../../data/categories';
import './Shop.css';

// Extend Product type locally for the shop data
interface ShopProduct extends Product {
  category: string; // Main category
  subcategory: string; // Sub category
}

const Shop: React.FC = () => {
  const [products] = useState<ShopProduct[]>([
    {
      id: '1',
      name: 'Laptop Pro Max 15"',
      price: 999,
      originalPrice: 1299,
      image: laptop,
      rating: 4.8,
      reviews: 234,
      discount: 23,
      inStock: true,
      category: 'Computers',
      subcategory: 'Laptops',
      description: 'Powerful laptop for professionals',
    },
    {
      id: '2',
      name: 'Wireless Mouse',
      price: 45,
      originalPrice: 69,
      image: accessory,
      rating: 4.5,
      reviews: 125,
      discount: 35,
      inStock: true,
      category: 'Computer Accessories',
      subcategory: 'Mouse',
      description: 'Ergonomic wireless mouse',
    },
    {
      id: '3',
      name: 'USB-C Hub',
      price: 79,
      originalPrice: 99,
      image: storage,
      rating: 4.3,
      reviews: 89,
      discount: 20,
      inStock: true,
      category: 'Computer Accessories',
      subcategory: 'USB Hubs',
      description: 'Multi-port USB-C hub',
    },
    {
      id: '4',
      name: 'Mechanical Keyboard',
      price: 149,
      originalPrice: 199,
      image: keyboard,
      rating: 4.6,
      reviews: 312,
      discount: 25,
      inStock: true,
      category: 'Computer Accessories',
      subcategory: 'Keyboards',
      description: 'High-performance mechanical keyboard',
    },
    {
      id: '5',
      name: 'Desktop Monitor 4K',
      price: 499,
      originalPrice: 699,
      image: monitor,
      rating: 4.7,
      reviews: 178,
      discount: 29,
      inStock: true,
      category: 'Audio & Video',
      subcategory: 'Monitors',
      description: 'Beautiful 4K display monitor',
    },
    {
      id: '6',
      name: 'Wireless Headphones',
      price: 199,
      originalPrice: 299,
      image: headphones,
      rating: 4.4,
      reviews: 456,
      discount: 33,
      inStock: true,
      category: 'Audio & Video',
      subcategory: 'Headphones & Headsets',
      description: 'Premium wireless headphones',
    },
    {
      id: '7',
      name: 'Gaming Desktop',
      price: 1499,
      originalPrice: 1999,
      image: storage, // Placeholder
      rating: 4.9,
      reviews: 98,
      discount: 25,
      inStock: true,
      category: 'Computers',
      subcategory: 'Desktops / PCs',
      description: 'High-performance gaming desktop',
    },
    {
      id: '8',
      name: 'Smartphone Pro',
      price: 899,
      originalPrice: 1099,
      image: accessory, // Placeholder
      rating: 4.6,
      reviews: 567,
      discount: 18,
      inStock: true,
      category: 'Phones & Tablets',
      subcategory: 'Smartphones',
      description: 'Latest flagship smartphone',
    },
  ]);

  const [filters, setFilters] = useState({
    category: 'All',
    subcategory: 'All',
    priceRange: [0, 2000],
  });

  const [sortBy, setSortBy] = useState('popular');
  const [itemsPerPage, setItemsPerPage] = useState(12);

  const handleAddToCart = (product: Product) => {
    console.log('Added to cart:', product);
    alert(`${product.name} added to cart!`);
  };

  const categories = ['All', ...Object.keys(CATEGORY_DATA)];

  // Get available subcategories based on selected category
  const subcategories = filters.category !== 'All'
    ? ['All', ...CATEGORY_DATA[filters.category]]
    : [];

  // Reset subcategory when category changes
  useEffect(() => {
    setFilters(prev => ({ ...prev, subcategory: 'All' }));
  }, [filters.category]);

  const filteredProducts = products.filter((product) => {
    // 1. Category Filter
    if (filters.category !== 'All' && product.category !== filters.category) {
      return false;
    }

    // 2. Subcategory Filter
    if (filters.subcategory !== 'All' && product.subcategory !== filters.subcategory) {
      return false;
    }

    // 3. Price Filter
    if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
      return false;
    }
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'newest':
        return b.id.localeCompare(a.id);
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0; // popular
    }
  });

  return (
    <div className="shop-page">
      <div className="shop-container">
        {/* Filters Sidebar */}
        <aside className="filters-sidebar">

          {/* Price Range Filter */}
          <div className="filter-group">
            <h4>Price Range</h4>
            <div className="price-inputs">
              <input
                type="number"
                placeholder="Min"
                value={filters.priceRange[0]}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    priceRange: [parseInt(e.target.value) || 0, filters.priceRange[1]],
                  })
                }
              />
              <span>-</span>
              <input
                type="number"
                placeholder="Max"
                value={filters.priceRange[1]}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    priceRange: [filters.priceRange[0], parseInt(e.target.value) || 2000],
                  })
                }
              />
            </div>
          </div>

          <button
            className="btn-filter-clear"
            onClick={() => setFilters({ category: 'All', subcategory: 'All', priceRange: [0, 2000] })}
          >
            Clear Filters
          </button>
        </aside>

        {/* Main Content */}
        <div className="shop-main">
          {/* Sort & Display Options */}
          <div className="sort-controls">

            {/* Category Filter Dropdown */}
            <div className="sort-select">
              <label>Category:</label>
              <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Subcategory Filter Dropdown */}
            {filters.category !== 'All' && (
              <div className="sort-select">
                <label>Subcategory:</label>
                <select
                  value={filters.subcategory}
                  onChange={(e) => setFilters({ ...filters, subcategory: e.target.value })}
                >
                  {subcategories.map((sub) => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>
            )}

            <div className="sort-select">
              <label>Sort By:</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="popular">Popular</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low → High</option>
                <option value="price-high">Price: High → Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
            <div className="sort-select">
              <label>Show:</label>
              <select value={itemsPerPage} onChange={(e) => setItemsPerPage(parseInt(e.target.value))}>
                <option value="12">12 per page</option>
                <option value="24">24 per page</option>
                <option value="36">36 per page</option>
              </select>
            </div>
            <div className="result-count">
              {sortedProducts.length} products found
            </div>
          </div>

          {/* Products Grid */}
          {sortedProducts.length > 0 ? (
            <div className="products-grid">
              {sortedProducts.slice(0, itemsPerPage).map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <p>😕 No products found</p>
              <p>Try adjusting your filters</p>
            </div>
          )}

          {/* Pagination */}
          {sortedProducts.length > itemsPerPage && (
            <div className="pagination">
              <button>← Previous</button>
              <span>1 / {Math.ceil(sortedProducts.length / itemsPerPage)}</span>
              <button>Next →</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
