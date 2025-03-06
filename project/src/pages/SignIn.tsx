import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement sign in logic
    console.log('Sign in attempt with:', { email, password });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Sign In</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#fc8019] focus:outline-none"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#fc8019] focus:outline-none"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#fc8019] text-white py-2 rounded-md hover:bg-[#db6c12] transition-colors"
        >
          Sign In
        </button>
        <p className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={() => navigate('/signup')}
            className="text-[#fc8019] hover:underline"
          >
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignIn; 