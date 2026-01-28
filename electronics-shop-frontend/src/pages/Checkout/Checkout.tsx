import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    sameAsShipping: false,
    shippingMethod: 'standard',
    paymentMethod: 'bank-transfer',
    paymentProof: null,
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: any) => {
    setFormData({ ...formData, paymentProof: e.target.files[0] });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/order-success');
    }
  };

  const shippingCost = formData.shippingMethod === 'standard' ? 0 : formData.shippingMethod === 'express' ? 50 : 100;
  const subtotal = 2043;
  const tax = 204;
  const total = subtotal + shippingCost + tax;

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h1>💳 Checkout</h1>

        {/* Step Indicator */}
        <div className="step-indicator">
          <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
            <span>1</span>
            <label>Address</label>
          </div>
          <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
            <span>2</span>
            <label>Payment</label>
          </div>
          <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
            <span>3</span>
            <label>Review</label>
          </div>
        </div>

        <div className="checkout-content">
          <form onSubmit={handleSubmit} className="checkout-form">
            {/* Step 1: Address */}
            {currentStep === 1 && (
              <div className="form-section">
                <h2>🏠 Billing Address</h2>
                <div className="form-grid">
                  <input type="text" name="firstName" placeholder="First Name" onChange={handleInputChange} required />
                  <input type="text" name="lastName" placeholder="Last Name" onChange={handleInputChange} required />
                </div>
                <input type="email" name="email" placeholder="Email" onChange={handleInputChange} required />
                <input type="tel" name="phone" placeholder="Phone Number" onChange={handleInputChange} required />
                <input type="text" name="address" placeholder="Street Address" onChange={handleInputChange} required />
                <div className="form-grid">
                  <input type="text" name="city" placeholder="City" onChange={handleInputChange} required />
                  <input type="text" name="state" placeholder="State" onChange={handleInputChange} required />
                  <input type="text" name="zip" placeholder="ZIP Code" onChange={handleInputChange} required />
                </div>
                <input type="text" name="country" placeholder="Country" onChange={handleInputChange} required />

                <label className="checkbox">
                  <input type="checkbox" name="sameAsShipping" onChange={(e) => setFormData({ ...formData, sameAsShipping: e.target.checked })} />
                  Same as Shipping Address
                </label>

                <h2>🚚 Shipping Method</h2>
                <div className="shipping-options">
                  {[
                    { id: 'standard', label: 'Standard (5-7 days)', price: 0 },
                    { id: 'express', label: 'Express (2-3 days)', price: 50 },
                    { id: 'overnight', label: 'Overnight (Next day)', price: 100 },
                  ].map((option) => (
                    <label key={option.id} className="radio-option">
                      <input type="radio" name="shippingMethod" value={option.id} checked={formData.shippingMethod === option.id} onChange={handleInputChange} />
                      {option.label} {option.price > 0 ? `- $${option.price}` : '- FREE'}
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Payment */}
            {currentStep === 2 && (
              <div className="form-section">
                <h2>💳 Payment Method</h2>
                <div className="payment-options">
                  <label className="payment-card">
                    <input type="radio" name="paymentMethod" value="bank-transfer" checked={formData.paymentMethod === 'bank-transfer'} onChange={handleInputChange} />
                    <div className="payment-card-content">
                      <h3>🏦 Bank Transfer</h3>
                      {formData.paymentMethod === 'bank-transfer' && (
                        <div className="payment-details">
                          <p><strong>Account Number:</strong> 1234567890</p>
                          <p><strong>Routing Number:</strong> 0987654321</p>
                          <p><strong>Bank Name:</strong> ElectroShop Bank</p>
                        </div>
                      )}
                    </div>
                  </label>

                  <label className="payment-card">
                    <input type="radio" name="paymentMethod" value="mobile-money" checked={formData.paymentMethod === 'mobile-money'} onChange={handleInputChange} />
                    <div className="payment-card-content">
                      <h3>📱 Mobile Money</h3>
                      {formData.paymentMethod === 'mobile-money' && (
                        <div className="payment-details">
                          <select>
                            <option>MTN MobileMoney</option>
                            <option>Airtel Money</option>
                            <option>Vodafone Cash</option>
                          </select>
                          <input type="tel" placeholder="Phone Number" />
                        </div>
                      )}
                    </div>
                  </label>
                </div>

                <h3>📄 Upload Payment Proof</h3>
                <div className="file-upload">
                  <input type="file" name="paymentProof" onChange={handleFileChange} accept="image/*,.pdf" />
                  <p>Drag file here or click to upload</p>
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {currentStep === 3 && (
              <div className="form-section">
                <h2>📋 Order Review</h2>
                <div className="order-items">
                  <h3>Items</h3>
                  <div className="item">
                    <span>Laptop Pro Max 15" × 2</span>
                    <span>$1,998</span>
                  </div>
                  <div className="item">
                    <span>Wireless Mouse × 1</span>
                    <span>$45</span>
                  </div>
                </div>

                <div className="billing-info">
                  <h3>Billing Address</h3>
                  <p>{formData.firstName} {formData.lastName}</p>
                  <p>{formData.address}</p>
                  <p>{formData.city}, {formData.state} {formData.zip}</p>
                  <p>{formData.country}</p>
                  <p>{formData.email}</p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="form-navigation">
              {currentStep > 1 && (
                <button type="button" className="btn btn-secondary" onClick={() => setCurrentStep(currentStep - 1)}>
                  ← Back
                </button>
              )}
              <button type="submit" className="btn btn-primary">
                {currentStep < 3 ? 'Next Step →' : 'Place Order'}
              </button>
            </div>
          </form>

          {/* Order Summary Sidebar */}
          <aside className="order-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost}`}</span>
            </div>
            <div className="summary-row">
              <span>Tax</span>
              <span>${tax}</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-total">
              <span>Total</span>
              <span>${total}</span>
            </div>

            <div className="secure-badge">
              🔒 Secure Checkout
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
