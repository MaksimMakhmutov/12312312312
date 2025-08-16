import { Router } from 'express';
import { authRequired } from '../middleware/auth.js';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

const router = Router();

// получить корзину пользователя
router.get('/', authRequired, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id });
  res.json(cart || { userId: req.user.id, items: [] });
});

// добавить товар
router.post('/add', authRequired, async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  const prod = await Product.findById(productId);
  if (!prod) return res.status(404).json({ message: 'Product not found' });

  const cart = await Cart.findOne({ userId: req.user.id });
  const existing = cart.items.find((i) => i.productId.toString() === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.items.push({
      productId,
      name: prod.name,
      price: prod.price,
      image: prod.image,
      quantity
    });
  }
  await cart.save();
  res.json(cart);
});

// изменить количество
router.patch('/item/:productId', authRequired, async (req, res) => {
  const { quantity } = req.body;
  if (!quantity || quantity < 1) return res.status(400).json({ message: 'Bad quantity' });

  const cart = await Cart.findOne({ userId: req.user.id });
  const item = cart.items.find((i) => i.productId.toString() === req.params.productId);
  if (!item) return res.status(404).json({ message: 'Item not in cart' });
  item.quantity = quantity;
  await cart.save();
  res.json(cart);
});

// удалить позицию
router.delete('/item/:productId', authRequired, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id });
  cart.items = cart.items.filter((i) => i.productId.toString() !== req.params.productId);
  await cart.save();
  res.json(cart);
});

// очистить корзину
router.delete('/clear', authRequired, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id });
  cart.items = [];
  await cart.save();
  res.json(cart);
});

export default router;