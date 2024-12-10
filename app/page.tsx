import LoginButton from "./components/login-button";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center text-center">
        <h1 className="text-4xl font-bold">Restream Token Fetcher</h1>
        
        <p className="max-w-md text-lg text-gray-600 dark:text-gray-300">
          This app allows you retrieve Restream OAuth tokens.
          The tokens can be used in ChatVRM to enable reading chat messages from your Restream livestream.
        </p>

        <div className="flex gap-4 items-center flex-col sm:flex-row mt-4">
          <LoginButton />
        </div>
      </main>
    </div>
  );
}
