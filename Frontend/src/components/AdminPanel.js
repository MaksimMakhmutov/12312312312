import { useEffect, useState } from 'react';
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from '../api/productApi';
import { getAllUsers, updateUserRole } from '../api/userApi';
import styled from 'styled-components';

const Wrap = styled.div`
  padding: 16px 20px;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
`;
const Card = styled.div`
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 12px;
`;
const Row = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
  input {
    padding: 6px 8px;
    border: 1px solid #ddd;
    border-radius: 6px;
  }
`;

const AdminPanel = () => {
  // products
  const [prodForm, setProdForm] = useState({
    name: '',
    category: '',
    price: '',
    image: '',
  });
  const [list, setList] = useState([]);
  // users
  const [users, setUsers] = useState([]);

  const loadProducts = async () => {
    const res = await getProducts({ page: 1, limit: 100 });
    setList(res.data);
  };
  const loadUsers = async () => setUsers(await getAllUsers());

  useEffect(() => {
    loadProducts();
    loadUsers();
  }, []);

  const saveProduct = async (e) => {
    e.preventDefault();
    const payload = { ...prodForm, price: Number(prodForm.price) || 0 };
    if (!payload.name || !payload.category) return alert('Fill fields');
    await createProduct(payload);
    setProdForm({ name: '', category: '', price: '', image: '' });
    loadProducts();
  };

  const patchProduct = async (p) => {
    const price = Number(prompt('New price', p.price));
    if (Number.isNaN(price)) return;
    await updateProduct(p._id, { ...p, price });
    loadProducts();
  };

  const removeProduct = async (id) => {
    if (!window.confirm('Delete product?')) return;
    await deleteProduct(id);
    loadProducts();
  };

  const changeRole = async (u) => {
    const role = u.role === 'admin' ? 'user' : 'admin';
    await updateUserRole(u._id, role);
    loadUsers();
  };

  return (
    <Wrap>
      <h2>Admin</h2>
      <Grid>
        <Card>
          <h3>Create product</h3>
          <form onSubmit={saveProduct}>
            <Row>
              <input
                placeholder="Name"
                value={prodForm.name}
                onChange={(e) =>
                  setProdForm({ ...prodForm, name: e.target.value })
                }
              />
              <input
                placeholder="Category"
                value={prodForm.category}
                onChange={(e) =>
                  setProdForm({ ...prodForm, category: e.target.value })
                }
              />
            </Row>
            <Row>
              <input
                placeholder="Price"
                value={prodForm.price}
                onChange={(e) =>
                  setProdForm({ ...prodForm, price: e.target.value })
                }
              />
              <input
                placeholder="Image URL"
                value={prodForm.image}
                onChange={(e) =>
                  setProdForm({ ...prodForm, image: e.target.value })
                }
              />
            </Row>
            <button type="submit">Create</button>
          </form>

          <h3 style={{ marginTop: 16 }}>Products</h3>
          {list.map((p) => (
            <div
              key={p._id}
              style={{ borderTop: '1px solid #eee', padding: '8px 0' }}
            >
              <strong>{p.name}</strong> (${p.price}) — {p.category}
              <div style={{ display: 'inline-flex', gap: 8, marginLeft: 8 }}>
                <button onClick={() => patchProduct(p)}>Edit price</button>
                <button onClick={() => removeProduct(p._id)}>Delete</button>
              </div>
            </div>
          ))}
        </Card>

        <Card>
          <h3>Users</h3>
          {users.map((u) => (
            <div
              key={u._id}
              style={{
                borderTop: '1px solid #eee',
                padding: '8px 0',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <div>{u.email}</div>
              <div>
                <span style={{ marginRight: 8 }}>{u.role}</span>
                <button onClick={() => changeRole(u)}>
                  Set {u.role === 'admin' ? 'user' : 'admin'}
                </button>
              </div>
            </div>
          ))}
        </Card>
      </Grid>
    </Wrap>
  );
};

export default AdminPanel;
