'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface TokenDisplayProps {
  accessToken: string;
  refreshToken: string;
}

export default function TokenDisplay({ accessToken, refreshToken }: TokenDisplayProps) {
  const [copied, setCopied] = useState(false);

  const copyToken = async (token: string) => {
    await navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-2xl w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h1 className="text-2xl font-bold text-center text-green-600">
          Authentication Successful!
        </h1>
        
        <div className="space-y-6">
          {/* Token display fields */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Access Token
            </label>
            <div className="relative">
              <input
                type="text"
                readOnly
                value={accessToken}
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                onClick={() => copyToken(accessToken)}
                className="absolute right-2 top-2 p-1 rounded-md hover:bg-gray-200"
                title="Copy to clipboard"
              >
                {copied ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : (
                  <Copy className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
          </div>
          
          {/* Similar field for refresh token */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Refresh Token
            </label>
            <div className="relative">
              <input
                type="text"
                readOnly
                value={refreshToken}
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                onClick={() => copyToken(refreshToken)}
                className="absolute right-2 top-2 p-1 rounded-md hover:bg-gray-200"
                title="Copy to clipboard"
              >
                {copied ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : (
                  <Copy className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
          </div>
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