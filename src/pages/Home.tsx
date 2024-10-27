import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import RecipeCard from '../components/RecipeCard';
import RecipeModal from '../components/RecipeModal';
import { searchRecipes, getRecipeById } from '../utils/api';

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [mealType, setMealType] = useState('');

  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = async (query = '') => {
    try {
      setLoading(true);
      const filters = {
        cuisine: cuisine || undefined,
        type: mealType || undefined,
        number: 10
      };
      const results = await searchRecipes(query, filters);
      setRecipes(results);
    } catch (error) {
      console.error('Error loading recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    loadRecipes(searchQuery);
  };

  const handleRecipeClick = async (id: number) => {
    try {
      const recipe = await getRecipeById(id);
      setSelectedRecipe(recipe);
    } catch (error) {
      console.error('Error loading recipe details:', error);
    }
  };

  return (
    <div className="pb-20">
      <div className="sticky top-0 bg-background z-10 p-6 space-y-4">
        <form onSubmit={handleSearch}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search recipes..."
              className="input-field pl-10"
            />
          </div>
        </form>

        <div className="flex gap-4">
          <select
            value={cuisine}
            onChange={(e) => {
              setCuisine(e.target.value);
              loadRecipes(searchQuery);
            }}
            className="input-field flex-1"
          >
            <option value="">Cuisine</option>
            <option value="italian">Italian</option>
            <option value="indian">Indian</option>
            <option value="mexican">Mexican</option>
          </select>

          <select
            value={mealType}
            onChange={(e) => {
              setMealType(e.target.value);
              loadRecipes(searchQuery);
            }}
            className="input-field flex-1"
          >
            <option value="">Meal Type</option>
            <option value="breakfast">Breakfast</option>
            <option value="main course">Main Course</option>
            <option value="dessert">Dessert</option>
          </select>
        </div>
      </div>

      <div className="p-6 grid gap-6">
        {loading ? (
          <div className="text-center">Loading recipes...</div>
        ) : (
          recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              {...recipe}
              onClick={() => handleRecipeClick(recipe.id)}
            />
          ))
        )}
      </div>

      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}

      <BottomNav />
    </div>
  );
}