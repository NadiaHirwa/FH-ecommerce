import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { AccountMenu } from './components/AccountMenu/AccountMenu';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { useState } from 'react';

// Pages
import Home from './pages/Home/Home'; 
import Shop from './pages/Shop/Shop';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import OrderSuccess from './pages/OrderSuccess/OrderSuccess';
import TrackOrder from './pages/TrackOrder/TrackOrder';
import SearchResults from './pages/SearchResults/SearchResults';
import Category from './pages/Category/Category';
import AboutUs from './pages/AboutUs/AboutUs';
import ContactUs from './pages/ContactUs/ContactUs';
import FAQ from './pages/FAQ/FAQ';
import PrivacyPolicy from './pages/Policies/PrivacyPolicy';
import Terms from './pages/Policies/Terms';
import ReturnsWarranty from './pages/Policies/ReturnsWarranty';

// Auth Pages
import Login from './pages/Auth/Login/Login';
import Register from './pages/Auth/Register/Register';
import ForgotPassword from './pages/Auth/ForgotPassword/ForgotPassword';
import ResetPassword from './pages/Auth/ResetPassword/ResetPassword';
import VerifyEmail from './pages/Auth/VerifyEmail/VerifyEmail';

// Error & System Pages
import NotFound from './pages/errors/NotFound';
import Unauthorized from './pages/errors/Unauthorized';
import ServerError from './pages/errors/ServerError';
import Maintenance from './pages/errors/Maintenance';
import SessionExpired from './pages/errors/SessionExpired';

// Customer Dashboard Pages
import { DashboardLayout } from './pages/Dashboard/DashboardLayout';
import Overview from './pages/Dashboard/Overview/Overview';
import MyOrders from './pages/Dashboard/MyOrders/MyOrders';
import Wishlist from './pages/Dashboard/Wishlist/Wishlist';
import SavedAddresses from './pages/Dashboard/SavedAddresses/SavedAddresses';
import ProfileSettings from './pages/Dashboard/ProfileSettings/ProfileSettings';
import ChangePassword from './pages/Dashboard/ChangePassword/ChangePassword';
import Support from './pages/Dashboard/Support/Support';

