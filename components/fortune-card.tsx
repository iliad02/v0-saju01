"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { FortuneContent } from '@/lib/types';

interface FortuneCardProps {
  fortune: FortuneContent;
  title?: string;
}

export function FortuneCard({ fortune, title = "오늘의 운세" }: FortuneCardProps) {
  return (
    <Card className="border-border/50 shadow-lg bg-gradient-to-br from-card to-secondary/20 overflow-hidden">
      <CardHeader className="pb-3 border-b border-border/30">
        <CardTitle className="font-serif text-xl flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-5 space-y-5">
        {/* Fortune Score */}
        <div className="flex items-center justify-center">
          <div className="relative w-24 h-24">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="40"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                className="text-secondary"
              />
              <circle
                cx="48"
                cy="48"
                r="40"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                strokeDasharray={`${fortune.fortune_score * 2.51} 251`}
                className="text-primary"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-foreground">{fortune.fortune_score}</span>
            </div>
          </div>
        </div>

        {/* Fortune Text */}
        <p className="text-foreground leading-relaxed text-center px-2">
          {fortune.fortune_text}
        </p>

        {/* Lucky Items Grid */}
        <div className="grid grid-cols-2 gap-3">
          <LuckyItem label="행운 색" value={fortune.lucky_color} />
          <LuckyItem label="행운 숫자" value={fortune.lucky_number.toString()} />
          <LuckyItem label="행운 방향" value={fortune.lucky_direction} />
          <LuckyItem label="행운 띠" value={fortune.lucky_zodiac} />
        </div>
      </CardContent>
    </Card>
  );
}

function LuckyItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-secondary/50 rounded-lg p-3 text-center">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className="font-medium text-foreground">{value}</p>
    </div>
  );
}
