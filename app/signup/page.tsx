import Link from 'next/link';
import { SignupForm } from '@/components/signup-form';
import { ChevronLeft } from 'lucide-react';

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary/30 py-8 px-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            <span>돌아가기</span>
          </Link>
          
          <div className="text-center">
            <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
              회원가입
            </h1>
            <p className="text-muted-foreground">
              나만의 사주 리포트를 받아보세요
            </p>
          </div>
        </div>

        {/* Signup Form */}
        <SignupForm />
        
        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground mt-8">
          이미 계정이 있으신가요?{' '}
          <Link href="/" className="text-primary hover:underline">
            로그인
          </Link>
        </p>
      </div>
    </main>
  );
}
