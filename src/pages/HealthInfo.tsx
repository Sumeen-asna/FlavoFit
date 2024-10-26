import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import PageContainer from '../components/PageContainer';

interface Tag {
  id: string;
  text: string;
}

export default function HealthInfo() {
  const navigate = useNavigate();
  const [searchMedical, setSearchMedical] = useState('');
  const [searchAllergies, setSearchAllergies] = useState('');
  const [searchDietary, setSearchDietary] = useState('');
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const commonConditions = [
    'Diabetes', 'Hypertension', 'Celiac Disease', 'Lactose Intolerance'
  ];

  const commonAllergies = [
    'Peanuts', 'Tree Nuts', 'Milk', 'Eggs', 'Soy', 'Wheat', 'Fish', 'Shellfish'
  ];

  const dietaryPreferences = [
    'Vegetarian', 'Vegan', 'Pescatarian', 'Keto', 'Paleo', 'Low-Carb'
  ];

  const addTag = (text: string, category: string) => {
    const newTag: Tag = {
      id: `${category}-${text}-${Date.now()}`,
      text: text
    };
    setSelectedTags([...selectedTags, newTag]);
  };

  const removeTag = (tagId: string) => {
    setSelectedTags(selectedTags.filter(tag => tag.id !== tagId));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/home');
  };

  return (
    <PageContainer title="Health Information">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label className="block text-black mb-2">Medical Concerns</label>
          <input
            type="text"
            value={searchMedical}
            onChange={(e) => setSearchMedical(e.target.value)}
            className="input-field mb-2"
            placeholder="Search medical conditions..."
          />
          <div className="flex flex-wrap gap-2">
            {commonConditions.map((condition) => (
              <button
                key={condition}
                type="button"
                onClick={() => addTag(condition, 'medical')}
                className="px-3 py-1 bg-[#4a581f] text-white rounded-full text-sm hover:bg-opacity-90"
              >
                {condition}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-black mb-2">Allergies</label>
          <input
            type="text"
            value={searchAllergies}
            onChange={(e) => setSearchAllergies(e.target.value)}
            className="input-field mb-2"
            placeholder="Search allergies..."
          />
          <div className="flex flex-wrap gap-2">
            {commonAllergies.map((allergy) => (
              <button
                key={allergy}
                type="button"
                onClick={() => addTag(allergy, 'allergy')}
                className="px-3 py-1 bg-[#4a581f] text-white rounded-full text-sm hover:bg-opacity-90"
              >
                {allergy}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-black mb-2">Dietary Preferences</label>
          <input
            type="text"
            value={searchDietary}
            onChange={(e) => setSearchDietary(e.target.value)}
            className="input-field mb-2"
            placeholder="Search dietary preferences..."
          />
          <div className="flex flex-wrap gap-2">
            {dietaryPreferences.map((pref) => (
              <button
                key={pref}
                type="button"
                onClick={() => addTag(pref, 'dietary')}
                className="px-3 py-1 bg-[#4a581f] text-white rounded-full text-sm hover:bg-opacity-90"
              >
                {pref}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-black font-semibold mb-2">Selected Preferences</h3>
          <div className="flex flex-wrap gap-2">
            {selectedTags.map((tag) => (
              <div
                key={tag.id}
                className="flex items-center gap-1 px-3 py-1 bg-[#ffe0b5] rounded-full"
              >
                <span>{tag.text}</span>
                <button
                  type="button"
                  onClick={() => removeTag(tag.id)}
                  className="text-[#4a581f] hover:text-black"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="btn-primary w-full mt-8">
          Save & Continue
        </button>
      </form>
    </PageContainer>
  );
}