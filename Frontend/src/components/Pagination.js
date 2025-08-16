import styled from 'styled-components';

const Row = styled.div`
  display: flex;
  gap: 6px;
  margin: 16px 0;
`;
const Btn = styled.button`
  padding: 6px 10px;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 6px;
  cursor: pointer;
  &[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Pagination = ({ total, limit, page, setPage }) => {
  const pages = Math.max(Math.ceil((total || 0) / (limit || 6)), 1);
  if (pages <= 1) return null;

  const go = (p) => {
    if (p >= 1 && p <= pages) setPage(p);
  };

  return (
    <Row>
      <Btn onClick={() => go(page - 1)} disabled={page <= 1}>
        Prev
      </Btn>
      {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
        <Btn key={p} onClick={() => go(p)} disabled={p === page}>
          {p}
        </Btn>
      ))}
      <Btn onClick={() => go(page + 1)} disabled={page >= pages}>
        Next
      </Btn>
    </Row>
  );
};

export default Pagination;
