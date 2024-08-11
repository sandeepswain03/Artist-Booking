'use client';

import { useState } from 'react';

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    avatar: null as File | null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, avatar: e.target.files?.[0] || null });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const { username, email, password, avatar } = formData;

    if (!username || !email || !password || !avatar) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('username', username);
    formDataToSend.append('email', email);
    formDataToSend.append('password', password);
    formDataToSend.append('avatar', avatar);

    try {
      const response = await fetch('/api/sign-up', {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('User registered successfully!');
        setFormData({
          username: '',
          email: '',
          password: '',
          avatar: null,
        });
      } else {
        setError(data.message || 'Something went wrong');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred during sign-up');
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sign-Up</h1>
      {error && <div className="mb-4 text-red-600">{error}</div>}
      {success && <div className="mb-4 text-green-600">{success}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full mb-4 p-2 border text-black"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-4 p-2 border text-black"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-4 p-2 border text-black"
          required
        />
        <input
          type="file"
          name="avatar"
          onChange={handleFileChange}
          className="w-full mb-4 p-2 border"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
}
