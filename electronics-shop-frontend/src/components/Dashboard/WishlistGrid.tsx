import React from 'react';

interface WishlistItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  addedDate: string;
}

interface WishlistGridProps {
  items: WishlistItem[];
  onAddToCart: (itemId: string) => void;
  onRemove: (itemId: string) => void;
}

export const WishlistGrid: React.FC<WishlistGridProps> = ({
  items,
  onAddToCart,
  onRemove,
}) => {
  if (items.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-icon">💔</p>
        <h3>Wishlist is Empty</h3>
        <p>Add items to your wishlist to save them for later.</p>
      </div>
    );
  }

  return (
    <div className="wishlist-grid">
      {items.map(item => (
        <div key={item.id} className="wishlist-card">
          <div className="wishlist-image">
            <img src={item.image} alt={item.name} />
            <button
              className="remove-btn"
              onClick={() => onRemove(item.id)}
              title="Remove from wishlist"
            >
              ✕
            </button>
          </div>
          <div className="wishlist-content">
            <h4>{item.name}</h4>
            <p className="price">${item.price.toFixed(2)}</p>
            <p className="added-date">
              Added {new Date(item.addedDate).toLocaleDateString()}
            </p>
            <button
              className="btn btn-primary"
              onClick={() => onAddToCart(item.id)}
              style={{ width: '100%', marginTop: '0.5rem' }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
