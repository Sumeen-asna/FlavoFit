import { Home, ScanLine, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3">
      <div className="flex justify-around items-center max-w-md mx-auto">
        <button
          onClick={() => navigate('/home')}
          className={`flex flex-col items-center ${
            isActive('/home') ? 'text-[#4a581f]' : 'text-gray-500'
          }`}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs mt-1">Home</span>
        </button>

        <button
          onClick={() => navigate('/scanner')}
          className={`flex flex-col items-center ${
            isActive('/scanner') ? 'text-[#4a581f]' : 'text-gray-500'
          }`}
        >
          <ScanLine className="w-6 h-6" />
          <span className="text-xs mt-1">Scanner</span>
        </button>

        <button
          onClick={() => navigate('/profile')}
          className={`flex flex-col items-center ${
            isActive('/profile') ? 'text-[#4a581f]' : 'text-gray-500'
          }`}
        >
          <User className="w-6 h-6" />
          <span className="text-xs mt-1">Profile</span>
        </button>
      </div>
    </div>
  );
}