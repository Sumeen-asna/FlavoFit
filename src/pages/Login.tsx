import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Add login logic here
    navigate('/home');
  };

  return (
    <div className="min-h-screen p-6">
      <button 
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center gap-2 text-black"
      >
        <ArrowLeft className="w-6 h-6" />
        Back
      </button>

      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold text-black mb-8">Login</h1>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-black mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-black mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              required
            />
          </div>

          <button type="submit" className="btn-primary w-full">
            Login
          </button>
        </form>

        <p className="mt-6 text-center">
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/signup')}
            className="text-[#4a581f] font-semibold"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}