'use client';

import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { RaffleWidget } from '@/components/ui/raffle-widget';
import Link from 'next/link';

export default function SuccessPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    // Normally you'd verify session_id here
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-5xl w-full grid gap-8 md:grid-cols-3">
        {/* ✅ Credits Confirmation Card */}
        <div className="flex items-center justify-center">
          <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-xl text-white w-full max-w-sm">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-green-400 text-xl">
                <CheckCircle className="w-6 h-6" />
                Credits Added!
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="text-3xl font-bold text-green-500">+10 Credits</div>
              <p className="text-sm text-green-500">
                You can now generate 5 hilarious memes using your new credits!
              </p>
            </CardContent>
          </Card>
        </div>

        {/* ✅ Credit Card Form / Success Message */}
        <div className="flex items-center justify-center">
          <Card className="bg-white shadow-lg w-full max-w-sm">
            {!formSubmitted && (
              <CardHeader className="text-center">
                <CardTitle className="text-lg font-semibold text-gray-800">
                  Enter Card Details
                </CardTitle>
                <CardDescription className="text-gray-500" />
              </CardHeader>
            )}

            <CardContent>
              {!formSubmitted ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setFormSubmitted(true);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block font-medium mb-1 text-sm text-gray-700">Card Number</label>
                    <input
                      type="text"
                      placeholder="4242 4242 4242 4242"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block font-medium mb-1 text-sm text-gray-700">Expiry</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block font-medium mb-1 text-sm text-gray-700">CVC</label>
                      <input
                        type="text"
                        placeholder="123"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold"
                  >
                    Complete Payment
                  </Button>
                </form>
              ) : (
                <div className="text-center space-y-4">
                  <p className="text-green-600 font-semibold text-lg">✅ Payment completed</p>
                  <p className="text-sm text-green-500">
                    Your account has been credited with 10 meme credits
                  </p>
                  <Link href="/">
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold">
                      Start Creating Memes
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* ✅ Raffle Widget */}
        <div className="flex items-center justify-center">
          <RaffleWidget />
        </div>
      </div>
    </div>
  );
}
