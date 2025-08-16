import styled from 'styled-components';

const Wrap = styled.div`
  margin: 16px 0;
  display: flex;
  gap: 8px;
`;
const Input = styled.input`
  padding: 8px 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  min-width: 280px;
`;
const Select = styled.select`
  padding: 8px 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
`;

const SearchBar = ({ q, setQ, category, setCategory }) => {
  return (
    <Wrap>
      <Input
        placeholder="Search by name..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <Select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">All categories</option>
        <option value="clothes">clothes</option>
        <option value="electronics">electronics</option>
      </Select>
    </Wrap>
  );
};

export default SearchBar;
