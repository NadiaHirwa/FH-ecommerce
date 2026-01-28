import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext';
import { PublicLayout } from './layouts/PublicLayout';

// Public Pages
import { Home } from './pages/public/Home/Home';
import { Shop } from './pages/public/Shop/Shop';
import { ProductDetail } from './pages/public/ProductDetail/ProductDetail';
import { Cart } from './pages/public/Cart/Cart';
import { Checkout } from './pages/public/Checkout/Checkout';
import { OrderSuccess } from './pages/public/OrderSuccess/OrderSuccess';
import { TrackOrder } from './pages/public/TrackOrder/TrackOrder';
import { SearchResults } from './pages/public/SearchResults/SearchResults';
import { About } from './pages/public/About/About';
import { Contact } from './pages/public/Contact/Contact';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/categories" element={<Shop />} /> {/* Reusing Shop for now */}
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/track-order" element={<TrackOrder />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* Placeholders for other static pages */}
            <Route path="/faq" element={<div className="container-custom py-12"><h1>FAQ</h1></div>} />
            <Route path="/privacy" element={<div className="container-custom py-12"><h1>Privacy Policy</h1></div>} />
            <Route path="/terms" element={<div className="container-custom py-12"><h1>Terms & Conditions</h1></div>} />
            <Route path="/returns" element={<div className="container-custom py-12"><h1>Returns & Warranty</h1></div>} />
          </Route>
        </Routes>
        <Toaster position="bottom-right" />
      </Router>
    </CartProvider>
  );
}

export default App;
