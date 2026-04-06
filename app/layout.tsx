import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Geminigen Pro - 專業圖片生成器',
  description: '多帳戶 LRU + 自動 Refresh + Supabase 後台',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW">
      <body className="bg-gray-950 text-white">{children}</body>
    </html>
  );
}
