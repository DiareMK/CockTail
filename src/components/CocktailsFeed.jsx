import React from 'react';
import useFetch from '../hooks/useFetch';

const CocktailsFeed = () => {
  const { data, isLoading, error } = useFetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita');

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <p>Завантаження коктейлів...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>
        <h3>Помилка</h3>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Стрічка коктейлів</h2>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
        gap: '25px' 
      }}>
        {data?.drinks?.map((drink) => (
          <div 
            key={drink.idDrink} 
            style={{ 
              backgroundColor: '#fff', 
              borderRadius: '12px', 
              overflow: 'hidden', 
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s'
            }}
          >
            <img 
              src={drink.strDrinkThumb} 
              alt={drink.strDrink} 
              style={{ width: '100%', height: '250px', objectFit: 'cover' }} 
            />
            <div style={{ padding: '15px' }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>{drink.strDrink}</h3>
              <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
                Категорія: {drink.strCategory}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CocktailsFeed;
