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

      <footer className="row-start-3 text-sm text-gray-500">
        <a href="https://github.com/zoan37/restream-token-fetcher" 
           className="hover:text-gray-700 dark:hover:text-gray-300 flex items-center gap-2"
           target="_blank" 
           rel="noopener noreferrer">
          <svg height="20" width="20" viewBox="0 0 16 16" className="fill-current">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
          </svg>
          View on GitHub
        </a>
      </footer>
    </div>
  );
}
