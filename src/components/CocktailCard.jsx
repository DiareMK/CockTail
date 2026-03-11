import React, { useState } from 'react';

const CocktailCard = ({ drink }) => {
  const [likes, setLikes] = useState(0);

  // Навмисна помилка (конкатенація рядків)
  const handleLikeBug = () => {
    setLikes(likes + '1'); 
  };

  // Правильний варіант
  const handleLikeFixed = () => {
    setLikes(likes + 1);
  };

  // Приклад нескінченного рендеру (розкоментуйте для демонстрації помилки)
  // const causeInfiniteRender = () => {
  //   setLikes(likes + 1);
  // };

  return (
    <div style={{ 
      backgroundColor: '#fff', 
      borderRadius: '12px', 
      overflow: 'hidden', 
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      paddingBottom: '15px'
    }}>
      <img 
        src={drink.strDrinkThumb} 
        alt={drink.strDrink} 
        style={{ width: '100%', height: '200px', objectFit: 'cover' }} 
      />
      <div style={{ padding: '15px' }}>
        <h3 style={{ margin: '0 0 10px 0' }}>{drink.strDrink}</h3>
        <p style={{ fontSize: '14px', color: '#666' }}>Лайків: {likes}</p>
        
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button onClick={handleLikeBug} style={{ fontSize: '12px' }}>Лайк (Bug)</button>
          <button onClick={handleLikeFixed} style={{ fontSize: '12px' }}>Лайк (Fix)</button>
          
          {/* Демонстрація нескінченного рендеру - виклик без анонімної функції */}
          {/* <button onClick={setLikes(likes + 1)}>Помилка рендеру</button> */}
        </div>
      </div>
    </div>
  );
};

export default CocktailCard;
