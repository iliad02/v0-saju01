"use client";

import { Volume2, VolumeX, Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTTS } from '@/hooks/use-tts';
import { cn } from '@/lib/utils';

interface ReadAloudButtonProps {
  text: string;
  label?: string;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost' | 'secondary';
  size?: 'sm' | 'default' | 'lg' | 'icon';
  showLabel?: boolean;
}

export function ReadAloudButton({
  text,
  label,
  className,
  variant = 'outline',
  size = 'default',
  showLabel = true,
}: ReadAloudButtonProps) {
  const { speak, pause, resume, stop, isSpeaking, isPaused, isSupported } = useTTS({
    lang: 'ko-KR',
    rate: 0.9,
  });

  if (!isSupported) return null;

  const handleClick = () => {
    if (isSpeaking && !isPaused) {
      pause();
    } else if (isPaused) {
      resume();
    } else {
      speak(text);
    }
  };

  const handleStop = () => stop();

  const ariaLabel = isSpeaking && !isPaused
    ? '읽기 일시정지'
    : isPaused
    ? '읽기 재개'
    : label
    ? `${label} 읽어주기`
    : '운세 읽어주기';

  const Icon = isSpeaking && !isPaused ? Pause : isPaused ? Play : Volume2;
  const buttonLabel = isSpeaking && !isPaused
    ? '일시정지'
    : isPaused
    ? '계속 읽기'
    : '읽어주기';

  if (size === 'icon') {
    return (
      <div className={cn('flex items-center gap-1', className)}>
        <Button
          type="button"
          variant={isSpeaking ? 'default' : variant}
          size="icon"
          onClick={handleClick}
          aria-label={ariaLabel}
          aria-pressed={isSpeaking}
          className={cn(isSpeaking && 'ring-2 ring-primary ring-offset-1')}
        >
          <Icon className="w-4 h-4" aria-hidden="true" />
        </Button>
        {isSpeaking && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleStop}
            aria-label="읽기 중지"
          >
            <VolumeX className="w-4 h-4" aria-hidden="true" />
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Button
        type="button"
        variant={isSpeaking ? 'default' : variant}
        size={size}
        onClick={handleClick}
        aria-label={ariaLabel}
        aria-pressed={isSpeaking}
        className={cn(
          'transition-all duration-200',
          isSpeaking && 'ring-2 ring-primary ring-offset-1'
        )}
      >
        <Icon className="w-4 h-4 mr-2" aria-hidden="true" />
        {showLabel && buttonLabel}
      </Button>
      {isSpeaking && (
        <Button
          type="button"
          variant="ghost"
          size={size}
          onClick={handleStop}
          aria-label="읽기 중지"
        >
          <VolumeX className="w-4 h-4 mr-2" aria-hidden="true" />
          {showLabel && '중지'}
        </Button>
      )}
    </div>
  );
}
