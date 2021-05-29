import React from 'react';
import AvaibleMeals from './AvaibleMeals';
import MealsSummary from './MealsSummary';

function Meals() {
  return (
    <React.Fragment>
      <MealsSummary />
      <AvaibleMeals />
    </React.Fragment>
  );
}

export default Meals;
