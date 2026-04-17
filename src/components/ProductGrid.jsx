import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, cart, onAddToCart, onRemoveFromCart }) => {
  if (!products || products.length === 0) {
    return (
      <div className="product-grid">
        <div className="empty-state">
          <h3>No products found</h3>
          <p>Try refining your search or browsing our other categories.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => {
        const inCart = cart.some(item => item.id === product.id);
        return (
          <ProductCard 
            key={product.id} 
            product={product} 
            inCart={inCart}
            onAddToCart={() => onAddToCart(product)}
            onRemoveFromCart={() => onRemoveFromCart(product.id)}
          />
        );
      })}
    </div>
  );
};

export default ProductGrid;
