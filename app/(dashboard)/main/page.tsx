"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUser } from '@/lib/user-context';
import { FortuneCard } from '@/components/fortune-card';
import { FortuneButtons } from '@/components/fortune-buttons';
import { SajuReportCard } from '@/components/saju-report-card';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { LogOut, Share2 } from 'lucide-react';

export default function MainPage() {
  const router = useRouter();
  const { user, dailyFortune, sajuData, sajuReport, isLoading, logout } = useUser();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/');
    }
  }, [isLoading, user, router]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '쉬운사주 - 나의 사주 분석 결과',
          text: sajuReport?.summary || '나만의 사주 리포트를 확인해보세요!',
          url: window.location.href,
        });
      } catch (err) {
        console.log('[v0] Share cancelled or failed');
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('링크가 복사되었습니다!');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary/30">
        <div className="flex flex-col items-center gap-4">
          <Spinner className="w-8 h-8 text-primary" />
          <p className="text-muted-foreground">사주 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (!user || !dailyFortune) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary/30 pb-8">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/50">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/main">
            <h1 className="font-serif text-2xl font-bold text-foreground">쉬운사주</h1>
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={handleShare}>
              <Share2 className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 pt-6 space-y-6">
        {/* Welcome Message */}
        <div className="text-center mb-2">
          <p className="text-muted-foreground">
            {user.email.split('@')[0]}님의 운세
          </p>
          <p className="text-sm text-muted-foreground/70">
            {new Date().toLocaleDateString('ko-KR', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              weekday: 'long'
            })}
          </p>
        </div>

        {/* Today's Fortune Card */}
        <FortuneCard fortune={dailyFortune} />

        {/* Fortune Navigation Buttons */}
        <FortuneButtons />

        {/* Saju Report */}
        {sajuReport && (
          <div className="pt-4">
            <h2 className="font-serif text-xl font-bold text-foreground mb-4 text-center">
              나의 사주 리포트
            </h2>
            <SajuReportCard report={sajuReport} sajuData={sajuData || undefined} />
          </div>
        )}
      </div>
    </main>
  );
}
