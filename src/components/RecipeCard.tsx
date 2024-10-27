import { Heart, Bookmark } from 'lucide-react';
import { useState } from 'react';

interface RecipeCardProps {
  title: string;
  image: string;
  prepTime: string;
  onClick: () => void;
}

export default function RecipeCard({ title, image, prepTime, onClick }: RecipeCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
    >
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-[#4a581f] font-semibold mb-2">{title}</h3>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">{prepTime}</span>
          <div className="flex gap-2">
            <button
              onClick={handleLike}
              className={`p-2 rounded-full ${
                isLiked ? 'text-red-500' : 'text-gray-400'
              }`}
            >
              <Heart className="w-5 h-5" fill={isLiked ? 'currentColor' : 'none'} />
            </button>
            <button
              onClick={handleSave}
              className={`p-2 rounded-full ${
                isSaved ? 'text-[#4a581f]' : 'text-gray-400'
              }`}
            >
              <Bookmark className="w-5 h-5" fill={isSaved ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}