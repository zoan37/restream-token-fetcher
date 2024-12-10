'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { refreshAccessToken } from '../utils/auth';

interface TokenDisplayProps {
  accessToken: string;
  refreshToken: string;
}

export default function TokenDisplay({ accessToken, refreshToken }: TokenDisplayProps) {
  const [currentTokens, setCurrentTokens] = useState({ 
    accessToken, 
    refreshToken 
  });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setError(null);
    try {
      const response = await refreshAccessToken(currentTokens.refreshToken);
      setCurrentTokens({
        accessToken: response.access_token,
        refreshToken: response.refresh_token
      });
    } catch (err) {
      setError('Failed to refresh token');
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleCopyJson = async () => {
    const json = JSON.stringify({
      access_token: currentTokens.accessToken,
      refresh_token: currentTokens.refreshToken
    }, null, 2);
    
    try {
      await navigator.clipboard.writeText(json);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const tokenJson = JSON.stringify({
    access_token: currentTokens.accessToken,
    refresh_token: currentTokens.refreshToken
  }, null, 2);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-2xl w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h1 className="text-2xl font-bold text-center text-green-600">
          Authentication Successful!
        </h1>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Authentication Tokens
            </label>
            <div className="relative">
              <pre className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm text-gray-900 font-mono text-sm overflow-x-auto">
                {tokenJson}
              </pre>
              <button
                onClick={handleCopyJson}
                className="absolute right-2 top-2 p-2 text-gray-500 hover:text-gray-700 bg-gray-50 rounded"
                title="Copy JSON"
              >
                {isCopied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
          </div>

          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300 transition-colors"
          >
            {isRefreshing ? 'Refreshing...' : 'Refresh Tokens'}
          </button>
          
          {error && (
            <div className="text-red-500">
              {error}
            </div>
          )}
        </div>

        <div className="mt-4 text-sm text-gray-600">
          <p>These tokens are sensitive. Make sure to:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>Store them securely</li>
            <li>Never share them publicly</li>
            <li>Use the refresh token to get new access tokens when they expire</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 