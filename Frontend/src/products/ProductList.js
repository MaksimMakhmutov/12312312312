import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../api/productApi';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    fetch();
  }, []);

  return (
    <div>
      <h2>Products</h2>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            style={{
              border: '1px solid #ccc',
              padding: '1rem',
              width: '200px',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                style={{ width: '100%', height: '150px', objectFit: 'cover' }}
              />
            )}
            <h3>{product.name}</h3>
            <p>${product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default ProductList;
