import React, { useState } from 'react';
import useFetch from '../hooks/useFetch';
import CocktailCard from './CocktailCard';

const CocktailsFeed = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, isLoading, error } = useFetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita');

  if (isLoading) return <div style={{ textAlign: 'center', padding: '50px' }}>Завантаження...</div>;
  if (error) return <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>Помилка: {error}</div>;

  // Логічна помилка: використання && замість ||
  // Фільтр нічого не знайде, якщо назва не збігається ОДНОЧАСНО з іншим критерієм
  const filteredDrinksBug = data?.drinks?.filter(drink => 
    drink.strDrink.toLowerCase().includes(searchTerm.toLowerCase()) && 
    drink.strCategory === 'Non Alcoholic' // Наприклад, маркер, що вимагає і того, і іншого
  );

  // Правильна фільтрація
  const filteredDrinksFixed = data?.drinks?.filter(drink => 
    drink.strDrink.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const drinksToDisplay = searchTerm ? filteredDrinksFixed : data?.drinks;

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <input 
          type="text" 
          placeholder="Пошук коктейлів..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '10px', width: '300px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
        gap: '25px' 
      }}>
        {drinksToDisplay?.map((drink) => (
          // Помилка: дубльовані ключі для демонстрації попередження в консолі
          // <CocktailCard key="duplicate-key" drink={drink} />
          
          // Правильний варіант
          <CocktailCard key={drink.idDrink} drink={drink} />
        ))}
      </div>
      
      {drinksToDisplay?.length === 0 && (
        <p style={{ textAlign: 'center', color: '#888' }}>Нічого не знайдено (можливо, через помилку && у фільтрі).</p>
      )}
    </div>
  );
};

export default CocktailsFeed;
