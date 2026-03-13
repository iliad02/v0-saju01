"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useUser } from '@/lib/user-context';
import { BIRTH_TIME_OPTIONS, JOB_OPTIONS, type SignupFormData, type UserInfo, type BirthData } from '@/lib/types';

export function SignupForm() {
  const router = useRouter();
  const { signup } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState<SignupFormData>({
    email: '',
    job: '',
    calendar_type: 'solar',
    gender: 'male',
    birth_year: 1990,
    birth_month: 1,
    birth_day: 1,
    birth_time: '6',
    birth_location: '',
  });

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1700 + 1 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email) {
      newErrors.email = '이메일을 입력해주세요';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식을 입력해주세요';
    }
    
    if (!formData.job) {
      newErrors.job = '직업을 선택해주세요';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const userId = `user_${Date.now()}`;
      
      const userInfo: UserInfo = {
        user_id: userId,
        email: formData.email,
        login_type: 'email',
        job: formData.job,
        relationship_status: 'Q',
        interest_category: 'Q',
        fortune_usage_purpose: 'Q',
        signup_date: new Date().toISOString(),
      };
      
      const birthData: BirthData = {
        user_id: userId,
        birth_year: formData.birth_year,
        birth_month: formData.birth_month,
        birth_day: formData.birth_day,
        birth_time: parseInt(formData.birth_time),
        birth_type: formData.calendar_type,
        birth_location: formData.birth_location || undefined,
        gender: formData.gender,
      };
      
      // Signup and generate saju data
      signup(userInfo, birthData);
      
      // Redirect to main page
      router.push('/main');
    } catch (error) {
      console.error('[v0] Signup error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* User Info Section */}
      <Card className="border-border/50 shadow-md bg-card/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="font-serif text-xl">기본 정보</CardTitle>
          <CardDescription>사주 분석을 위한 기본 정보를 입력해주세요</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              placeholder="example@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={errors.email ? 'border-destructive' : ''}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="job">직업</Label>
            <Select
              value={formData.job}
              onValueChange={(value) => setFormData({ ...formData, job: value })}
            >
              <SelectTrigger className={errors.job ? 'border-destructive' : ''}>
                <SelectValue placeholder="직업을 선택해주세요" />
              </SelectTrigger>
              <SelectContent>
                {JOB_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.job && (
              <p className="text-sm text-destructive">{errors.job}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Birth Data Section */}
      <Card className="border-border/50 shadow-md bg-card/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="font-serif text-xl">생년월일시</CardTitle>
          <CardDescription>정확한 사주 분석을 위해 출생 정보를 입력해주세요</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Calendar Type */}
          <div className="space-y-3">
            <Label>양력/음력</Label>
            <RadioGroup
              value={formData.calendar_type}
              onValueChange={(value: 'solar' | 'lunar') => 
                setFormData({ ...formData, calendar_type: value })
              }
              className="flex gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="solar" id="solar" />
                <Label htmlFor="solar" className="font-normal cursor-pointer">양력</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="lunar" id="lunar" />
                <Label htmlFor="lunar" className="font-normal cursor-pointer">음력</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Gender */}
          <div className="space-y-3">
            <Label>성별</Label>
            <RadioGroup
              value={formData.gender}
              onValueChange={(value: 'male' | 'female') => 
                setFormData({ ...formData, gender: value })
              }
              className="flex gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male" className="font-normal cursor-pointer">남자</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female" className="font-normal cursor-pointer">여자</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Birth Date */}
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-2">
              <Label htmlFor="birth_year">출생년</Label>
              <Select
                value={formData.birth_year.toString()}
                onValueChange={(value) => setFormData({ ...formData, birth_year: parseInt(value) })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}년
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="birth_month">출생월</Label>
              <Select
                value={formData.birth_month.toString()}
                onValueChange={(value) => setFormData({ ...formData, birth_month: parseInt(value) })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month) => (
                    <SelectItem key={month} value={month.toString()}>
                      {month}월
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="birth_day">출생일</Label>
              <Select
                value={formData.birth_day.toString()}
                onValueChange={(value) => setFormData({ ...formData, birth_day: parseInt(value) })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {days.map((day) => (
                    <SelectItem key={day} value={day.toString()}>
                      {day}일
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Birth Time */}
          <div className="space-y-2">
            <Label htmlFor="birth_time">태어난 시간</Label>
            <Select
              value={formData.birth_time}
              onValueChange={(value) => setFormData({ ...formData, birth_time: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="태어난 시간을 선택해주세요" />
              </SelectTrigger>
              <SelectContent>
                {BIRTH_TIME_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Birth Location (Optional) */}
          <div className="space-y-2">
            <Label htmlFor="birth_location">
              출생지 <span className="text-muted-foreground text-sm">(선택)</span>
            </Label>
            <Input
              id="birth_location"
              placeholder="예: 서울, 부산"
              value={formData.birth_location}
              onChange={(e) => setFormData({ ...formData, birth_location: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        className="w-full h-14 text-lg font-medium shadow-lg"
        disabled={isSubmitting}
      >
        {isSubmitting ? '사주 분석 중...' : '사주 분석 시작하기'}
      </Button>
    </form>
  );
}
