// User Info Type (사용자 정보)
export interface UserInfo {
  user_id: string;
  email: string;
  login_type: 'kakao' | 'naver' | 'google' | 'email';
  job: string;
  relationship_status: string;
  interest_category: string;
  fortune_usage_purpose: string;
  signup_date: string;
}

// Birth Data Type (생년월일시 데이터)
export interface BirthData {
  user_id: string;
  birth_year: number;
  birth_month: number;
  birth_day: number;
  birth_time: number;
  birth_type: 'solar' | 'lunar'; // 양력/음력
  birth_location?: string;
  gender: 'male' | 'female';
}

// Saju Data Type (사주 데이터)
export interface SajuData {
  user_id: string;
  saju_pillars: string; // 사주 팔자 (예: 갑진 / 을사 / 병오 / 정유)
  five_elements: FiveElements; // 오행
  ten_gods: string; // 십성
  luck_cycle: string; // 대운
  year_fortune: string; // 세운
  element_balance: string; // 오행 밸런스
}

// Five Elements Type (오행)
export interface FiveElements {
  wood: number;  // 목
  fire: number;  // 화
  earth: number; // 토
  metal: number; // 금
  water: number; // 수
}

// Fortune Content Type (운세 콘텐츠)
export interface FortuneContent {
  fortune_id: string;
  fortune_type: 'daily' | 'monthly' | 'yearly';
  fortune_category: string;
  fortune_text: string;
  lucky_color: string;
  lucky_number: number;
  lucky_direction: string;
  lucky_zodiac: string;
  fortune_score: number;
  created_at: string;
}

// Saju Report Type (사주 리포트)
export interface SajuReport {
  summary: string; // 사주 한 줄 요약
  personality: string; // 성향 설명
  strengths: string[]; // 강점
  cautions: string[]; // 주의할 점
  ai_advice: string; // AI 조언
}

// Signup Form Data
export interface SignupFormData {
  email: string;
  job: string;
  calendar_type: 'solar' | 'lunar';
  gender: 'male' | 'female';
  birth_year: number;
  birth_month: number;
  birth_day: number;
  birth_time: string;
  birth_location?: string;
}

// Birth Time Options
export const BIRTH_TIME_OPTIONS = [
  { value: '0', label: '자시 (00:00~01:59)' },
  { value: '1', label: '축시 (02:00~03:59)' },
  { value: '2', label: '인시 (04:00~05:59)' },
  { value: '3', label: '묘시 (06:00~07:59)' },
  { value: '4', label: '진시 (08:00~09:59)' },
  { value: '5', label: '사시 (10:00~11:59)' },
  { value: '6', label: '오시 (12:00~13:59)' },
  { value: '7', label: '미시 (14:00~15:59)' },
  { value: '8', label: '신시 (16:00~17:59)' },
  { value: '9', label: '유시 (18:00~19:59)' },
  { value: '10', label: '술시 (20:00~21:59)' },
  { value: '11', label: '해시 (22:00~23:59)' },
] as const;

// Job Options
export const JOB_OPTIONS = [
  { value: '학생', label: '학생' },
  { value: '회사원', label: '회사원' },
  { value: '자영업', label: '자영업' },
  { value: '프리랜서', label: '프리랜서' },
  { value: '공무원', label: '공무원' },
  { value: '전문직', label: '전문직' },
  { value: '무직', label: '무직' },
  { value: '기타', label: '기타' },
] as const;
