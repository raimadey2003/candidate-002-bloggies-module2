'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Gift, Trophy, Users, Calendar } from 'lucide-react';

export function RaffleWidget() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Calculate time until next Friday at midnight
      const now = new Date();
      const nextFriday = new Date();
      nextFriday.setDate(now.getDate() + (5 - now.getDay() + 7) % 7);
      nextFriday.setHours(23, 59, 59, 999);
      
      const difference = nextFriday.getTime() - now.getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <Gift className="w-6 h-6 text-yellow-600" />
          Weekly Raffle
        </CardTitle>
        <CardDescription>
          You're automatically entered after any purchase!
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 mb-2">
            <Trophy className="w-3 h-3 mr-1" />
            ENTERED
          </Badge>
          <p className="text-sm text-gray-600">
            Congratulations! You're entered in this week's raffle
          </p>
        </div>

        <div className="space-y-3">
          <div className="text-center">
            <h3 className="font-semibold text-gray-900 mb-2">This Week's Prizes</h3>
            <div className="space-y-1 text-sm">
              <div className="flex items-center justify-between">
                <span>🥇 1st Place:</span>
                <span className="font-semibold">$100 Gift Card</span>
              </div>
              <div className="flex items-center justify-between">
                <span>🥈 2nd Place:</span>
                <span className="font-semibold">$50 Gift Card</span>
              </div>
              <div className="flex items-center justify-between">
                <span>🥉 3rd Place:</span>
                <span className="font-semibold">$25 Gift Card</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-3 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                Drawing in:
              </span>
              <span className="font-mono font-semibold">
                {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                Total entries:
              </span>
              <span className="font-semibold">1,247</span>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-500 text-center">
          Winners announced every Friday at midnight. Good luck! 🍀
        </p>
      </CardContent>
    </Card>
  );
}