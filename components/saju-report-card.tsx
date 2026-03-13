"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { SajuReport, SajuData } from '@/lib/types';

interface SajuReportCardProps {
  report: SajuReport;
  sajuData?: SajuData;
}

export function SajuReportCard({ report, sajuData }: SajuReportCardProps) {
  return (
    <div className="space-y-4">
      {/* Summary Card */}
      <Card className="border-border/50 shadow-md bg-gradient-to-br from-primary/10 to-card overflow-hidden">
        <CardContent className="pt-6 pb-6">
          <p className="text-center text-lg font-medium text-foreground">
            {report.summary}
          </p>
          {sajuData && (
            <p className="text-center text-sm text-muted-foreground mt-2">
              {sajuData.saju_pillars}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Personality */}
      <Card className="border-border/50 shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="font-serif text-lg flex items-center gap-2">
            <span className="text-primary">나의 성향</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground leading-relaxed">
            {report.personality}
          </p>
        </CardContent>
      </Card>

      {/* Strengths */}
      <Card className="border-border/50 shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="font-serif text-lg flex items-center gap-2">
            <span className="text-primary">나의 강점</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {report.strengths.map((strength, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-primary font-medium">{index + 1}</span>
                </span>
                <span className="text-foreground">{strength}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Cautions */}
      <Card className="border-border/50 shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="font-serif text-lg flex items-center gap-2">
            <span className="text-accent">주의할 점</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {report.cautions.map((caution, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-accent font-medium">!</span>
                </span>
                <span className="text-foreground">{caution}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* AI Advice */}
      <Card className="border-border/50 shadow-md bg-gradient-to-br from-secondary/50 to-card">
        <CardHeader className="pb-2">
          <CardTitle className="font-serif text-lg flex items-center gap-2">
            <span className="text-primary">AI 조언</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground leading-relaxed italic">
            "{report.ai_advice}"
          </p>
        </CardContent>
      </Card>

      {/* Five Elements (if available) */}
      {sajuData && (
        <Card className="border-border/50 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="font-serif text-lg flex items-center gap-2">
              <span className="text-primary">오행 분포</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <ElementBar label="목 (木)" value={sajuData.five_elements.wood} color="bg-green-500" />
              <ElementBar label="화 (火)" value={sajuData.five_elements.fire} color="bg-red-500" />
              <ElementBar label="토 (土)" value={sajuData.five_elements.earth} color="bg-amber-500" />
              <ElementBar label="금 (金)" value={sajuData.five_elements.metal} color="bg-gray-400" />
              <ElementBar label="수 (水)" value={sajuData.five_elements.water} color="bg-blue-500" />
            </div>
            <p className="text-sm text-muted-foreground mt-4 text-center">
              {sajuData.element_balance}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function ElementBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-16 text-sm text-muted-foreground">{label}</span>
      <div className="flex-1 h-3 bg-secondary rounded-full overflow-hidden">
        <div 
          className={`h-full ${color} rounded-full transition-all duration-500`}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="w-8 text-sm text-muted-foreground text-right">{value}%</span>
    </div>
  );
}
