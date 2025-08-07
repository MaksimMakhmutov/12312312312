import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProductById } from '../api/productApi';
import { useCart } from '../cart/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProductById(id);
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const handleAddToCart = () => {
    const confirmed = window.confirm(`Add "${product.name}" to cart?`);
    if (confirmed) {
      addToCart(product);
    }
  };

  return (
    <div>
      <h2>{product.name}</h2>
      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          style={{ width: '300px', height: 'auto' }}
        />
      )}
      <p>Price: ${product.price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};
export default ProductDetails;
