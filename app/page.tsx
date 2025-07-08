'use client';

import { useEffect, useState } from 'react';
import { CreditCounter } from '@/components/ui/credit-counter';
import { MemeGenerator } from '@/components/ui/meme-generator';
import { ProCheckout } from '@/components/ui/pro-checkout';
import { initializeDemoCredits } from '@/lib/credits';
import { initializeDemoRaffleEntries } from '@/lib/raffle-store';
import { Toaster } from '@/components/ui/sonner';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    // Initialize demo data
    initializeDemoCredits();
    initializeDemoRaffleEntries();
  }, []);

  const handleCreditsChange = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Toaster />
      <div className="max-w-6xl mx-auto p-4 py-12">
        <div className="flex items-center justify-between mb-12">
          <div className="text-center flex-1">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Meme Bot Pro
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Create hilarious memes with AI-powered generation. Get credits, generate memes, and join our weekly raffle!
            </p>
          </div>
          <Link href="/admin">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Admin
            </Button>
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-6">
            <CreditCounter 
              key={refreshKey} 
              onCreditsChange={handleCreditsChange}
            />
            <ProCheckout onCreditsChange={handleCreditsChange} />
          </div>
          
          <div className="lg:col-span-2">
            <MemeGenerator onCreditsChange={handleCreditsChange} />
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How It Works</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center">
                <div className="text-3xl mb-2">💳</div>
                <h3 className="font-semibold">1. Buy Credits</h3>
                <p className="text-sm text-gray-600">Get 10 credits for $7</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🎨</div>
                <h3 className="font-semibold">2. Generate Memes</h3>
                <p className="text-sm text-gray-600">2 credits per meme</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🎁</div>
                <h3 className="font-semibold">3. Win Prizes</h3>
                <p className="text-sm text-gray-600">Auto-entered in raffle</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}