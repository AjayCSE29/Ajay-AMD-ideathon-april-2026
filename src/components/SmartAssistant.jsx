import React, { useState } from 'react';
import { Bot, X, Search, ShoppingCart, Sparkles, ChevronRight, Plus } from 'lucide-react';

const SmartAssistant = ({ onSearch, recommendations, onAddToCart, cart, userInterests }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setHasSearched(value.trim().length > 0);
    onSearch(value);
  };

  const handleClear = () => {
    setQuery('');
    setHasSearched(false);
    onSearch('');
  };

  const isInCart = (productId) => cart?.some(item => item.id === productId);

  // Get personalized recommendations based on interests
  const getPersonalizedRecs = () => {
    if (!userInterests || Object.keys(userInterests).length === 0) return [];
    
    // Sort tags by frequency
    const topTags = Object.entries(userInterests)
      .sort((a, b) => b[1] - a[1])
      .map(entry => entry[0]);

    const recs = [];
    const usedIds = new Set(cart.map(item => item.id));

    for (const tag of topTags) {
      const match = recommendations?.find(p => p.tags.includes(tag) && !usedIds.has(p.id));
      if (match) {
        recs.push({ ...match, reason: `Based on your interest in ${tag}` });
        usedIds.add(match.id);
      }
      if (recs.length >= 2) break;
    }
    return recs;
  };

  const personalizedRecs = getPersonalizedRecs();
  const displayRecs = hasSearched ? (recommendations || []).slice(0, 3) : [];

  return (
    <div className="smart-assistant-wrapper">
      {isOpen && (
        <div className="assistant-panel glass-panel">
          <div className="assistant-header">
            <Bot size={24} className="ai-icon" />
            <h3 style={{ margin: 0, fontSize: '1.1rem', flex: 1 }}>Smart Assistant</h3>
            <Sparkles size={16} style={{ color: 'var(--accent-color)', opacity: 0.7 }} />
          </div>

          <div className="assistant-body">
            {!hasSearched && personalizedRecs.length > 0 && (
              <div className="assistant-personalized-recs">
                <div className="rec-label" style={{ color: 'var(--accent-color)' }}>
                  <Sparkles size={14} /> Recommended for you
                </div>
                {personalizedRecs.map(product => (
                  <div key={`personal-${product.id}`} className="rec-item personalized" style={{ borderLeft: '3px solid var(--accent-color)' }}>
                    <img src={product.image} alt={product.title} className="rec-item-img" />
                    <div className="rec-item-info">
                      <div className="rec-item-title">{product.title}</div>
                      <div className="rec-reason" style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>{product.reason}</div>
                    </div>
                    <button className="rec-add-btn" onClick={() => onAddToCart(product)}>
                      <Plus size={14} />
                    </button>
                  </div>
                ))}
                <div style={{ height: '1.5rem', borderBottom: '1px solid var(--border-color)', marginBottom: '1.5rem' }} />
              </div>
            )}

            <div className="assistant-message">
              <p>Tell me what you're looking for!</p>
            </div>

            <div className="search-input-wrapper">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder='e.g. "hoodie under 100"'
                value={query}
                onChange={handleInputChange}
                autoFocus
              />
              {query && (
                <button className="clear-search-btn" onClick={handleClear}>×</button>
              )}
            </div>

            {/* Dynamic Search Results */}
            {hasSearched && (
              <div className="assistant-recommendations">
                <div className="rec-label">
                  <Search size={14} /> {displayRecs.length > 0 ? 'Matches Found' : 'No Matches'}
                </div>

                {displayRecs.map(product => (
                  <div key={product.id} className="rec-item">
                    <img src={product.image} alt={product.title} className="rec-item-img" />
                    <div className="rec-item-info">
                      <div className="rec-item-title">{product.title}</div>
                      <div className="rec-item-price">${product.price.toFixed(2)}</div>
                    </div>
                    {!isInCart(product.id) ? (
                      <button className="rec-add-btn" onClick={() => onAddToCart(product)}>
                        <ShoppingCart size={14} />
                      </button>
                    ) : (
                      <span className="rec-in-cart">Added</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      
      <button 
        className={`assistant-toggle ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Smart Assistant"
      >
        {isOpen ? <X size={24} /> : <Bot size={30} />}
      </button>
    </div>
  );
};

export default SmartAssistant;
