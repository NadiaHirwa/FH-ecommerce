import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import type { Product } from '../../types';
import laptop from '../../assets/categories/laptop.jpg';
import monitor from '../../assets/categories/monitor.jpg';
import keyboard from '../../assets/categories/keyboard-mouse.jpg';
import headphones from '../../assets/categories/headphones.jpg';
import storage from '../../assets/categories/storage.jpg';
import accessory from '../../assets/categories/accessory.jpg';
import heroBanner from '../../assets/hero-banner.png';
import './Home.css';

const CATEGORY_DATA = {
  'Computers': [
    'Laptops',
    'Desktops / PCs',
    'Mini PCs',
    'All-in-One PCs'
  ],

  'Components & Parts': [
    'Processors (CPU)',
    'Motherboards',
    'RAM',
    'Graphics Cards (GPU)',
    'Power Supplies (PSU)',
    'Cooling Systems',
    'Computer Cases'
  ],

  'Storage': [
    'SSD',
    'HDD',
    'External Storage',
    'Flash Drives',
    'Memory Cards'
  ],

  'Computer Accessories': [
    'Keyboards',
    'Mouse',
    'Webcams',
    'USB Hubs',
    'Laptop Stands',
    'Laptop Bags & Sleeves'
  ],

  'Audio & Video': [
    'Headphones & Headsets',
    'Earphones',
    'Bluetooth Earbuds',
    'Speakers',
    'Microphones',
    'Projectors',
    'Audio Cables & Adapters'
  ],

  'Phones & Tablets': [
    'Smartphones',
    'Tablets',
    'Phone Cases',
    'Screen Protectors'
  ],

  'Networking': [
    'Routers',
    'Modems',
    'Switches',
    'Network Cables',
    'Wi-Fi Extenders',
    'Network Adapters'
  ],

  'Office Equipment': [
    'Printers',
    'Scanners',
    'Ink Cartridges',
    'Toner Cartridges',
    'Printer Paper'
  ],

  'Power & Electrical': [
    'Chargers',
    'Power Banks',
    'UPS',
    'Adapters',
    'Extension Cables'
  ],

  'Tools & Maintenance': [
    'Tool Kits',
    'Cleaning Kits',
    'Thermal Paste',
    'Replacement Parts'
  ]
};

