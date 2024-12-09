import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  
  if (!code || !state) {
    return NextResponse.json({ error: 'Missing code or state parameter' }, { status: 400 });
  }

  // Verify state matches what we stored
  const storedState = request.cookies.get('oauth_state')?.value;
  if (state !== storedState) {
    return NextResponse.json({ error: 'Invalid state parameter' }, { status: 400 });
  }

  try {
    // Exchange code for tokens
    const tokenResponse = await fetch('https://api.restream.io/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(
          `${process.env.RESTREAM_CLIENT_ID}:${process.env.RESTREAM_CLIENT_SECRET}`
        ).toString('base64')}`
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`,
        code: code
      })
    });

    const data = await tokenResponse.json();

    if (data.error) {
      console.error('Token exchange failed:', data.error);
      return NextResponse.json({ error: 'Failed to exchange code for tokens' }, { status: 400 });
    }

    // Create response with redirect
    const redirectUrl = new URL('/auth-success', request.url);
    const response = NextResponse.redirect(redirectUrl);
    
    // Set cookies
    response.cookies.set('access_token', data.access_token, {
      httpOnly: true,
      path: '/',
      maxAge: 3600,
      sameSite: 'lax'
    });
    
    response.cookies.set('refresh_token', data.refresh_token, {
      httpOnly: true,
      path: '/',
      maxAge: 3600,
      sameSite: 'lax'
    });

    return response;
  } catch (error) {
    console.error('Error exchanging code:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 