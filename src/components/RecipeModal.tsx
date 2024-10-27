import { X, Clock, Users } from 'lucide-react';

interface RecipeModalProps {
  recipe: {
    title: string;
    image: string;
    prepTime: string;
    servings: string;
    ingredients: string[];
    instructions: string[];
    nutrition: {
      calories: string;
      protein: string;
      carbs: string;
      fat: string;
    };
  };
  onClose: () => void;
}

export default function RecipeModal({ recipe, onClose }: RecipeModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-64 object-cover rounded-t-lg"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-2"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-bold text-[#4a581f] mb-4">{recipe.title}</h2>
          
          <div className="flex gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#4a581f]" />
              <span>{recipe.prepTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-[#4a581f]" />
              <span>{recipe.servings} servings</span>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-bold mb-2">Ingredients</h3>
            <ul className="list-disc list-inside space-y-1">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="font-bold mb-2">Instructions</h3>
            <ol className="list-decimal list-inside space-y-2">
              {recipe.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </div>

          <div>
            <h3 className="font-bold mb-2">Nutrition Facts</h3>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center">
                <p className="font-semibold">{recipe.nutrition.calories}</p>
                <p className="text-sm">Calories</p>
              </div>
              <div className="text-center">
                <p className="font-semibold">{recipe.nutrition.protein}</p>
                <p className="text-sm">Protein</p>
              </div>
              <div className="text-center">
                <p className="font-semibold">{recipe.nutrition.carbs}</p>
                <p className="text-sm">Carbs</p>
              </div>
              <div className="text-center">
                <p className="font-semibold">{recipe.nutrition.fat}</p>
                <p className="text-sm">Fat</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}