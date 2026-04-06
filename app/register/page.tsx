'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const supabase = createClient();

  const handleRegister = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (!error) {
      alert('✅ 註冊成功！請前往 Email 點擊確認連結');
      router.push('/login');
    } else alert(error.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="bg-gray-900 p-8 rounded-3xl w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">註冊 Geminigen Pro</h1>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full p-4 mb-4 bg-gray-800 rounded-2xl" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="密碼（至少 6 碼）" className="w-full p-4 mb-6 bg-gray-800 rounded-2xl" />
        <button onClick={handleRegister} className="w-full py-4 bg-blue-600 rounded-2xl font-bold">註冊</button>
        <p className="text-center mt-6 text-sm">已有帳號？<a href="/login" className="text-blue-400">立即登入</a></p>
      </div>
    </div>
  );
}
