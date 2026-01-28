import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import './Shop.css';

const Shop: React.FC = () => {
  const [products] = useState([
    {
      id: 1,
      name: 'Laptop Pro Max 15"',
      price: 999,
      originalPrice: 1299,
      image: 'https://via.placeholder.com/250x250?text=Laptop+Pro',
      rating: 4.8,
      reviews: 234,
      discount: 23,
      inStock: true,
      category: 'Laptops',
      brand: 'Dell',
    },
    {
      id: 2,
      name: 'Wireless Mouse',
      price: 45,
      originalPrice: 69,
      image: 'https://via.placeholder.com/250x250?text=Wireless+Mouse',
      rating: 4.5,
      reviews: 125,
      discount: 35,
      inStock: true,
      category: 'Accessories',
      brand: 'Logitech',
    },
    {
      id: 3,
      name: 'USB-C Hub',
      price: 79,
      originalPrice: 99,
      image: 'https://via.placeholder.com/250x250?text=USB-C+Hub',
      rating: 4.3,
      reviews: 89,
      discount: 20,
      inStock: true,
      category: 'Accessories',
      brand: 'Anker',
    },
    {
      id: 4,
      name: 'Mechanical Keyboard',
      price: 149,
      originalPrice: 199,
      image: 'https://via.placeholder.com/250x250?text=Keyboard',
      rating: 4.6,
      reviews: 312,
      discount: 25,
      inStock: true,
      category: 'Accessories',
      brand: 'Corsair',
    },
    {
      id: 5,
      name: 'Desktop Monitor 4K',
      price: 499,
      originalPrice: 699,
      image: 'https://via.placeholder.com/250x250?text=Monitor+4K',
      rating: 4.7,
      reviews: 178,
      discount: 29,
      inStock: true,
      category: 'Desktops',
      brand: 'LG',
    },
    {
      id: 6,
      name: 'Wireless Headphones',
      price: 199,
      originalPrice: 299,
      image: 'https://via.placeholder.com/250x250?text=Headphones',
      rating: 4.4,
      reviews: 456,
      discount: 33,
      inStock: true,
      category: 'Accessories',
      brand: 'Sony',
    },
    {
      id: 7,
      name: 'Gaming Desktop',
      price: 1499,
      originalPrice: 1999,
      image: 'https://via.placeholder.com/250x250?text=Gaming+PC',
      rating: 4.9,
      reviews: 98,
      discount: 25,
      inStock: true,
      category: 'Desktops',
      brand: 'HP',
    },
    {
      id: 8,
      name: 'Smartphone Pro',
      price: 899,
      originalPrice: 1099,
      image: 'https://via.placeholder.com/250x250?text=Smartphone',
      rating: 4.6,
      reviews: 567,
      discount: 18,
      inStock: true,
      category: 'Phones',
      brand: 'Apple',
    },
  ]);

  const [filters, setFilters] = useState({
    category: 'All',
    priceRange: [0, 2000],
    brand: 'All',
    rating: 0,
  });

  const [sortBy, setSortBy] = useState('popular');
  const [itemsPerPage, setItemsPerPage] = useState(12);

  const categories = ['All', 'Laptops', 'Desktops', 'Phones', 'Accessories'];
  const brands = ['All', 'Dell', 'HP', 'Lenovo', 'Apple', 'Sony', 'LG', 'Logitech'];
  const ratings = [0, 3.5, 4, 4.5, 5];

  const filteredProducts = products.filter((product) => {
    if (
      filters.category !== 'All' &&
      product.category !== filters.category
    ) {
      return false;
    }
    if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
      return false;
    }
    if (filters.brand !== 'All' && product.brand !== filters.brand) {
      return false;
    }
    if (product.rating < filters.rating) {
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
        return b.id - a.id;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <div className="shop-page">
      <div className="shop-container">
        {/* Filters Sidebar */}
        <aside className="filters-sidebar">
          <h3>🔍 Filters</h3>

          {/* Category Filter */}
          <div className="filter-group">
            <h4>Category</h4>
            {categories.map((cat) => (
              <label key={cat}>
                <input
                  type="radio"
                  name="category"
                  checked={filters.category === cat}
                  onChange={() => setFilters({ ...filters, category: cat })}
                />
                {cat}
              </label>
            ))}
          </div>

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

          {/* Brand Filter */}
          <div className="filter-group">
            <h4>Brand</h4>
            {brands.map((brand) => (
              <label key={brand}>
                <input
                  type="radio"
                  name="brand"
                  checked={filters.brand === brand}
                  onChange={() => setFilters({ ...filters, brand })}
                />
                {brand}
              </label>
            ))}
          </div>

          {/* Rating Filter */}
          <div className="filter-group">
            <h4>Rating</h4>
            {ratings.map((rating) => (
              <label key={rating}>
                <input
                  type="radio"
                  name="rating"
                  checked={filters.rating === rating}
                  onChange={() => setFilters({ ...filters, rating })}
                />
                {rating === 0 ? 'All Ratings' : `${rating}+ Stars ⭐`}
              </label>
            ))}
          </div>

          <button className="btn-filter-clear" onClick={() => setFilters({ category: 'All', priceRange: [0, 2000], brand: 'All', rating: 0 })}>
            Clear Filters
          </button>
        </aside>

        {/* Main Content */}
        <div className="shop-main">
          {/* Sort & Display Options */}
          <div className="sort-controls">
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
                <ProductCard key={product.id} product={product} />
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
