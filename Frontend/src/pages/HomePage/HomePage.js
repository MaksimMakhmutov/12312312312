import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../../components';

export const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/products') // json-server или другой backend
      .then((res) => res.json())
      .then((data) => {
        // берём первые 4 товара как "популярные"
        setProducts(data.slice(0, 4));
      });
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      {/* Приветствие */}
      <section style={{ marginBottom: '2rem' }}>
        <h1>Добро пожаловать в Online Store!</h1>
        <p>Найдите лучшие товары по доступным ценам прямо сейчас.</p>
        <Link to="/products">
          <button style={{ marginTop: '1rem' }}>Перейти к каталогу</button>
        </Link>
      </section>

      {/* Популярные товары */}
      <section style={{ marginBottom: '2rem' }}>
        <h2>Популярные товары</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
          }}
        >
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>

      {/* О магазине */}
      <section>
        <h2>Почему выбирают нас?</h2>
        <ul>
          <li>🔥 Низкие цены и акции каждую неделю</li>
          <li>📦 Быстрая доставка по всей стране</li>
          <li>🔄 Удобный возврат товаров</li>
          <li>⭐ Более 1000 довольных клиентов</li>
        </ul>
      </section>
    </div>
  );
};
