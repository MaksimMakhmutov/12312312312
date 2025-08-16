import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../api/productApi';
import { useCart } from '../contexts/CartContext';
import styled from 'styled-components';

const Box = styled.div`
  padding: 16px 20px;
`;
const Img = styled.img`
  width: 320px;
  height: 320px;
  object-fit: cover;
  border-radius: 8px;
`;
const Btn = styled.button`
  padding: 8px 12px;
  background: #10b981;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const load = async () => setProduct(await getProductById(id));
    load();
  }, [id]);

  if (!product) return <Box>Loading...</Box>;

  const onAdd = async () => {
    setBusy(true);
    try {
      await addToCart(product._id, 1);
      alert('Added to cart');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box>
      <h2>{product.name}</h2>
      <Img src={product.image} alt={product.name} />
      <p>Category: {product.category}</p>
      <p>
        Price: <strong>${product.price}</strong>
      </p>
      <Btn disabled={busy} onClick={onAdd}>
        Add to cart
      </Btn>
    </Box>
  );
};

export default ProductDetail;
