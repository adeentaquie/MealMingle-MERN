// src/components/Meals/getmeals.js
export const getMeals = async () => {
    const response = await fetch('http://localhost:5000/api/meals'); // Adjust your API URL here
    if (!response.ok) {
        throw new Error('Failed to fetch meals');
    }
    const data = await response.json();
    return data; // Return meal data
};

export const getMealBySlug = async (slug) => {
    const response = await fetch(`http://localhost:5000/api/meals/slug/${slug}`); // ✅ This hits your backend
    if (!response.ok) {
      throw new Error('Failed to fetch meal by slug');
    }
    return await response.json();
  };