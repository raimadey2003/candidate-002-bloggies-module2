'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Download, Sparkles, Loader2 } from 'lucide-react';
import { generateMeme, type MemeData } from '@/lib/meme-generator';
import { deductCredits, getCredits } from '@/lib/credits';
import { toast } from 'sonner';

interface MemeGeneratorProps {
  onCreditsChange?: () => void;
}

export function MemeGenerator({ onCreditsChange }: MemeGeneratorProps) {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedMeme, setGeneratedMeme] = useState<{
    imageData: string;
    altText: string;
  } | null>(null);

  const handleGenerate = async () => {
    if (!topText.trim() && !bottomText.trim()) {
      toast.error('Please enter some text for your meme');
      return;
    }

    // Check credits
    const currentCredits = getCredits('demo-user');
    if (currentCredits < 2) {
      toast.error('Insufficient credits. You need 2 credits to generate a meme.');
      return;
    }

    setIsGenerating(true);

    try {
      // Deduct credits
      const success = deductCredits('demo-user', 2);
      if (!success) {
        toast.error('Failed to deduct credits');
        return;
      }

      const memeData: MemeData = {
        topText: topText.trim(),
        bottomText: bottomText.trim(),
      };

      const result = await generateMeme(memeData);
      setGeneratedMeme(result);
      
      toast.success('Meme generated successfully! 🎉');
      onCreditsChange?.();
    } catch (error) {
      console.error('Error generating meme:', error);
      toast.error('Failed to generate meme. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!generatedMeme) return;

    const link = document.createElement('a');
    link.href = generatedMeme.imageData;
    link.download = `meme-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Meme downloaded! 📥');
  };

  const handleQuickFill = (top: string, bottom: string) => {
    setTopText(top);
    setBottomText(bottom);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-600" />
            Meme Generator
          </CardTitle>
          <CardDescription>
            Create hilarious memes with custom text. Each generation costs 2 credits.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="topText">Top Text</Label>
              <Input
                id="topText"
                placeholder="Enter top text..."
                value={topText}
                onChange={(e) => setTopText(e.target.value)}
                maxLength={50}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bottomText">Bottom Text</Label>
              <Input
                id="bottomText"
                placeholder="Enter bottom text..."
                value={bottomText}
                onChange={(e) => setBottomText(e.target.value)}
                maxLength={50}
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">Quick Examples:</Label>
            <div className="grid gap-2 md:grid-cols-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuickFill('WHEN YOUR CODE WORKS', 'ON THE FIRST TRY')}
                className="text-left justify-start h-auto py-2"
              >
                <div className="text-xs">
                  <div>WHEN YOUR CODE WORKS</div>
                  <div className="text-gray-500">ON THE FIRST TRY</div>
                </div>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuickFill('ONE DOES NOT SIMPLY', 'WALK INTO MORDOR')}
                className="text-left justify-start h-auto py-2"
              >
                <div className="text-xs">
                  <div>ONE DOES NOT SIMPLY</div>
                  <div className="text-gray-500">WALK INTO MORDOR</div>
                </div>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuickFill('WHEN YOU FINALLY FINISH', 'YOUR TECH ASSESSMENT')}
                className="text-left justify-start h-auto py-2"
              >
                <div className="text-xs">
                  <div>WHEN YOU FINALLY FINISH</div>
                  <div className="text-gray-500">YOUR TECH ASSESSMENT</div>
                </div>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuickFill('IT WORKS ON MY MACHINE', 'SHIP YOUR MACHINE')}
                className="text-left justify-start h-auto py-2"
              >
                <div className="text-xs">
                  <div>IT WORKS ON MY MACHINE</div>
                  <div className="text-gray-500">SHIP YOUR MACHINE</div>
                </div>
              </Button>
            </div>
          </div>

          <Button 
            onClick={handleGenerate} 
            disabled={isGenerating || (!topText.trim() && !bottomText.trim())}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating Meme...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Meme (2 Credits)
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {generatedMeme && (
        <Card>
          <CardHeader>
            <CardTitle>Your Generated Meme</CardTitle>
            <CardDescription>
              Right-click to save or use the download button below
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center">
              <img
                src={generatedMeme.imageData}
                alt={generatedMeme.altText}
                className="max-w-full h-auto rounded-lg shadow-lg border-2 border-gray-200"
                style={{ maxHeight: '500px' }}
              />
            </div>
            <Separator />
            <div className="flex justify-center">
              <Button onClick={handleDownload} variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download Meme
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}