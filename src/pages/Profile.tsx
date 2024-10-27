import { LogOut, Edit2, Heart, Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import BottomNav from '../components/BottomNav';

interface UserInfo {
  name: string;
  email: string;
  birthday: string;
  medicalConcerns: string[];
  allergies: string[];
  dietaryPreferences: string[];
}

interface SavedRecipe {
  id: number;
  title: string;
  image: string;
}

export default function Profile() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [savedRecipes, setSavedRecipes] = useState<SavedRecipe[]>([]);
  const [likedRecipes, setLikedRecipes] = useState<SavedRecipe[]>([]);
  const [activeTab, setActiveTab] = useState<'saved' | 'liked'>('saved');

  useEffect(() => {
    // Load user info from localStorage
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }

    // Load saved and liked recipes from localStorage
    const storedSavedRecipes = localStorage.getItem('savedRecipes');
    if (storedSavedRecipes) {
      setSavedRecipes(JSON.parse(storedSavedRecipes));
    }

    const storedLikedRecipes = localStorage.getItem('likedRecipes');
    if (storedLikedRecipes) {
      setLikedRecipes(JSON.parse(storedLikedRecipes));
    }
  }, []);

  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem('userInfo');
    localStorage.removeItem('savedRecipes');
    localStorage.removeItem('likedRecipes');
    navigate('/');
  };

  return (
    <div className="pb-20">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-black mb-6">Profile</h1>

        {userInfo && (
          <div className="bg-white rounded-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Account Details</h2>
              <button className="text-[#4a581f]">
                <Edit2 className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600">Name</label>
                <p className="font-medium">{userInfo.name}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Email</label>
                <p className="font-medium">{userInfo.email}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Birthday</label>
                <p className="font-medium">{userInfo.birthday}</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Health Information</h2>
          {userInfo && (
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600">Medical Concerns</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {userInfo.medicalConcerns.map((concern, index) => (
                    <span key={index} className="px-3 py-1 bg-[#ffe0b5] rounded-full text-sm">
                      {concern}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Allergies</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {userInfo.allergies.map((allergy, index) => (
                    <span key={index} className="px-3 py-1 bg-[#ffe0b5] rounded-full text-sm">
                      {allergy}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Dietary Preferences</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {userInfo.dietaryPreferences.map((pref, index) => (
                    <span key={index} className="px-3 py-1 bg-[#ffe0b5] rounded-full text-sm">
                      {pref}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg p-6 mb-6">
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => setActiveTab('saved')}
              className={`flex-1 p-2 text-center rounded-lg ${
                activeTab === 'saved'
                  ? 'bg-[#4a581f] text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              Saved Recipes
            </button>
            <button
              onClick={() => setActiveTab('liked')}
              className={`flex-1 p-2 text-center rounded-lg ${
                activeTab === 'liked'
                  ? 'bg-[#4a581f] text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              Liked Recipes
            </button>
          </div>

          <div className="space-y-4">
            {activeTab === 'saved' ? (
              savedRecipes.map((recipe) => (
                <div key={recipe.id} className="flex items-center gap-4">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-medium">{recipe.title}</h3>
                    <button className="text-[#4a581f] text-sm">View Recipe</button>
                  </div>
                </div>
              ))
            ) : (
              likedRecipes.map((recipe) => (
                <div key={recipe.id} className="flex items-center gap-4">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-medium">{recipe.title}</h3>
                    <button className="text-[#4a581f] text-sm">View Recipe</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 w-full p-3 text-red-500 bg-white rounded-lg"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>

      <BottomNav />
    </div>
  );
}