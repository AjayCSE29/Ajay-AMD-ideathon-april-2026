import React, { useState, useEffect } from 'react';
import ProductGrid from './components/ProductGrid';
import SmartAssistant from './components/SmartAssistant';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import { products as initialProducts } from './data/products';
import { Sparkles, ShoppingCart } from 'lucide-react';

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cart, setCart] = useState([]);
  const [currentView, setCurrentView] = useState('shop');
  const [userInterests, setUserInterests] = useState({});

  const trackInterest = (tags) => {
    setUserInterests(prev => {
      const updated = { ...prev };
      tags.forEach(tag => {
        updated[tag] = (updated[tag] || 0) + 1;
      });
      return updated;
    });
  };

  const handleAddToCart = (product) => {
    if (!cart.find(item => item.id === product.id)) {
      setCart([...cart, { ...product, quantity: 1 }]);
      trackInterest(product.tags);
    }
  };

  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, delta) => {
    setCart(cart.map(item => {
      if (item.id === productId) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  // Simple "AI" matching algorithm
  const handleAssistantSearch = (query) => {
    setIsProcessing(true);
    
    // Simulate slight delay for "processing"
    setTimeout(() => {
      if (!query.trim()) {
        setProducts(initialProducts);
        setIsProcessing(false);
        return;
      }

      const lowerQuery = query.toLowerCase();
      // Track search terms as interests
      trackInterest(lowerQuery.split(' ').filter(w => w.length > 2));
      
      const filtered = initialProducts.filter(product => {
        // Regex to extract price limit if user says "under X" or "<X"
        const priceMatch = lowerQuery.match(/(?:under|<)\s*(\d+)/);
        let maxPrice = Infinity;
        if (priceMatch && priceMatch[1]) {
          maxPrice = parseInt(priceMatch[1], 10);
        }

        // If a price limit was stated, drop product immediately if over budget
        if (product.price >= maxPrice) return false;

        // Clean query from price text so we don't try filtering keywords by 'under' or '1000'
        const cleanQuery = lowerQuery.replace(/(?:under|<)\s*(\d+)/, '').trim();
        
        // If query only had price bounds and is now empty, return true (budget match)
        if (cleanQuery.length === 0) return true;

        // Otherwise match keywords in category, title, description, tags
        if (product.category.toLowerCase().includes(cleanQuery)) return true;
        if (product.title.toLowerCase().includes(cleanQuery)) return true;
        if (product.description.toLowerCase().includes(cleanQuery)) return true;
        if (product.tags.some(tag => cleanQuery.includes(tag))) return true;
        
        // Handling color keywords simply
        if (cleanQuery.includes('black') && product.tags.includes('black')) return true;
        if (cleanQuery.includes('dark') && product.tags.includes('black')) return true;
        if (cleanQuery.includes('naruto') && product.tags.includes('ninja')) return true; // implicit matching
        
        return false;
      });
      
      setProducts(filtered);
      setIsProcessing(false);
    }, 300);
  };

  return (
    <div className="app-container">
      <header className="header glass-panel">
        <h1>
          Neo Tokyo <Sparkles size={24} style={{ color: 'var(--accent-color)' }} />
        </h1>
        <nav style={{ display: 'flex', gap: '1.5rem', fontFamily: 'Outfit', fontWeight: 600, alignItems: 'center' }}>
          <span className="nav-link" style={{ color: currentView === 'shop' ? 'var(--accent-color)' : 'var(--text-primary)', cursor: 'pointer' }} onClick={() => setCurrentView('shop')}>Shop</span>
          <span className="nav-link" style={{ color: 'var(--text-secondary)', cursor: 'pointer' }}>Categories</span>
          <div className="nav-cart-btn" style={{ position: 'relative', display: 'flex', alignItems: 'center', cursor: 'pointer', color: currentView === 'cart' ? 'var(--accent-blue)' : 'var(--accent-color)' }} onClick={() => setCurrentView('cart')}>
            <ShoppingCart size={24} />
            {cart.length > 0 && (
              <span className="cart-badge">{cart.reduce((total, item) => total + item.quantity, 0)}</span>
            )}
          </div>
        </nav>
      </header>

      <main className="main-content">
        {currentView === 'shop' ? (
          <>
            <section className="hero">
              <h2>Level Up Your Style</h2>
              <p>Discover premium anime merchandise. From high-quality streetwear to exclusive collectibles, curated for true fans.</p>
            </section>

            <section style={{ opacity: isProcessing ? 0.5 : 1, transition: 'opacity 0.3s' }}>
              <ProductGrid 
                products={products} 
                cart={cart}
                onAddToCart={handleAddToCart}
                onRemoveFromCart={handleRemoveFromCart}
              />
            </section>
          </>
        ) : currentView === 'cart' ? (
          <CartPage 
            cart={cart}
            onUpdateQuantity={updateQuantity}
            onRemoveFromCart={handleRemoveFromCart}
            onCheckout={() => setCurrentView('checkout')}
            onBackToShop={() => setCurrentView('shop')}
          />
        ) : currentView === 'checkout' ? (
          <CheckoutPage 
            cart={cart}
            onBackToCart={() => setCurrentView('cart')}
            onOrderComplete={() => {
              setCart([]);
              setCurrentView('shop');
            }}
          />
        ) : null}
      </main>

      <SmartAssistant 
        onSearch={handleAssistantSearch} 
        recommendations={products}
        onAddToCart={handleAddToCart}
        cart={cart}
        userInterests={userInterests}
      />
    </div>
  );
}

export default App;
