import React, { useState, useEffect } from 'react';

export const AdminProductForm = ({
  onProductAdded,
  product = null,
  isEditMode = false,
}) => {
  const [form, setForm] = useState({
    name: '',
    price: '',
    image: '',
  });

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || '',
        price: product.price || '',
        image: product.image || '',
      });
    }
  }, [product]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = {
      ...form,
      price: parseFloat(form.price),
    };

    const url = isEditMode
      ? `http://localhost:3001/products/${product.id}`
      : 'http://localhost:3001/products';

    const method = isEditMode ? 'PUT' : 'POST';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    });

    if (!isEditMode) {
      setForm({ name: '', price: '', image: '' }); // сброс только при добавлении
    }

    onProductAdded();
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <h3>{isEditMode ? 'Редактировать товар' : 'Добавить товар'}</h3>
      <input
        type="text"
        name="name"
        placeholder="Название"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Цена"
        value={form.price}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="image"
        placeholder="URL картики"
        value={form.image}
        onChange={handleChange}
        required
      />
      <button type="submit">{isEditMode ? 'Сохранить' : 'Добавить'}</button>
    </form>
  );
};
