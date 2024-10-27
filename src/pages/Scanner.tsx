import { useState, useRef } from 'react';
import { Camera, Upload, Search, Loader2, Plus, X, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_SCANNER_KEY, searchRecipes } from '../utils/api';

const scannerModel = new GoogleGenerativeAI(GEMINI_SCANNER_KEY).getGenerativeModel({ model: 'gemini-1.5-pro-flash' });

export default function Scanner() {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [newIngredient, setNewIngredient] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedRecipes, setGeneratedRecipes] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const detectIngredientsFromImage = async (imageData: string) => {
    try {
      const prompt = `Analyze this image and list all visible food ingredients. Format the response as a CSV with one ingredient per line.`;
      const result = await scannerModel.generateContent([prompt, imageData]);
      const response = await result.response;
      const csvData = response.text();
      const detectedIngredients = csvData.split('\n').filter(Boolean); // Parse CSV format into an array of ingredients
      return detectedIngredients;
    } catch (error) {
      console.error('Error detecting ingredients:', error);
      return [];
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsAnalyzing(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result as string;
        const detectedIngredients = await detectIngredientsFromImage(base64Image);
        setIngredients(prev => [...prev, ...detectedIngredients]);
        setScanResult(`Detected: ${detectedIngredients.join(', ')}`);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error processing image:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const addIngredient = (e: React.FormEvent) => {
    e.preventDefault();
    if (newIngredient.trim()) {
      setIngredients(prev => [...prev, newIngredient.trim()]);
      setNewIngredient('');
    }
  };

  const removeIngredient = (index: number) => {
    setIngredients(prev => prev.filter((_, i) => i !== index));
  };

  const generateRecipes = async () => {
    if (ingredients.length === 0) return;

    setIsGenerating(true);
    try {
      const results = await searchRecipes(ingredients.join(','), {
        number: 5,
        ranking: 2,
        ignorePantry: true,
        instructionsRequired: true
      });

      // Format the results into CSV format
      const csvFormattedRecipes = results.map((recipe: any) => {
        const ingredientsCSV = recipe.extendedIngredients?.map((ing: any) => ing.original).join(';') || '';
        const instructionsCSV = recipe.analyzedInstructions?.[0]?.steps?.map((step: any) => step.step).join(';') || '';
        return `${recipe.id},${recipe.title},${recipe.image},${recipe.summary},${ingredientsCSV},${instructionsCSV}`;
      });

      setGeneratedRecipes(csvFormattedRecipes);

    } catch (error) {
      console.error('Error generating recipes:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const saveRecipe = (recipe: any) => {
    const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
    if (!savedRecipes.some((saved: any) => saved.id === recipe.id)) {
      localStorage.setItem('savedRecipes', JSON.stringify([...savedRecipes, recipe]));
    }
  };

  const likeRecipe = (recipe: any) => {
    const likedRecipes = JSON.parse(localStorage.getItem('likedRecipes') || '[]');
    if (!likedRecipes.some((liked: any) => liked.id === recipe.id)) {
      localStorage.setItem('likedRecipes', JSON.stringify([...likedRecipes, recipe]));
    }
  };

  return (
    <div className="pb-20">
      <div className="p-6">
        <button 
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-black hover:text-[#4a581f]"
        >
          <ArrowLeft className="w-6 h-6" />
          Back
        </button>

        <h1 className="text-2xl font-bold text-black mb-6">Food Scanner</h1>

        <div className="space-y-6">
          {/* Manual Ingredient Input */}
          <form onSubmit={addIngredient} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Add Ingredients
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newIngredient}
                onChange={(e) => setNewIngredient(e.target.value)}
                className="input-field flex-1"
                placeholder="Enter ingredient..."
              />
              <button
                type="submit"
                className="p-2 bg-[#4a581f] text-white rounded-lg hover:bg-opacity-90"
              >
                <Plus className="w-6 h-6" />
              </button>
            </div>
          </form>

          {/* Ingredient List */}
          {ingredients.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Ingredients List</h2>
              <div className="flex flex-wrap gap-2">
                {ingredients.map((ingredient, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 px-3 py-1 bg-[#ffe0b5] rounded-full"
                  >
                    <span>{ingredient}</span>
                    <button
                      onClick={() => removeIngredient(index)}
                      className="text-[#4a581f] hover:text-black"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Scanner Options */}
          {!isScanning && (
            <div className="flex gap-2">
              <button
                onClick={() => setIsScanning(true)}
                className="flex-1 flex items-center justify-center gap-2 p-4 bg-[#4a581f] text-white rounded-lg hover:bg-opacity-90"
              >
                <Camera className="w-6 h-6" />
                Scan Food
              </button>

              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex items-center justify-center gap-2 p-4 bg-white border-2 border-[#4a581f] text-[#4a581f] rounded-lg hover:bg-gray-50"
                >
                  <Upload className="w-6 h-6" />
                  Upload Image
                </button>
              </div>
            </div>
          )}

          {/* Scanning UI */}
          {isScanning && (
            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Camera view would appear here</p>
            </div>
          )}

          {isAnalyzing && (
            <div className="flex items-center justify-center gap-2 p-4">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span>Analyzing image...</span>
            </div>
          )}

          {/* Generate Recipes Button */}
          {ingredients.length > 0 && (
            <button
              onClick={generateRecipes}
              disabled={isGenerating}
              className="w-full btn-primary"
            >
              {isGenerating ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating Recipes...
                </div>
              ) : (
                'Generate Recipes'
              )}
            </button>
          )}

             {/* Generated Recipes */}
          {generatedRecipes.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Recipe Suggestions</h2>
              {generatedRecipes.map((recipe, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                  <div className="flex items-center gap-4">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#4a581f]">{recipe.title}</h3>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{recipe.description}</p>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-2">
                    <button
                      onClick={() => likeRecipe(recipe)}
                      className="p-2 text-[#4a581f] hover:bg-[#ffe0b5] rounded-full"
                    >
                      <Heart className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => saveRecipe(recipe)}
                      className="p-2 text-[#4a581f] hover:bg-[#ffe0b5] rounded-full"
                    >
                      <Bookmark className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
} 