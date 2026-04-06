import { NextRequest, NextResponse } from 'next/server';
import { createRouteClient } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  const supabase = createRouteClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: '未登入' }, { status: 401 });

  const { refreshToken, accountId } = await req.json();
  if (!refreshToken || !accountId) return NextResponse.json({ error: '缺少參數' }, { status: 400 });

  const { data: account } = await supabase
    .from('token_accounts')
    .select('*')
    .eq('id', accountId)
    .eq('user_id', user.id)
    .single();

  if (!account) return NextResponse.json({ error: '無此帳戶' }, { status: 404 });

  try {
    // ←←← 請用你之前 Console v2 抓到的真實 Refresh URL 和 Body 欄位替換這裡
    const response = await fetch('https://api.geminigen.ai/api/auth/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!response.ok) throw new Error('Refresh API 失敗');

    const data = await response.json();
    const newAccessToken = data.access_token || data.token;

    await supabase
      .from('token_accounts')
      .update({
        access_token: newAccessToken,
        expires_at: new Date(Date.now() + 3600000).toISOString(),
      })
      .eq('id', accountId);

    return NextResponse.json({ accessToken: newAccessToken });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
