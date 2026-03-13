"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Calendar, CalendarDays } from 'lucide-react';

export function FortuneButtons() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Link href="/fortune/month" className="block">
        <Button
          variant="outline"
          size="lg"
          className="w-full h-16 flex flex-col items-center justify-center gap-1 border-primary/30 hover:border-primary hover:bg-primary/5 transition-all"
        >
          <Calendar className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium">이번 달 운세</span>
        </Button>
      </Link>
      
      <Link href="/fortune/year" className="block">
        <Button
          variant="outline"
          size="lg"
          className="w-full h-16 flex flex-col items-center justify-center gap-1 border-primary/30 hover:border-primary hover:bg-primary/5 transition-all"
        >
          <CalendarDays className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium">올해 운세</span>
        </Button>
      </Link>
    </div>
  );
}
