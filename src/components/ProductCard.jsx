import React, { useState } from 'react';
import { ShoppingCart, Trash2, ImageOff } from 'lucide-react';

const ProductCard = ({ product, inCart, onAddToCart, onRemoveFromCart }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="product-card glass-panel group">
      <div className="product-image-container">
        {product.badge && (
          <div className="product-badge">
            {product.badge}
          </div>
        )}
        
        {/* Skeleton UI shown when not loaded and no error */}
        {!isLoaded && !hasError && <div className="image-skeleton" />}
        
        {/* Fallback UI shown when error occurs */}
        {hasError ? (
          <div className="image-fallback">
            <ImageOff size={40} opacity={0.5} />
            <span>Image not available</span>
          </div>
        ) : (
          <img 
            src={product.image} 
            alt={product.title} 
            className="product-image"
            style={{ opacity: isLoaded ? 1 : 0 }}
            onLoad={() => setIsLoaded(true)}
            onError={() => {
              setHasError(true);
              setIsLoaded(true);
            }}
          />
        )}
      </div>
      <div className="product-info">
        <div className="product-category">{product.category}</div>
        <h3 className="product-title">{product.title}</h3>
        <div className="product-price">${product.price.toFixed(2)}</div>
        
        <div className="card-actions">
          {inCart ? (
            <button className="remove-from-cart-btn" onClick={onRemoveFromCart}>
              <Trash2 size={18} className="cart-icon" />
              <span>Remove from Cart</span>
            </button>
          ) : (
            <button className="add-to-cart-btn" onClick={onAddToCart}>
              <ShoppingCart size={18} className="cart-icon" />
              <span>Add to Cart</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
