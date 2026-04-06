'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (!error) router.push('/dashboard');
    else alert(error.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="bg-gray-900 p-8 rounded-3xl w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">登入 Geminigen Pro</h1>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full p-4 mb-4 bg-gray-800 rounded-2xl" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="密碼" className="w-full p-4 mb-6 bg-gray-800 rounded-2xl" />
        <button onClick={handleLogin} className="w-full py-4 bg-blue-600 rounded-2xl font-bold">登入</button>
        <p className="text-center mt-6 text-sm">還沒有帳號？<a href="/register" className="text-blue-400">立即註冊</a></p>
      </div>
    </div>
  );
}
