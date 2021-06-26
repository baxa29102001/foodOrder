import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import classes from './AvaibleMeals.module.css';
import MealItem from './MealItem/MealItem';

function AvaibleMeals() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch('https://food-order-b4d91-default-rtdb.firebaseio.com/meals.json')
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        const loaded = [];
        for (let key in res) {
          loaded.push({
            id: key,
            name: res[key].name,
            price: res[key].price,
            description: res[key].description,
          });
        }
        setData(loaded);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  }, []);
  const content = data.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {!loading && !error && content}
          {!loading && error && <p>{error}</p>}
          {loading && <p>Loading...</p>}
        </ul>
      </Card>
    </section>
  );
}

export default AvaibleMeals;
