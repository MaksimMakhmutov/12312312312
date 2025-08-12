const API = 'http://localhost:3001/products';

export const getProducts = async ({
  page = 1,
  limit = 6,
  sortBy = 'name',
  order = 'asc',
  category = '',
  search = '',
}) => {
  let url = `${API}?_page=${page}&_limit=${limit}&_sort=${sortBy}&_order=${order}`;

  if (category) {
    url += `&category=${encodeURIComponent(category)}`;
  }
  if (search) {
    url += `&q=${encodeURIComponent(search)}`;
  }

  const res = await fetch(url, {
    headers: {
      Accept: 'application/json',
    },
  });

  // json-server отдаёт total только при _page и _limit
  const total = parseInt(res.headers.get('X-Total-Count'), 10) || 0;
  const data = await res.json();
  console.log(total, 'Total');

  return { data, total };
};
//для корзины
export const getAllProducts = async () => {
  const res = await fetch(`${API}`);
  return await res.json();
};

export const deleteProduct = async (id) => {
  await fetch(`${API}/${id}`, {
    method: 'DELETE',
  });
};

export const getProductById = async (id) => {
  const res = await fetch(`${API}/${id}`);
  return await res.json();
};

export const addProduct = async (product) => {
  const res = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  return await res.json();
};
