import React, { useState } from 'react';
import { WishlistGrid } from '../../../components/Dashboard/WishlistGrid';
import './Wishlist.css';

interface WishlistItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  addedDate: string;
}

const Wishlist: React.FC = () => {
  const [items, setItems] = useState<WishlistItem[]>([
    { id: '1', productId: 'p1', name: 'Gaming Laptop Pro', price: 1299.99, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop', addedDate: '2026-01-25' },
    { id: '2', productId: 'p2', name: 'Wireless Headphones', price: 199.99, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop', addedDate: '2026-01-20' },
    { id: '3', productId: 'p3', name: '4K Monitor 32"', price: 499.99, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop', addedDate: '2026-01-15' },
    { id: '4', productId: 'p4', name: 'Mechanical Keyboard', price: 149.99, image: 'https://images.unsplash.com/photo-1587829191301-17e3b0d6c621?w=400&h=400&fit=crop', addedDate: '2026-01-10' },
    { id: '5', productId: 'p5', name: 'Gaming Mouse', price: 79.99, image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop', addedDate: '2026-01-05' },
  ]);

  const handleRemove = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleAddToCart = (id: string) => {
    alert(`Added ${items.find(i => i.id === id)?.name} to cart!`);
  };

  return (
    <div className="wishlist-page">
      <div className="page-header">
        <h1>My Wishlist</h1>
        <p>{items.length} item(s) in your wishlist</p>
      </div>

      <WishlistGrid
        items={items}
        onAddToCart={handleAddToCart}
        onRemove={handleRemove}
      />
    </div>
  );
};

export default Wishlist;
