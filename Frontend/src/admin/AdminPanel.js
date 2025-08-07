import { useState, useEffect } from 'react';
import { getProducts, addProduct } from '../api/productApi';

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!name.trim() || !price || Number(price) <= 0 || !image.trim()) {
      setError('All fields are required and price must be positive.');
      return;
    }
    setError('');
    const newProduct = { name, price: Number(price), image };
    await addProduct(newProduct);
    setName('');
    setPrice('');
    setImage('');
    fetchProducts();
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <form onSubmit={handleAddProduct}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name"
          required
        />
        <input
          value={price}
          type="number"
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          required
        />
        <input
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Image URL"
          required
        />
        <button type="submit">Add Product</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} - ${p.price}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default AdminPanel;
