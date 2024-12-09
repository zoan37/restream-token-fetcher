'use client';

export default function LoginButton() {
  const handleLogin = () => {
    // Generate random state
    const state = Math.random().toString(36).substring(7);
    
    // Store state in cookie
    document.cookie = `oauth_state=${state}; path=/; max-age=3600; SameSite=Lax`;

    // log the client id
    console.log("client id");
    console.log(process.env.NEXT_PUBLIC_RESTREAM_CLIENT_ID);
    
    // Redirect to Restream OAuth
    const params = new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_RESTREAM_CLIENT_ID!,
      redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`,
      response_type: 'code',
      state: state,
      scope: 'chat_read chat_send'
    });

    window.location.href = `https://api.restream.io/login?${params}`;
  };

  return (
    <button
      onClick={handleLogin}
      className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
    >
      Login with Restream
    </button>
  );
} 