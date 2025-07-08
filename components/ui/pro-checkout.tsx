'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, Sparkles } from 'lucide-react';
import { addCredits, getCredits, initializeDemoCredits } from '@/lib/credits';
import { toast } from 'sonner';

interface ProCheckoutProps {
  onCreditsChange?: () => void;
}

export function ProCheckout({ onCreditsChange }: ProCheckoutProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [credits, setCredits] = useState(0);

  useEffect(() => {
    initializeDemoCredits(); // one-time demo credit init
    setCredits(getCredits('demo-user')); // load current credits
  }, []);

  const handlePurchase = async () => {
    setIsProcessing(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const newTotal = addCredits('demo-user', 10);
      setCredits(newTotal);

      toast.success('Payment successful! 10 credits added to your account! 🎉');
      onCreditsChange?.();

      setTimeout(() => {
        window.location.href = '/success';
      }, 1000);
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <Sparkles className="w-6 h-6 text-green-600" />
          Meme Bot Pro
        </CardTitle>
        <CardDescription>
          Get more credits to create amazing memes
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center space-y-2">
          <div className="text-3xl font-bold text-green-600">$7.00</div>
          <div className="text-lg font-semibold">10 Credits</div>
          <p className="text-sm text-gray-600">Generate 5 amazing memes</p>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span>Credits included:</span>
            <span className="font-semibold">10</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Cost per meme:</span>
            <span className="font-semibold">2 credits</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Memes you can make:</span>
            <span className="font-semibold">5 memes</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Raffle entry:</span>
            <span className="font-semibold text-green-600">Automatic ✓</span>
          </div>
          <div className="flex items-center justify-between border-t pt-2">
            <span>Current Credits:</span>
            <span className="font-bold text-green-700">{credits}</span>
          </div>
        </div>

        <Button
          onClick={handlePurchase}
          disabled={isProcessing}
          className="w-full bg-green-600 hover:bg-green-700"
        >
          {isProcessing ? (
            <>
              <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <CreditCard className="w-4 h-4 mr-2" />
              Buy Credits - $7.00
            </>
          )}
        </Button>

        <p className="text-xs text-gray-500 text-center">
          Demo mode: This will simulate a successful payment
        </p>
      </CardContent>
    </Card>
  );
}