const Home: React.FC = () => {
  // Sample products
  const [products] = useState([
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
      description: 'Powerful laptop for professionals',
      category: 'Laptops',
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
      description: 'Ergonomic wireless mouse',
      category: 'Accessories',
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
      description: 'Multi-port USB-C hub',
      category: 'Accessories',
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
      description: 'High-performance mechanical keyboard',
      category: 'Accessories',
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
      description: 'Beautiful 4K display monitor',
      category: 'Monitors',
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
      description: 'Premium wireless headphones',
      category: 'Audio',
    },
    {
      id: '7',
      name: 'Smart Watch Series 5',
      price: 299,
      originalPrice: 399,
      image: accessory,
      rating: 4.6,
      reviews: 189,
      discount: 25,
      inStock: true,
      description: 'Advanced health monitoring',
      category: 'Weaables',
    },
    {
      id: '8',
      name: 'External SSD 1TB',
      price: 89,
      originalPrice: 129,
      image: storage,
      rating: 4.9,
      reviews: 543,
      discount: 31,
      inStock: true,
      description: 'High-speed portable storage',
      category: 'Storage',
    },
    {
      id: '9',
      name: 'Gaming Mouse RGB',
      price: 59,
      originalPrice: 79,
      image: accessory,
      rating: 4.7,
      reviews: 321,
      discount: 25,
      inStock: true,
      description: 'Precision gaming mouse',
      category: 'Gaming',
    },
    {
      id: '10',
      name: 'Tablet Pro 11"',
      price: 799,
      originalPrice: 899,
      image: laptop, // Using laptop placeholder for tablet if needed or just laptop
      rating: 4.8,
      reviews: 210,
      discount: 11,
      inStock: true,
      description: 'Versatile tablet for creativity',
      category: 'Tablets',
    },
    {
      id: '11',
      name: 'Bluetooth Speaker',
      price: 129,
      originalPrice: 179,
      image: headphones, // Placeholder
      rating: 4.5,
      reviews: 156,
      discount: 28,
      inStock: true,
      description: 'Portable powerful sound',
      category: 'Audio',
    },
    {
      id: '12',
      name: 'Webcam 1080p',
      price: 69,
      originalPrice: 99,
      image: monitor, // Placeholder
      rating: 4.4,
      reviews: 134,
      discount: 30,
      inStock: true,
      description: 'Crystal clear video calls',
      category: 'Accessories',
    },
  ]);

  const handleAddToCart = (product: Product) => {
    console.log('Added to cart:', product);
    alert(`${product.name} added to cart!`);
  };

  // Category Carousel Logic
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const categoryImages = [laptop, monitor, keyboard, headphones, storage, accessory];

  // Create circular data: [Clone End] [Original] [Clone Start]
  // We'll duplicate the list 3 times to ensure smooth infinite scrolling
  const originalCategories = Object.keys(CATEGORY_DATA).map((key, index) => ({
    id: index,
    name: key,
    image: categoryImages[index % categoryImages.length],
    count: (CATEGORY_DATA as any)[key].length * 12 + 5,
  }));

  const featuredCategories = [...originalCategories, ...originalCategories, ...originalCategories];

  // Initialize scroll position to the middle set
  React.useEffect(() => {
    if (scrollContainerRef.current) {
      const scrollWidth = scrollContainerRef.current.scrollWidth;
      const oneSetWidth = scrollWidth / 3;
      scrollContainerRef.current.scrollLeft = oneSetWidth;
    }
  }, []);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth } = scrollContainerRef.current;
      const oneSetWidth = scrollWidth / 3;

      // If we've scrolled past the second set (into the third), reset to start of second
      if (scrollLeft >= 2 * oneSetWidth) {
        scrollContainerRef.current.scrollLeft = scrollLeft - oneSetWidth;
      }
      // If we've scrolled into the first set (before the second), reset to end of second
      else if (scrollLeft <= 0) {
        scrollContainerRef.current.scrollLeft = scrollLeft + oneSetWidth;
      }
      // Added a buffer for left scrolling to prevent hitting 0 wall too hard
      else if (scrollLeft < oneSetWidth / 2) {
        // Optional: logic to keep checking bounds or seamless transition
        // For simple checks, strictly keeping it within range [oneSetWidth, 2*oneSetWidth] is tricky with smooth scroll
        // So we primarily catch the overflows
      }
    }
  };

  // More robust check on scroll end to reset position
  const handleScrollEnd = () => {
    // Intentionally left blank or use for snapping adjustments
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const oneSetWidth = scrollWidth / 3;

      // If near end of second set, jump back before scrolling more
      if (scrollLeft >= 2 * oneSetWidth - clientWidth) {
        scrollContainerRef.current.scrollLeft = scrollLeft - oneSetWidth;
        // Then scroll
        requestAnimationFrame(() => {
          scrollContainerRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
        });
      } else {
        scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
      }
    }
  };

  // Popular Products Carousel Logic
  // Matches 'Featured Categories' logic exactly for consistency
  const popularScrollRef = React.useRef<HTMLDivElement>(null);

  // Triple the list to enable infinite scrolling illusion
  // We use slice(0, 8) to get the top 8 products, then triple them
  const basePopularProducts = products.slice(0, 8);
  const popularProducts = [...basePopularProducts, ...basePopularProducts, ...basePopularProducts];

  const handlePopularScroll = () => {
    if (popularScrollRef.current) {
      const { scrollLeft, scrollWidth } = popularScrollRef.current;
      const oneSetWidth = scrollWidth / 3;

      // Reset to middle set if we hit the boundaries
      if (scrollLeft >= 2 * oneSetWidth) {
        popularScrollRef.current.scrollLeft = scrollLeft - oneSetWidth;
      } else if (scrollLeft <= 0) {
        popularScrollRef.current.scrollLeft = scrollLeft + oneSetWidth;
      }
    }
  };

  const scrollPopularLeft = () => {
    if (popularScrollRef.current) {
      // Check if we need to wrap before scrolling
      const { scrollLeft, scrollWidth } = popularScrollRef.current;
      const oneSetWidth = scrollWidth / 3;

      if (scrollLeft <= 10) {
        popularScrollRef.current.scrollTo({ left: oneSetWidth, behavior: 'auto' });
        // Allow a brief tick for the jump to register before smoothing? 
        // Actually, if we just rely on handleScroll to catch bounds, we can just scrollBy.
        // But for buttons, manual wrapping is safer.
        // Let's use simple scrollBy and let handleScroll catch it, 
        // OR proactively jump like we did for categories.
      }
      popularScrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollPopularRight = () => {
    if (popularScrollRef.current) {
      popularScrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  // Initialize scroll position to the middle set
  React.useEffect(() => {
    if (popularScrollRef.current) {
      const scrollWidth = popularScrollRef.current.scrollWidth;
      const oneSetWidth = scrollWidth / 3;
      popularScrollRef.current.scrollLeft = oneSetWidth;
    }
  }, [popularProducts]);

  return (
    <div className="home-page">
      {/* Hero Banner */}
      <section className="hero-banner" style={{ backgroundImage: `url(${heroBanner})` }}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <p className="hero-subtitle">Find the best electronics for you</p>
          <h1>Find Your Perfect Gadget</h1>

          <p className="browse-text">Or Browse Featured Categories</p>

          <div className="hero-category-pills">
            {Object.keys(CATEGORY_DATA).map((category) => (
              <Link
                key={category}
                to={`/shop/category/${category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                className="category-pill"
              >
                <span>{category}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="featured-categories">
        <div className="container">
          <div className="section-header">
            <h2>Explore Our Featured Categories</h2>
            <Link to="/categories" className="view-all-link">
              Show All Categories ↗
            </Link>
          </div>
          <div className="carousel-wrapper">
            <button className="carousel-nav-btn prev" onClick={scrollLeft} aria-label="Previous categories">
              ‹
            </button>

            <div
              className="categories-scroll-container"
              ref={scrollContainerRef}
              onScroll={handleScroll}
            >
              {featuredCategories.map((category, index) => (
                <Link
                  key={`${category.id}-${index}`} // Unique key for duplicates
                  to={`/shop/category/${category.name.toLowerCase()}`}
                  className="category-card"
                >
                  <div className="category-image-wrapper">
                    <img src={category.image} alt={category.name} />
                  </div>
                  <h3>{category.name}</h3>
                  <div className="category-details">
                    <p>{category.count} Products</p>
                    <span className="browse-link">Browse &rarr;</span>
                  </div>
                </Link>
              ))}
            </div>

            <button className="carousel-nav-btn next" onClick={scrollRight} aria-label="Next categories">
              ›
            </button>
          </div>
        </div>
      </section>

      {/* Popular Products */}
      {/* <section className="popular-products">
        <div className="container">
          <div className="section-header">
            <h2>Trending Now</h2>
            <Link to="/shop" className="view-all-link">
              View All Products ↗
            </Link>
          </div>
          <div className="carousel-wrapper trending-carousel-wrapper">
            <button className="carousel-nav-btn prev" onClick={scrollPopularLeft} aria-label="Previous products">
              ‹
            </button>
            <div
              className="products-grid trending-products-grid"
              ref={popularScrollRef}
              onScroll={handlePopularScroll}
            >
              {popularProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
              ))}
            </div>
            <button className="carousel-nav-btn next" onClick={scrollPopularRight} aria-label="Next products">
              ›
            </button>
          </div>
        </div>
      </section> */}

      {/* New Arrivals */}
      <section className="new-arrivals">
        <div className="container">
          <div className="section-header">
            <h2>⭐ New Arrivals</h2>
            <Link to="/shop?sort=newest" className="view-all-link">
              View All New Products ↗
            </Link>
          </div>
          <div className="products-grid">
            {products.slice(0, 4).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                badge="New"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Promotions Banner */}
      {/* <section className="promotions-banner">
        <div className="container">
          <div className="promo-card">
            <div className="promo-content">
              <h3>🎉 Special Offer</h3>
              <p>20% OFF Everything!</p>
              <p className="promo-code">Code: WELCOME20</p>
              <p className="promo-date">Ends Jan 31, 2026</p>
            </div>
            <Link to="/shop" className="btn btn-white">
              Shop Now
            </Link>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default Home;
