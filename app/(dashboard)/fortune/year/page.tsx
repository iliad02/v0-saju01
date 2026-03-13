"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUser } from '@/lib/user-context';
import { generateYearlyFortune } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { ChevronLeft, Share2, RefreshCw, Star } from 'lucide-react';
import { ReadAloudButton } from '@/components/read-aloud-button';
import type { FortuneContent } from '@/lib/types';

export default function YearlyFortunePage() {
  const router = useRouter();
  const { user, sajuData, isLoading } = useUser();
  const [fortune, setFortune] = useState<FortuneContent | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/');
      return;
    }

    if (user && !fortune) {
      generateFortune();
    }
  }, [isLoading, user, router, fortune]);

  const generateFortune = () => {
    if (!user) return;
    setIsGenerating(true);
    // Simulate API call with longer delay for yearly fortune
    setTimeout(() => {
      setFortune(generateYearlyFortune(user.user_id));
      setIsGenerating(false);
    }, 1200);
  };

  const currentYear = new Date().getFullYear();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary/30">
        <div className="flex flex-col items-center gap-4">
          <Spinner className="w-8 h-8 text-primary" />
          <p className="text-muted-foreground">운세를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary/30 pb-8">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/50">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center justify-between">
          <Link 
            href="/main" 
            className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            <span>돌아가기</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={generateFortune} disabled={isGenerating}>
            <RefreshCw className={`w-5 h-5 ${isGenerating ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 pt-6 space-y-6">
        {/* Title */}
        <div className="text-center">
          <h1 className="font-serif text-2xl font-bold text-foreground mb-1">
            올해 운세
          </h1>
          <p className="text-muted-foreground">{currentYear}년</p>
        </div>

        {isGenerating ? (
          <div className="flex flex-col items-center justify-center py-12 gap-4">
            <Spinner className="w-8 h-8 text-primary" />
            <p className="text-muted-foreground">AI가 올해 운세를 분석하고 있습니다...</p>
          </div>
        ) : fortune ? (
          <>
            {/* Fortune Score */}
            <Card className="border-border/50 shadow-lg bg-gradient-to-br from-primary/10 to-card overflow-hidden">
              <CardContent className="pt-6 pb-6">
                <div className="flex flex-col items-center mb-6">
                  <div className="relative w-32 h-32 mb-4">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="12"
                        className="text-secondary"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="12"
                        strokeDasharray={`${fortune.fortune_score * 3.52} 352`}
                        className="text-primary"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-bold text-foreground">{fortune.fortune_score}</span>
                      <span className="text-sm text-muted-foreground">점</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground">올해 종합 운세 점수</p>
                </div>

                {/* Star Rating */}
                <div className="flex justify-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-6 h-6 ${
                        star <= Math.round(fortune.fortune_score / 20)
                          ? 'text-primary fill-primary'
                          : 'text-secondary'
                      }`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Saju Data Summary */}
            {sajuData && (
              <Card className="border-border/50 shadow-md bg-secondary/30">
                <CardContent className="pt-4 pb-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">십성 구조</p>
                      <p className="text-sm font-medium text-foreground">{sajuData.ten_gods}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">대운</p>
                      <p className="text-sm font-medium text-foreground">{sajuData.luck_cycle}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Main Fortune Text */}
            <Card className="border-border/50 shadow-md">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="font-serif text-lg text-primary">
                    {currentYear}년 종합 운세
                  </CardTitle>
                  <ReadAloudButton
                    text={`${currentYear}년 종합 운세. 운세 점수 ${fortune.fortune_score}점. ${fortune.fortune_text}. 행운 색: ${fortune.lucky_color}. 행운 숫자: ${fortune.lucky_number}. 행운 방향: ${fortune.lucky_direction}. 행운 띠: ${fortune.lucky_zodiac}.`}
                    label={`${currentYear}년 운세`}
                    size="sm"
                    variant="ghost"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-loose text-lg whitespace-pre-line">
                  {fortune.fortune_text}
                </p>
              </CardContent>
            </Card>

            {/* Yearly Lucky Items */}
            <Card className="border-border/50 shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="font-serif text-lg text-primary">
                  올해의 행운 키워드
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-secondary/50 rounded-lg p-4 text-center">
                    <p className="text-xs text-muted-foreground mb-1">행운 색</p>
                    <p className="font-medium text-foreground text-lg">{fortune.lucky_color}</p>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-4 text-center">
                    <p className="text-xs text-muted-foreground mb-1">행운 숫자</p>
                    <p className="font-medium text-foreground text-lg">{fortune.lucky_number}</p>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-4 text-center">
                    <p className="text-xs text-muted-foreground mb-1">행운 방향</p>
                    <p className="font-medium text-foreground text-lg">{fortune.lucky_direction}</p>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-4 text-center">
                    <p className="text-xs text-muted-foreground mb-1">행운 띠</p>
                    <p className="font-medium text-foreground text-lg">{fortune.lucky_zodiac}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Share Button */}
            <Button 
              variant="outline" 
              className="w-full h-12 border-primary/30"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: `쉬운사주 - ${currentYear}년 운세`,
                    text: fortune.fortune_text.substring(0, 100) + '...',
                  });
                }
              }}
            >
              <Share2 className="w-4 h-4 mr-2" />
              공유하기
            </Button>
          </>
        ) : null}
      </div>
    </main>
  );
}
