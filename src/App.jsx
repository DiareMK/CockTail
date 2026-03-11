import React from 'react';
import CocktailsFeed from './components/CocktailsFeed';
import LoginForm from './components/LoginForm';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header style={{ backgroundColor: '#282c34', padding: '20px', color: '#fff', textAlign: 'center' }}>
        <h1>Cocktail Explorer - ЛР6</h1>
      </header>
      <main style={{ padding: '20px' }}>
        <LoginForm />
        <hr style={{ margin: '40px 0', border: 'none', borderBottom: '1px solid #ddd' }} />
        <CocktailsFeed />
      </main>
    </div>
  );
}

export default App;
