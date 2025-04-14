// src/components/Meals/getmeals.js
export const getMeals = async () => {
    const response = await fetch('http://localhost:5000/api/meals'); // Adjust your API URL here
    if (!response.ok) {
        throw new Error('Failed to fetch meals');
    }
    const data = await response.json();
    return data; // Return meal data
};
