import React from 'react';

export const CartItem = ({ item, onRemove, onQuantityChange }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid #ccc',
        padding: '1rem 0',
      }}
    >
      <img
        src={item.image}
        alt={item.name}
        style={{
          width: '80px',
          height: '80px',
          objectFit: 'cover',
          marginRight: '1rem',
          borderRadius: '8px',
        }}
      />
      <div style={{ flex: 1 }}>
        <h4>{item.name}</h4>
        <p>Цена: {item.price} ₽</p>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button onClick={() => onQuantityChange(item.id, -1)}>-</button>
          <span style={{ margin: '0 1rem' }}>{item.quantity}</span>
          <button onClick={() => onQuantityChange(item.id, 1)}>+</button>
        </div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <p><strong>{(item.price * item.quantity).toFixed(2)} ₽</strong></p>
        <button onClick={() => onRemove(item.id)}>Удалить</button>
      </div>
    </div>
  );
};