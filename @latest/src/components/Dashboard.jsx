import React, { useState } from "react";
import "./Dashboard.css";

function Dashboard({ user }) {
  const nutrientDB = {
    Apple: { calories: 95, carbs: 25, protein: 0.5, fat: 0.3, vitaminC: 8, iron: 0.1 },
    Milk: { calories: 150, carbs: 12, protein: 8, fat: 8, calcium: 275, vitaminD: 2 },
    Rice: { calories: 206, carbs: 45, protein: 4, fat: 0.4, iron: 0.2 },
    Egg: { calories: 78, carbs: 0.6, protein: 6, fat: 5, vitaminD: 1.1, iron: 0.8 },
    Banana: { calories: 105, carbs: 27, protein: 1.3, fat: 0.3, vitaminC: 9, potassium: 422 },
    Spinach: { calories: 23, carbs: 3.6, protein: 2.9, fat: 0.4, iron: 2.7, calcium: 99 },
    Almonds: { calories: 164, carbs: 6, protein: 6, fat: 14, calcium: 76, iron: 1 },
    Chicken: { calories: 165, carbs: 0, protein: 31, fat: 3.6, iron: 1 },
  };

  const [food, setFood] = useState("");
  const [quantity, setQuantity] = useState("");
  const [foodList, setFoodList] = useState([]);

  const handleAdd = (e) => {
    e.preventDefault();

    const base = nutrientDB[food];
    const qty = parseFloat(quantity);

    if (!base) {
      alert("Food not found in our database. Try: Apple, Milk, Rice, Egg, etc.");
      return;
    }

    if (!qty || qty <= 0) {
      alert("Please enter a valid quantity (in grams/ml)");
      return;
    }

    // Assume DB values are for 100g/ml
    const factor = qty / 100;

    const scaled = {};
    for (const key in base) {
      scaled[key] = base[key] * factor;
    }

    setFoodList([...foodList, { name: food, quantity: qty, ...scaled }]);
    setFood("");
    setQuantity("");
  };

  // Totals
  const totals = foodList.reduce(
    (sum, f) => {
      Object.keys(f).forEach((k) => {
        if (k !== "name" && k !== "quantity") sum[k] = (sum[k] || 0) + f[k];
      });
      return sum;
    },
    {}
  );

  // Simple deficiency logic
  const deficiencies = [];
  if (totals.protein < 50) deficiencies.push("Protein");
  if (totals.calcium < 1000) deficiencies.push("Calcium");
  if (totals.iron < 10) deficiencies.push("Iron");
  if (totals.vitaminD < 5) deficiencies.push("Vitamin D");
  if (totals.vitaminC < 60) deficiencies.push("Vitamin C");

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1>Welcome, {user.name} 👋</h1>
        <p>
          {user.age} yrs | {user.gender} | {user.height} cm | {user.weight} kg |{" "}
          Activity: {user.activity}
        </p>

        <form onSubmit={handleAdd} className="food-form">
          <input
            type="text"
            placeholder="Food (e.g. Apple, Rice)"
            value={food}
            onChange={(e) => setFood(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Qty (g/ml)"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
          <button type="submit">Add</button>
        </form>

        <div className="nutrient-summary">
          <h3>Nutrition Summary</h3>
          <div className="bars">
            <p>Calories: {totals.calories?.toFixed(1) || 0} kcal</p>
            <p>Protein: {totals.protein?.toFixed(1) || 0} g</p>
            <p>Carbs: {totals.carbs?.toFixed(1) || 0} g</p>
            <p>Fat: {totals.fat?.toFixed(1) || 0} g</p>
            <p>Iron: {totals.iron?.toFixed(1) || 0} mg</p>
            <p>Calcium: {totals.calcium?.toFixed(1) || 0} mg</p>
            <p>Vitamin D: {totals.vitaminD?.toFixed(1) || 0} µg</p>
            <p>Vitamin C: {totals.vitaminC?.toFixed(1) || 0} mg</p>
          </div>
        </div>

        <div className="food-list">
          <h3>Foods Added</h3>
          <ul>
            {foodList.map((item, index) => (
              <li key={index}>
                ✅ {item.name} ({item.quantity}g) — {item.calories.toFixed(1)} kcal
              </li>
            ))}
          </ul>
        </div>

        {deficiencies.length > 0 ? (
          <div className="deficiency-alerts">
            <h4>⚠️ Deficiencies Detected:</h4>
            <ul>
              {deficiencies.map((item, i) => (
                <li key={i}>{item} is below required level.</li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="healthy">✅ You're balanced today!</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
