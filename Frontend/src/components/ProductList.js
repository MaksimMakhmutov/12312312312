import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../api/productApi';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import styled from 'styled-components';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
`;
const Card = styled(Link)`
  display: block;
  padding: 12px;
  border: 1px solid #eee;
  border-radius: 8px;
  text-decoration: none;
  color: inherit;
  &:hover {
    box-shadow: 0 3px 12px rgba(0, 0, 0, 0.08);
  }
  img {
    width: 100%;
    height: 160px;
    object-fit: cover;
    border-radius: 6px;
    margin-bottom: 8px;
  }
`;

const ProductList = () => {
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const limit = 6;

  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const load = async () => {
      const res = await getProducts({ q, category, page, limit });
      setData(res.data);
      setTotal(res.total);
    };
    load();
  }, [q, category, page]);

  return (
    <div style={{ padding: '16px 20px' }}>
      <h2>Products</h2>
      <SearchBar
        q={q}
        setQ={setQ}
        category={category}
        setCategory={setCategory}
      />
      <Grid>
        {data.map((p) => (
          <Card key={p._id} to={`/products/${p._id}`}>
            <img src={p.image} alt={p.name} />
            <h4>{p.name}</h4>
            <div>{p.category}</div>
            <strong>${p.price}</strong>
          </Card>
        ))}
      </Grid>
      <Pagination total={total} limit={limit} page={page} setPage={setPage} />
    </div>
  );
};
export default ProductList;
