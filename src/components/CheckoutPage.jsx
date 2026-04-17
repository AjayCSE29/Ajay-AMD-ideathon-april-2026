import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, Package } from 'lucide-react';

const CheckoutPage = ({ cart, onBackToCart, onOrderComplete }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: ''
  });

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal + (subtotal * 0.08);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call for payment processing
    setTimeout(() => {
      setIsSubmitting(false);
      setOrderPlaced(true);

      // Return to shop after showing success for 3 seconds
      setTimeout(() => {
        onOrderComplete();
      }, 3000);
    }, 1500);
  };

  if (orderPlaced) {
    return (
      <div className="checkout-success glass-panel">
        <CheckCircle size={64} className="success-icon" />
        <h2>Order Placed Successfully!</h2>
        <p>Thank you, {formData.name}. Your loot is being packed and prepared for dispatch.</p>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '2rem' }}>Redirecting to shop...</p>
      </div>
    );
  }

  // Fallback if somehow they got here with no cart
  if (cart.length === 0) {
    return (
      <div className="checkout-container">
        <button className="back-btn" onClick={onOrderComplete}>
          <ArrowLeft size={20} /> Back to Shop
        </button>
        <p style={{ marginTop: '2rem' }}>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <button className="back-btn" onClick={onBackToCart}>
          <ArrowLeft size={20} /> Back to Cart
        </button>
        <h2 style={{ fontFamily: 'Outfit, sans-serif' }}>Secure Checkout</h2>
      </div>

      <div className="checkout-layout">
        <form className="checkout-form glass-panel" onSubmit={handleSubmit}>
          <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.8rem' }}>Shipping Information</h3>
          
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              required 
              placeholder="Takeshi Kovacs"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Shipping Address</label>
            <textarea 
              id="address" 
              name="address" 
              required 
              rows="3"
              placeholder="123 Neon Street, District 4"
              value={formData.address}
              onChange={handleInputChange}
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input 
              type="tel" 
              id="phone" 
              name="phone" 
              required 
              placeholder="+1 (555) 019-2834"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>

          <button 
            type="submit" 
            className="place-order-btn" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : `Place Order - $${total.toFixed(2)}`}
          </button>
        </form>

        <div className="checkout-order-summary glass-panel">
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Package size={20} /> Order Summary
          </h3>
          
          <div className="checkout-items">
            {cart.map(item => (
              <div key={item.id} className="checkout-item-mini">
                <img src={item.image} alt={item.title} />
                <div className="mini-info">
                  <div className="mini-title">{item.title}</div>
                  <div className="mini-qty">Qty: {item.quantity} <span>${(item.price * item.quantity).toFixed(2)}</span></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mini-total-row mt-4 pt-4 border-t">
            <span>Total to pay</span>
            <span style={{ color: 'var(--accent-color)', fontWeight: 'bold' }}>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
