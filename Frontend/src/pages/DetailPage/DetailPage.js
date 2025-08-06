import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import { useCart } from '../../bff/CartContext';

export const DetailPage = () => {
  const { id } = useParams(); // Получаем параметр id из URL
  const [data, setData] = useState(null); // Состояние для хранения данных
  const [loading, setLoading] = useState(true); // Состояние загрузки
  const [error, setError] = useState(null); // Состояние для хранения ошибок
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/products/${id}`); // Замените на нужный URL
        if (!response.ok) {
          throw new Error('Ошибка при получении данных');
        }
        const result = await response.json(); // Преобразуем ответ в JSON
        setData(result); // Устанавливаем данные в состояние
        console.log(result);
      } catch (err) {
        setError(err.message); // Устанавливаем сообщение об ошибке
      } finally {
        setLoading(false); // Завершаем загрузку
      }
    };

    fetchData();
  }, [id]); // Зависимость от id

  if (loading) {
    return <Loader />; // Показать загрузчик
  }
  if (error) {
    return <div>{error}</div>; // Показать ошибку
  }
  return (
    <div>
      <h2>Детали товара</h2>
      {data ? (
        <div>
          <h3>{data.name}</h3>
          <p>Цена: {data.price} $</p>
          <p>{data.description}</p>
          <img src={data.image} alt={data.name} style={{ width: '150px' }} />
          <button onClick={() => addToCart(data)}>Добавить в корзину</button>
        </div>
      ) : (
        <p>Данные не найдены.</p>
      )}
    </div>
  );
};
