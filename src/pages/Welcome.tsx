import { useNavigate } from 'react-router-dom';
import { Utensils } from 'lucide-react';

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="flex items-center gap-4 mb-12">
        <Utensils className="w-12 h-12 text-[#4a581f]" />
        <h1 className="text-6xl font-bold text-[#4a581f]">FlavourFit</h1>
      </div>
      
      <h2 className="text-3xl text-black mb-8">WELCOME TO</h2>
      <h1 className="text-5xl font-bold text-black mb-12">FLAVOURFIT</h1>
      
      <button 
        onClick={() => navigate('/login')}
        className="btn-primary text-xl"
      >
        Get Started
      </button>
    </div>
  );
}