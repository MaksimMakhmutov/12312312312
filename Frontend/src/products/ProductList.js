import { useEffect, useState } from 'react';
import { getProducts } from '../api/productApi';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [order, setOrder] = useState('asc');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 6; // товаров на странице

  const loadProducts = async () => {
    const { data, total } = await getProducts({
      page,
      limit,
      sortBy,
      order,
      category,
      search,
    });
    setProducts(data);
    setTotalPages(Math.ceil(total / limit));
    console.log(total);
  };

  useEffect(() => {
    loadProducts();
  }, [page, sortBy, order, category, search]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // сбрасываем на первую страницу при новом поиске
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setPage(1);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setPage(1);
  };

  const handleOrderChange = (e) => {
    setOrder(e.target.value);
    setPage(1);
  };

  return (
    <div>
      <h2>Products</h2>

      {/* Панель фильтров */}
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={handleSearchChange}
          style={{ marginRight: '10px' }}
        />

        <select value={category} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="clothes">Clothes</option>
          <option value="books">Books</option>
        </select>

        <select
          value={sortBy}
          onChange={handleSortChange}
          style={{ marginLeft: '10px' }}
        >
          <option value="name">Sort by Name</option>
          <option value="price">Sort by Price</option>
        </select>

        <select
          value={order}
          onChange={handleOrderChange}
          style={{ marginLeft: '10px' }}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {/* Список товаров */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1rem',
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{ border: '1px solid #ccc', padding: '10px' }}
          >
            <Link to={`/products/${product.id}`}>
              <img
                src={product.image || 'https://via.placeholder.com/150'}
                alt={product.name}
                style={{ width: '100%' }}
              />
              <h3>{product.name}</h3>
            </Link>
            <p>Price - ${product.price}</p>
            <p>Category - {product.category}</p>
          </div>
        ))}
      </div>

      {/* Пагинация */}
      <div style={{ marginTop: '1rem' }}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setPage(index + 1)}
            disabled={page === index + 1}
            style={{
              margin: '0 5px',
              background: page === index + 1 ? '#333' : '#fff',
              color: page === index + 1 ? '#fff' : '#000',
              border: '1px solid #ccc',
              padding: '5px 10px',
              cursor: 'pointer',
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
