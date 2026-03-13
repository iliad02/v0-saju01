import { LoginButtons } from '@/components/login-buttons';

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-background to-secondary/30">
      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAzMHYySDI0di0yaDEyek0zNiAyNnYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] bg-repeat" />
      </div>
      
      <div className="relative z-10 flex flex-col items-center text-center max-w-lg mx-auto">
        {/* Traditional design element */}
        <div className="mb-8">
          <div className="w-24 h-1 bg-primary/20 mx-auto mb-4" />
          <div className="w-16 h-0.5 bg-primary/30 mx-auto" />
        </div>
        
        {/* Logo / Title */}
        <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground tracking-tight mb-4">
          쉬운사주
        </h1>
        
        {/* Subtitle */}
        <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed mb-2 text-pretty">
          복잡한 사주를 누구나 쉽게 이해하는
        </p>
        <p className="text-lg md:text-xl text-primary font-medium mb-12">
          AI 사주 분석 서비스
        </p>
        
        {/* Feature tags */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <span className="px-4 py-2 bg-card border border-border rounded-full text-sm text-muted-foreground shadow-sm">
            어려운 용어 없이
          </span>
          <span className="px-4 py-2 bg-card border border-border rounded-full text-sm text-muted-foreground shadow-sm">
            AI가 쉽게 풀이
          </span>
          <span className="px-4 py-2 bg-card border border-border rounded-full text-sm text-muted-foreground shadow-sm">
            나만의 리포트
          </span>
        </div>
        
        {/* Login Buttons */}
        <LoginButtons />
        
        {/* Footer note */}
        <p className="mt-10 text-sm text-muted-foreground/70">
          가입 시 서비스 이용약관에 동의하게 됩니다
        </p>
        
        {/* Bottom decorative element */}
        <div className="mt-12">
          <div className="w-16 h-0.5 bg-primary/30 mx-auto mb-4" />
          <div className="w-24 h-1 bg-primary/20 mx-auto" />
        </div>
      </div>
    </main>
  );
}
