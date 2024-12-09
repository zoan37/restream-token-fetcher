import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import TokenDisplay from './token-display';

export default async function AuthSuccess() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token')?.value;
  const refreshToken = cookieStore.get('refresh_token')?.value;

  if (!accessToken || !refreshToken) {
    redirect('/');
  }

  // Clear cookies
  const cookieJar = await cookies();
  cookieJar.delete('access_token');
  cookieJar.delete('refresh_token');

  return (
    <TokenDisplay accessToken={accessToken} refreshToken={refreshToken} />
  );
} 