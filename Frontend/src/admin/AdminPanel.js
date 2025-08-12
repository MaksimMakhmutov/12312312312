import { useEffect, useState } from 'react';
import { deleteProduct, getAllProducts } from '../api/productApi';
import { getUsers, updateUserRole, deleteUser } from '../api/authApi';
import { useAuth } from '../auth/AuthContext';
import AdminProductForm from './AdminProductForm';

const AdminPanel = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    loadProducts();
    loadUsers();
  }, []);

  const loadProducts = async () => {
    const allProducts = await getAllProducts();
    setProducts(allProducts);
  };

  const loadUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this product?')) {
      await deleteProduct(id);
      loadProducts();
    }
  };

  const handleRoleChange = async (id, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    await updateUserRole(id, newRole);
    loadUsers();
  };

  const handleDeleteUser = async (id) => {
    if (id === user.id) {
      alert("You can't delete yourself.");
      return;
    }
    if (window.confirm('Delete this user?')) {
      await deleteUser(id);
      loadUsers();
    }
  };

  return (
    <div>
      <h2>Admin Panel</h2>

      <h3>Add Product</h3>
      <AdminProductForm onProductAdded={loadProducts} />

      <h3>Products</h3>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} — ${p.price}
            <button onClick={() => handleDelete(p.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h3>Users</h3>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>Change Role</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <button onClick={() => handleRoleChange(u.id, u.role)}>
                  Set as {u.role === 'admin' ? 'User' : 'Admin'}
                </button>
              </td>
              <td>
                <button onClick={() => handleDeleteUser(u.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
