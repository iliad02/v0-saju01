"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function LoginButtons() {
  const handleSocialLogin = (provider: string) => {
    // Mock social login - in production, this would redirect to OAuth
    console.log(`[v0] Logging in with ${provider}`);
    // For demo purposes, redirect to signup
    window.location.href = '/signup';
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-sm">
      <Button
        size="lg"
        className="w-full h-14 text-base font-medium bg-[#FEE500] text-[#191919] hover:bg-[#FDD835] border-none shadow-md"
        onClick={() => handleSocialLogin('kakao')}
      >
        <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3C6.477 3 2 6.463 2 10.75c0 2.715 1.823 5.104 4.563 6.461-.147.51-.947 3.283-1.009 3.518 0 0-.02.166.089.23.108.065.248.015.248.015.328-.045 3.8-2.456 4.4-2.872.56.08 1.135.123 1.709.123 5.523 0 10-3.463 10-7.475C22 6.463 17.523 3 12 3z"/>
        </svg>
        카카오 로그인
      </Button>
      
      <Button
        size="lg"
        className="w-full h-14 text-base font-medium bg-[#03C75A] text-white hover:bg-[#02B351] border-none shadow-md"
        onClick={() => handleSocialLogin('naver')}
      >
        <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727v12.845z"/>
        </svg>
        네이버 로그인
      </Button>
      
      <Button
        size="lg"
        className="w-full h-14 text-base font-medium bg-white text-foreground hover:bg-secondary border border-border shadow-md"
        onClick={() => handleSocialLogin('google')}
      >
        <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        구글 로그인
      </Button>
      
      <div className="relative my-2">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">또는</span>
        </div>
      </div>
      
      <Link href="/signup" className="w-full">
        <Button
          variant="outline"
          size="lg"
          className="w-full h-14 text-base font-medium border-primary text-primary hover:bg-primary hover:text-primary-foreground shadow-sm"
        >
          이메일로 회원가입
        </Button>
      </Link>
    </div>
  );
}
