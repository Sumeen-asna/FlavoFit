import axios from 'axios';

const SPOONACULAR_API_KEY = '1ce4702d05aa4eb9b03eb9c17c06ddeb';
const GEMINI_SCANNER_KEY = 'AIzaSyA77clVbWV1YFIW7kW7cHbgfsoL1vld8Ao';
const GEMINI_RECIPE_KEY = 'AIzaSyB-8hF8HXfl2jyNvi7HvP0HJCuvEiZCcpk';

export const searchRecipes = async (query: string = '', filters: any = {}) => {
  try {
    const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
      params: {
        apiKey: SPOONACULAR_API_KEY,
        query,
        addRecipeInformation: true,
        fillIngredients: true,
        ...filters
      }
    });
    return response.data.results;
  } catch (error) {
    console.error('Spoonacular API error:', error);
    throw error;
  }
};

export const getRecipeById = async (id: number) => {
  try {
    const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
      params: {
        apiKey: SPOONACULAR_API_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error('Spoonacular API error:', error);
    throw error;
  }
};

export { GEMINI_SCANNER_KEY, GEMINI_RECIPE_KEY };