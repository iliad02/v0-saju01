"use client";

import { useEffect, useRef, useState } from 'react';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSpeechRecognition } from '@/hooks/use-speech-recognition';
import { cn } from '@/lib/utils';

interface VoiceInputButtonProps {
  onTranscript: (text: string) => void;
  className?: string;
  size?: 'sm' | 'default' | 'lg';
  hint?: string;
}

export function VoiceInputButton({
  onTranscript,
  className,
  size = 'default',
  hint,
}: VoiceInputButtonProps) {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [interimText, setInterimText] = useState('');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { isListening, transcript, isSupported, startListening, stopListening } =
    useSpeechRecognition({
      onResult: (text) => {
        onTranscript(text);
        setInterimText('');
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      },
      onError: (err) => {
        setErrorMsg(err);
        setTimeout(() => setErrorMsg(null), 3000);
      },
      lang: 'ko-KR',
    });

  // Mirror interim transcript to local state for display
  useEffect(() => {
    setInterimText(transcript);
  }, [transcript]);

  const handleToggle = () => {
    if (!isSupported) {
      setErrorMsg('이 브라우저는 음성 인식을 지원하지 않습니다.');
      setTimeout(() => setErrorMsg(null), 3000);
      return;
    }
    if (isListening) {
      stopListening();
    } else {
      setErrorMsg(null);
      startListening();
      // Auto-stop after 10 seconds
      timeoutRef.current = setTimeout(() => stopListening(), 10000);
    }
  };

  if (!isSupported) return null;

  return (
    <div className={cn('flex flex-col items-center gap-1', className)}>
      <Button
        type="button"
        variant={isListening ? 'default' : 'outline'}
        size={size}
        onClick={handleToggle}
        aria-label={isListening ? '음성 입력 중지' : '음성으로 입력하기'}
        aria-pressed={isListening}
        className={cn(
          'relative transition-all duration-200',
          isListening && 'ring-2 ring-primary ring-offset-2 animate-pulse'
        )}
      >
        {isListening ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" aria-hidden="true" />
        ) : (
          <Mic className="w-4 h-4 mr-2" aria-hidden="true" />
        )}
        {isListening ? '듣는 중...' : (hint ?? '음성으로 입력')}
      </Button>

      {/* Interim transcript bubble */}
      {isListening && interimText && (
        <p
          role="status"
          aria-live="polite"
          className="text-xs text-muted-foreground bg-secondary/60 rounded-full px-3 py-1 max-w-xs text-center truncate"
        >
          {interimText}
        </p>
      )}

      {/* Error message */}
      {errorMsg && (
        <p role="alert" aria-live="assertive" className="text-xs text-destructive text-center">
          {errorMsg}
        </p>
      )}
    </div>
  );
}
