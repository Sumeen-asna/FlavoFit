import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button 
      onClick={() => navigate(-1)}
      className="mb-6 flex items-center gap-2 text-black hover:text-[#4a581f] transition-colors"
    >
      <ArrowLeft className="w-6 h-6" />
      Back
    </button>
  );
}