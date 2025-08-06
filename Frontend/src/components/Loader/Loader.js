import React from 'react';
import './Loader.css'; // Импортируем стили для загрузчика

const Loader = () => {
    return (
        <div className="loader">
            <div className="spinner"></div>
            <p>Загрузка...</p>
        </div>
    );
};

export default Loader;

//123