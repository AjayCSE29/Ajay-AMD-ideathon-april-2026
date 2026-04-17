import React from 'react';
import { ArrowLeft, Trash2, Plus, Minus, CreditCard } from 'lucide-react';

const CartPage = ({ cart, onUpdateQuantity, onRemoveFromCart, onCheckout, onBackToShop }) => {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  if (cart.length === 0) {
    return (
      <div className="cart-page-container">
        <button className="back-btn" onClick={onBackToShop}>
          <ArrowLeft size={20} /> Back to Shop
        </button>
        <div className="empty-state">
          <h3>Your cart is empty</h3>
          <p>Looks like you haven't added any premium loot yet.</p>
          <button className="add-to-cart-btn" style={{ maxWidth: '250px', margin: '2rem auto 0' }} onClick={onBackToShop}>
            Explore the Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page-container">
      <div className="cart-header">
        <button className="back-btn" onClick={onBackToShop}>
          <ArrowLeft size={20} /> Continue Shopping
        </button>
        <h2 style={{ fontFamily: 'Outfit, sans-serif' }}>Your Cart ({cart.reduce((sum, i) => sum + i.quantity, 0)} items)</h2>
      </div>

      <div className="cart-layout">
        <div className="cart-items-list">
          {cart.map((item) => (
            <div key={item.id} className="cart-item glass-panel">
              <img src={item.image} alt={item.title} className="cart-item-image" />
              
              <div className="cart-item-details">
                <div style={{ color: 'var(--accent-blue)', fontSize: '0.8rem', textTransform: 'uppercase' }}>{item.category}</div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{item.title}</h3>
                <div style={{ color: 'var(--accent-color)', fontWeight: 700, fontFamily: 'Outfit' }}>${item.price.toFixed(2)}</div>
              </div>

              <div className="cart-item-controls">
                <div className="quantity-controls">
                  <button className="qty-btn" onClick={() => onUpdateQuantity(item.id, -1)} disabled={item.quantity <= 1}>
                    <Minus size={16} />
                  </button>
                  <span className="qty-value">{item.quantity}</span>
                  <button className="qty-btn" onClick={() => onUpdateQuantity(item.id, 1)}>
                    <Plus size={16} />
                  </button>
                </div>
                
                <div className="item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>

                <button className="remove-item-btn" onClick={() => onRemoveFromCart(item.id)} aria-label="Remove item">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary glass-panel">
          <h3 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1.5rem', fontFamily: 'Outfit' }}>Order Summary</h3>
          
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Estimated Tax (8%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="summary-row" style={{ color: 'var(--accent-blue)' }}>
            <span>Shipping</span>
            <span>Free</span>
          </div>
          
          <div className="summary-total">
            <span>Total</span>
            <span style={{ color: 'var(--accent-color)' }}>${total.toFixed(2)}</span>
          </div>

          <button className="checkout-btn" onClick={onCheckout}>
            <CreditCard size={20} /> Secure Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
