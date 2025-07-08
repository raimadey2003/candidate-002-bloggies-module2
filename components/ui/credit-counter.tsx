'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Coins } from 'lucide-react';
import { getCredits } from '@/lib/credits';

interface CreditCounterProps {
  onCreditsChange?: () => void;
}

export function CreditCounter({ onCreditsChange }: CreditCounterProps) {
  const [credits, setCredits] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const fetchCredits = () => {
    try {
      const currentCredits = getCredits('demo-user');
      setCredits(currentCredits);
    } catch (error) {
      console.error('Error fetching credits:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCredits();
  }, [onCreditsChange]);

  if (loading) {
    return (
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Coins className="w-6 h-6 text-blue-600" />
            Credits
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="text-3xl font-bold text-blue-600">Loading...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <Coins className="w-6 h-6 text-blue-600" />
          Credits
        </CardTitle>
        <CardDescription>
          Use credits to generate memes
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <div className="text-4xl font-bold text-blue-600">{credits}</div>
        <p className="text-sm text-gray-600">
          2 credits per meme generation
        </p>
        {credits < 2 && (
          <p className="text-sm text-red-600 font-medium">
            Not enough credits to generate a meme
          </p>
        )}
      </CardContent>
    </Card>
  );
}