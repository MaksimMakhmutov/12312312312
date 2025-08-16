import { useCart } from '../contexts/CartContext';
import styled from 'styled-components';

const Box = styled.div`
  padding: 16px 20px;
`;
const Row = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr auto auto auto;
  gap: 12px;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 6px;
  }
`;
const Qty = styled.input`
  width: 70px;
  padding: 6px 8px;
  border: 1px solid #ddd;
  border-radius: 6px;
`;
const Btn = styled.button`
  padding: 6px 10px;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 6px;
  cursor: pointer;
`;

const Cart = () => {
  const { items, updateQuantity, removeFromCart, clearCart, total } = useCart();

  return (
    <Box>
      <h2>Cart</h2>
      {items.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {items.map((i) => (
            <Row key={i.productId}>
              <img src={i.image} alt={i.name} />
              <div>
                <div>
                  <strong>{i.name}</strong>
                </div>
                <div>${i.price}</div>
              </div>
              <Qty
                type="number"
                min="1"
                value={i.quantity}
                onChange={(e) =>
                  updateQuantity(i.productId, Number(e.target.value) || 1)
                }
              />
              <div>
                <strong>${(i.price * i.quantity).toFixed(2)}</strong>
              </div>
              <Btn onClick={() => removeFromCart(i.productId)}>Remove</Btn>
            </Row>
          ))}
          <h3>Total: ${total.toFixed(2)}</h3>
          <Btn onClick={clearCart}>Clear cart</Btn>
        </>
      )}
    </Box>
  );
};

export default Cart;
