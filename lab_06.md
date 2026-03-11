# Звіт до Лабораторної роботи №6

## 1. Код кастомного хука useFetch.js

```javascript
import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(url, { signal });
        if (!response.ok) {
          throw new Error('Помилка завантаження даних');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        if (err.name === 'AbortError') {
          console.log('Запит скасовано');
        } else {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
```

## 2. Код компонента CocktailsFeed

```jsx
const CocktailsFeed = () => {
  const { data, isLoading, error } = useFetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita');

  if (isLoading) return <div>Завантаження коктейлів...</div>;
  if (error) return <div>Помилка: {error}</div>;

  return (
    <div className="grid">
      {data?.drinks?.map((drink) => (
        <div key={drink.idDrink} className="card">
          <img src={drink.strDrinkThumb} alt={drink.strDrink} />
          <h3>{drink.strDrink}</h3>
        </div>
      ))}
    </div>
  );
};
```

## 3. Відповіді на контрольні запитання

**1) Призначення AbortController у нашому хуку та яку загрозу він усуває?**
`AbortController` дозволяє нам скасувати активний `fetch` запит. Він усуває загрозу витоку пам'яті та помилок при спробі оновити стан вже розмонтованого компонента (Memory Leak). Також це запобігає виконанню застарілих запитів, якщо URL змінився дуже швидко.

**2) Що таке патерн "Тріада станів" і чому він обов'язковий для якісного UX?**
Тріада станів - це обов'язкова обробка трьох фаз асинхронної операції: Loading (завантаження), Error (помилка) та Data (успішні дані). Це критично для UX, оскільки користувач завжди повинен розуміти поточний статус: чи дані ще в дорозі, чи сталась проблема, чи все пройшло успішно. Порожній екран без фідбеку викликає роздратування.

**3) Чому функція запиту (fetch) розміщується всередині useEffect?**
Запит даних - це "побічний ефект" (Side Effect), який не повинен виконуватися безпосередньо під час рендеру. Розміщення у `useEffect` дозволяє контролювати, коли саме робити запит (наприклад, тільки при монтуванні або зміні URL) та гарантує, що ми не створимо нескінченний цикл запитів при кожному оновленні стану.

**4) Які переваги використання axios у порівнянні з нативним fetch?**
- `axios` автоматично перетворює дані в JSON формат.
- Він викидає помилку (`catch`) при будь-якому статусі, що не є 2xx (fetch робить це тільки при мережевих помилках).
- Підтримує перехоплювачі (Interceptors) для додавання токенів до всіх запитів.
- Має вбудовану підтримку захисту від XSRF.
- Дозволяє легше налаштовувати базовий URL та тайм-аути.

**5) Опис ризиків багу "Стан гонитви" (Race Condition) при швидкому перемиканні сторінок.**
Race Condition виникає, коли кілька асинхронних запитів виконуються одночасно, і той, що був відправлений пізніше, завершується раніше за попередній (або навпаки). Без `AbortController` або перевірки актуальності, у стані компонента можуть опинитися дані від старого запиту, що призведе до відображення невірної інформації на сторінці.

---
**Коміт:** ЛР6: feat: init project and integrate CocktailDB API
