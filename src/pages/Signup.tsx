import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import FormInput from '../components/FormInput';

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/user-details');
  };

  return (
    <PageContainer title="Create Account">
      <form onSubmit={handleSignup} className="space-y-6">
        <FormInput
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <FormInput
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="btn-primary w-full">
          Sign Up
        </button>
      </form>

      <p className="mt-6 text-center">
        Already have an account?{' '}
        <button
          onClick={() => navigate('/login')}
          className="text-[#4a581f] font-semibold"
        >
          Login
        </button>
      </p>
    </PageContainer>
  );
}