// Employee Dashboard Pages
import { EmployeeDashboardLayout } from './pages/EmployeeDashboard/EmployeeDashboardLayout';
import { EmployeeOverview } from './pages/EmployeeDashboard/Overview';
import { AssignedOrders } from './pages/EmployeeDashboard/AssignedOrders';
import { Inventory } from './pages/EmployeeDashboard/Inventory';
import { SalesPOS } from './pages/EmployeeDashboard/SalesPOS';
import { Transactions } from './pages/EmployeeDashboard/Transactions';
import { CustomerMessages } from './pages/EmployeeDashboard/CustomerMessages';
import { EmployeeProfile } from './pages/EmployeeDashboard/EmployeeProfile';
import { ChangePassword as EmployeeChangePassword } from './pages/EmployeeDashboard/ChangePassword';
// Admin Dashboard Pages
import { AdminDashboardLayout } from './pages/AdminDashboard/AdminDashboardLayout';
import { AdminOverview } from './pages/AdminDashboard/Overview';
import { ProductManagement } from './pages/AdminDashboard/ProductManagement';
import { InventoryAdmin } from './pages/AdminDashboard/InventoryAdmin';
import { TransactionsAdmin } from './pages/AdminDashboard/TransactionsAdmin';
import { OrdersAdmin } from './pages/AdminDashboard/OrdersAdmin';
import { EmployeesAdmin } from './pages/AdminDashboard/EmployeesAdmin';
import { AdminSettings } from './pages/AdminDashboard/Settings';
import { CategoryManagement } from './pages/AdminDashboard/CategoryManagement';
import { BrandManagement } from './pages/AdminDashboard/BrandManagement';
import { CustomerManagement } from './pages/AdminDashboard/CustomersAdmin';
import { PromotionsAdmin } from './pages/AdminDashboard/PromotionsAdmin';
import { ReportsAdmin } from './pages/AdminDashboard/ReportsAdmin';
import { AuditLogsAdmin } from './pages/AdminDashboard/AuditLogsAdmin';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="app-wrapper">
            <Header
              cartItemsCount={0}
              onSearchChange={setSearchQuery}
              onCartClick={() => window.location.href = '/cart'}
              onAccountClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
            />

            <AccountMenu
              isOpen={isAccountMenuOpen}
              onClose={() => setIsAccountMenuOpen(false)}
            />

            <main className="main-content">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/shop/category/:category" element={<Category />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/search" element={<SearchResults query={searchQuery} />} />

                {/* Auth Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/verify-email" element={<VerifyEmail />} />

                {/* Customer Dashboard Routes */}
                <Route path="/dashboard" element={<DashboardLayout><Overview /></DashboardLayout>} />
                <Route path="/dashboard/orders" element={<DashboardLayout><MyOrders /></DashboardLayout>} />
                <Route path="/dashboard/wishlist" element={<DashboardLayout><Wishlist /></DashboardLayout>} />
                <Route path="/dashboard/addresses" element={<DashboardLayout><SavedAddresses /></DashboardLayout>} />
                <Route path="/dashboard/profile" element={<DashboardLayout><ProfileSettings /></DashboardLayout>} />
                <Route path="/dashboard/password" element={<DashboardLayout><ChangePassword /></DashboardLayout>} />
                <Route path="/dashboard/support" element={<DashboardLayout><Support /></DashboardLayout>} />

                {/* Employee Dashboard Routes */}
                <Route path="/employee-dashboard" element={<EmployeeDashboardLayout><EmployeeOverview /></EmployeeDashboardLayout>} />
                <Route path="/employee-dashboard/orders" element={<EmployeeDashboardLayout><AssignedOrders /></EmployeeDashboardLayout>} />
                <Route path="/employee-dashboard/inventory" element={<EmployeeDashboardLayout><Inventory /></EmployeeDashboardLayout>} />
                <Route path="/employee-dashboard/sales" element={<EmployeeDashboardLayout><SalesPOS /></EmployeeDashboardLayout>} />
                <Route path="/employee-dashboard/transactions" element={<EmployeeDashboardLayout><Transactions /></EmployeeDashboardLayout>} />
                <Route path="/employee-dashboard/messages" element={<EmployeeDashboardLayout><CustomerMessages /></EmployeeDashboardLayout>} />
                <Route path="/employee-dashboard/profile" element={<EmployeeDashboardLayout><EmployeeProfile /></EmployeeDashboardLayout>} />
                <Route path="/employee-dashboard/password" element={<EmployeeDashboardLayout><EmployeeChangePassword /></EmployeeDashboardLayout>} />

                {/* Admin Dashboard Routes */}
                <Route path="/admin" element={<AdminDashboardLayout><AdminOverview /></AdminDashboardLayout>} />
                <Route path="/admin/products" element={<AdminDashboardLayout><ProductManagement /></AdminDashboardLayout>} />
                <Route path="/admin/inventory" element={<AdminDashboardLayout><InventoryAdmin /></AdminDashboardLayout>} />
                <Route path="/admin/categories" element={<AdminDashboardLayout><CategoryManagement /></AdminDashboardLayout>} />
                <Route path="/admin/brands" element={<AdminDashboardLayout><BrandManagement /></AdminDashboardLayout>} />
                <Route path="/admin/promotions" element={<AdminDashboardLayout><PromotionsAdmin /></AdminDashboardLayout>} />
                <Route path="/admin/reports" element={<AdminDashboardLayout><ReportsAdmin /></AdminDashboardLayout>} />
                <Route path="/admin/audit-logs" element={<AdminDashboardLayout><AuditLogsAdmin /></AdminDashboardLayout>} />
                <Route path="/admin/orders" element={<AdminDashboardLayout><OrdersAdmin /></AdminDashboardLayout>} />
                <Route path="/admin/transactions" element={<AdminDashboardLayout><TransactionsAdmin /></AdminDashboardLayout>} />
                <Route path="/admin/employees" element={<AdminDashboardLayout><EmployeesAdmin /></AdminDashboardLayout>} />
                <Route path="/admin/customers" element={<AdminDashboardLayout><CustomerManagement /></AdminDashboardLayout>} />
                <Route path="/admin/settings" element={<AdminDashboardLayout><AdminSettings /></AdminDashboardLayout>} />

                {/* Cart Routes */}
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-success" element={<OrderSuccess />} />
                <Route path="/track-order" element={<TrackOrder />} />

                {/* Info Routes */}
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/returns" element={<ReturnsWarranty />} />

                {/* System Routes */}
                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route path="/server-error" element={<ServerError />} />
                <Route path="/maintenance" element={<Maintenance />} />
                <Route path="/session-expired" element={<SessionExpired />} />

                {/* Catch-all */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
