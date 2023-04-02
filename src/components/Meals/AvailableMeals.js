import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useState, useEffect } from "react";

const AvailableMeals = () => {
  const [mealData, setMealData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHtppError] = useState(false);

  const fetchHandler = async () => {
    const response = await fetch(
      "https://deneme-4a033-default-rtdb.firebaseio.com/meals.json"
    );
    if (!response.ok) {
      throw new Error("something is wrong");
    }
    const data = await response.json();
    const uptadetedMeals = [];
    for (const key in data) {
      uptadetedMeals.push({
        id: key,
        name: data[key].name,
        description: data[key].description,
        price: data[key].price,
      });
    }
    setMealData(uptadetedMeals);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchHandler().catch(error=>{
      setIsLoading(false)
      setHtppError(error.message)})
    }, []);

  if (isLoading) {
    return (
      <section>
        <p className={classes.MealsLoading}>Loading..</p>
      </section>
    );
  }
  if (httpError) {
    return (
      <section>
        <p className={classes.MealError}>{httpError}</p>
      </section>
    );
  }
  const mealsList = mealData.map((meal) => (
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
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
