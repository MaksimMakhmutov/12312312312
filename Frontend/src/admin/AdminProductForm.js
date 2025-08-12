import { useState } from 'react';
import { addProduct } from '../api/productApi';

const AdminProductForm = ({ onProductAdded }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !category) {
      alert('Please fill in all required fields');
      return;
    }

    const newProduct = {
      name,
      category,
      price: parseFloat(price),
      image: image || 'https://via.placeholder.com/150',
    };

    await addProduct(newProduct);

    setName('');
    setCategory('');
    setPrice('');
    setImage('');

    if (onProductAdded) {
      onProductAdded();
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <h3>Add Product</h3>
      <input
        type="text"
        placeholder="Product name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AdminProductForm;
