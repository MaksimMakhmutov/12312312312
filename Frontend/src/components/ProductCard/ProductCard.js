// src/components/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export const ProductCard = ({ id, image, name, price }) => {
  return (
    <div className="product-card">
      <Link to={`/products/${id}`}>
        <img src={image} alt={name} style={{ width: '100%' }} />
        <h3>{name}</h3>
        <p>Цена: {price} $</p>
      </Link>
    </div>
  );
};
