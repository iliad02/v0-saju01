import type { UserInfo, BirthData, SajuData, FortuneContent, SajuReport, FiveElements } from './types';

// Sample Users (5명의 샘플 사용자)
export const sampleUsers: UserInfo[] = [
  {
    user_id: 'user_001',
    email: 'kimminsu@example.com',
    login_type: 'kakao',
    job: '회사원',
    relationship_status: 'Q',
    interest_category: 'Q',
    fortune_usage_purpose: 'Q',
    signup_date: '2024-01-15T10:30:00Z',
  },
  {
    user_id: 'user_002',
    email: 'leejieun@example.com',
    login_type: 'naver',
    job: '프리랜서',
    relationship_status: 'Q',
    interest_category: 'Q',
    fortune_usage_purpose: 'Q',
    signup_date: '2024-02-20T14:45:00Z',
  },
  {
    user_id: 'user_003',
    email: 'parkjunho@example.com',
    login_type: 'google',
    job: '학생',
    relationship_status: 'Q',
    interest_category: 'Q',
    fortune_usage_purpose: 'Q',
    signup_date: '2024-03-10T09:15:00Z',
  },
  {
    user_id: 'user_004',
    email: 'choiyuna@example.com',
    login_type: 'email',
    job: '전문직',
    relationship_status: 'Q',
    interest_category: 'Q',
    fortune_usage_purpose: 'Q',
    signup_date: '2024-04-05T16:20:00Z',
  },
  {
    user_id: 'user_005',
    email: 'jeongsanghoon@example.com',
    login_type: 'kakao',
    job: '자영업',
    relationship_status: 'Q',
    interest_category: 'Q',
    fortune_usage_purpose: 'Q',
    signup_date: '2024-05-12T11:00:00Z',
  },
];

// Sample Birth Data
export const sampleBirthData: BirthData[] = [
  {
    user_id: 'user_001',
    birth_year: 1990,
    birth_month: 5,
    birth_day: 15,
    birth_time: 6,
    birth_type: 'solar',
    birth_location: '서울',
    gender: 'male',
  },
  {
    user_id: 'user_002',
    birth_year: 1995,
    birth_month: 8,
    birth_day: 22,
    birth_time: 3,
    birth_type: 'solar',
    birth_location: '부산',
    gender: 'female',
  },
  {
    user_id: 'user_003',
    birth_year: 2000,
    birth_month: 12,
    birth_day: 3,
    birth_time: 9,
    birth_type: 'lunar',
    birth_location: '대구',
    gender: 'male',
  },
  {
    user_id: 'user_004',
    birth_year: 1988,
    birth_month: 3,
    birth_day: 10,
    birth_time: 0,
    birth_type: 'solar',
    birth_location: '인천',
    gender: 'female',
  },
  {
    user_id: 'user_005',
    birth_year: 1985,
    birth_month: 11,
    birth_day: 28,
    birth_time: 11,
    birth_type: 'solar',
    gender: 'male',
  },
];

// Sample Saju Data
export const sampleSajuData: SajuData[] = [
  {
    user_id: 'user_001',
    saju_pillars: '경오 / 신사 / 임진 / 계유',
    five_elements: { wood: 20, fire: 30, earth: 25, metal: 15, water: 10 },
    ten_gods: '정관 중심 구조',
    luck_cycle: '30대부터 강한 성장운',
    year_fortune: '2024년 변화의 해',
    element_balance: '화와 토가 강하고 수가 약함',
  },
  {
    user_id: 'user_002',
    saju_pillars: '을해 / 갑신 / 병술 / 정묘',
    five_elements: { wood: 35, fire: 20, earth: 15, metal: 20, water: 10 },
    ten_gods: '편인 중심 구조',
    luck_cycle: '20대 후반부터 창의력 상승',
    year_fortune: '2024년 도약의 해',
    element_balance: '목이 강하고 토가 약함',
  },
  {
    user_id: 'user_003',
    saju_pillars: '경진 / 무자 / 기축 / 갑오',
    five_elements: { wood: 15, fire: 25, earth: 30, metal: 20, water: 10 },
    ten_gods: '비견 중심 구조',
    luck_cycle: '30대 초반 전환점',
    year_fortune: '2024년 학업 성취의 해',
    element_balance: '토가 강하고 수가 약함',
  },
  {
    user_id: 'user_004',
    saju_pillars: '무진 / 을묘 / 병오 / 경자',
    five_elements: { wood: 25, fire: 30, earth: 20, metal: 15, water: 10 },
    ten_gods: '식신 중심 구조',
    luck_cycle: '40대부터 안정운',
    year_fortune: '2024년 성취의 해',
    element_balance: '목과 화가 강하고 금이 약함',
  },
  {
    user_id: 'user_005',
    saju_pillars: '을축 / 정해 / 무술 / 임자',
    five_elements: { wood: 20, fire: 15, earth: 25, metal: 25, water: 15 },
    ten_gods: '정재 중심 구조',
    luck_cycle: '50대부터 재물운 상승',
    year_fortune: '2024년 확장의 해',
    element_balance: '토와 금이 균형 잡힘',
  },
];

// 사주 팔자 조합 데이터
const heavenlyStems = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'];
const earthlyBranches = ['자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해'];

// 사주 생성 함수
export function generateSajuPillars(birthYear: number, birthMonth: number, birthDay: number, birthTime: number): string {
  const yearIndex = (birthYear - 4) % 10;
  const yearBranch = (birthYear - 4) % 12;
  
  const monthIndex = (birthMonth + 1) % 10;
  const monthBranch = (birthMonth + 1) % 12;
  
  const dayIndex = (birthDay * 2) % 10;
  const dayBranch = (birthDay * 3) % 12;
  
  const timeIndex = birthTime % 10;
  const timeBranch = birthTime % 12;
  
  return `${heavenlyStems[yearIndex]}${earthlyBranches[yearBranch]} / ${heavenlyStems[monthIndex]}${earthlyBranches[monthBranch]} / ${heavenlyStems[dayIndex]}${earthlyBranches[dayBranch]} / ${heavenlyStems[timeIndex]}${earthlyBranches[timeBranch]}`;
}

// 오행 생성 함수
export function generateFiveElements(): FiveElements {
  const total = 100;
  const wood = Math.floor(Math.random() * 30) + 10;
  const fire = Math.floor(Math.random() * 30) + 10;
  const earth = Math.floor(Math.random() * 30) + 10;
  const metal = Math.floor(Math.random() * 20) + 5;
  const water = total - wood - fire - earth - metal;
  
  return { wood, fire, earth, metal, water: Math.max(water, 5) };
}

// 십성 생성 함수
export function generateTenGods(): string {
  const tenGods = ['비견', '겁재', '식신', '상관', '편재', '정재', '편관', '정관', '편인', '정인'];
  const randomIndex = Math.floor(Math.random() * tenGods.length);
  return `${tenGods[randomIndex]} 중심 구조`;
}

// 대운 생성 함수
export function generateLuckCycle(birthYear: number): string {
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthYear;
  const cycles = [
    '강한 성장운이 시작됩니다',
    '창의력과 표현력이 빛나는 시기',
    '안정과 풍요의 시기',
    '새로운 도전의 기회',
    '인간관계가 확장되는 시기',
  ];
  const randomCycle = cycles[Math.floor(Math.random() * cycles.length)];
  const targetAge = Math.floor((age + 10) / 10) * 10;
  return `${targetAge}대부터 ${randomCycle}`;
}

// 오행 밸런스 설명 생성
export function generateElementBalance(elements: FiveElements): string {
  const elementNames: Record<keyof FiveElements, string> = {
    wood: '목',
    fire: '화',
    earth: '토',
    metal: '금',
    water: '수',
  };
  
  const sorted = Object.entries(elements).sort((a, b) => b[1] - a[1]) as [keyof FiveElements, number][];
  const strongest = elementNames[sorted[0][0]];
  const secondStrong = elementNames[sorted[1][0]];
  const weakest = elementNames[sorted[sorted.length - 1][0]];
  
  return `${strongest}과 ${secondStrong}이 강하고 ${weakest}가 약함`;
}

// 완전한 사주 데이터 생성
export function generateCompleteSajuData(userId: string, birthData: BirthData): SajuData {
  const pillars = generateSajuPillars(
    birthData.birth_year,
    birthData.birth_month,
    birthData.birth_day,
    birthData.birth_time
  );
  const elements = generateFiveElements();
  
  return {
    user_id: userId,
    saju_pillars: pillars,
    five_elements: elements,
    ten_gods: generateTenGods(),
    luck_cycle: generateLuckCycle(birthData.birth_year),
    year_fortune: '2024년 변화와 성장의 해',
    element_balance: generateElementBalance(elements),
  };
}

// 오늘의 운세 생성
export function generateDailyFortune(userId: string): FortuneContent {
  const colors = ['파랑', '빨강', '노랑', '초록', '흰색', '검정', '보라', '주황'];
  const directions = ['동쪽', '서쪽', '남쪽', '북쪽', '동북쪽', '서북쪽', '동남쪽', '서남쪽'];
  const zodiacs = ['쥐띠', '소띠', '호랑이띠', '토끼띠', '용띠', '뱀띠', '말띠', '양띠', '원숭이띠', '닭띠', '개띠', '돼지띠'];
  
  const fortunes = [
    '오늘은 작은 기회가 큰 성과로 이어질 수 있는 날입니다. 주변 사람들의 조언에 귀 기울여 보세요.',
    '새로운 시작에 좋은 기운이 감돌고 있습니다. 미루던 일을 시작해 보세요.',
    '인간관계에서 따뜻한 에너지가 흐르는 날입니다. 오랜 친구에게 연락해 보세요.',
    '창의적인 아이디어가 떠오르는 날입니다. 메모해 두면 나중에 큰 도움이 될 거예요.',
    '차분하게 내면을 돌아보기 좋은 날입니다. 명상이나 산책을 추천드려요.',
    '재물운이 좋은 날입니다. 하지만 충동적인 소비는 자제하세요.',
    '건강에 신경 쓰면 좋은 날입니다. 충분한 휴식을 취해 보세요.',
    '학습과 성장에 좋은 에너지가 흐릅니다. 새로운 것을 배워보세요.',
  ];
  
  return {
    fortune_id: `fortune_daily_${userId}_${Date.now()}`,
    fortune_type: 'daily',
    fortune_category: '종합운',
    fortune_text: fortunes[Math.floor(Math.random() * fortunes.length)],
    lucky_color: colors[Math.floor(Math.random() * colors.length)],
    lucky_number: Math.floor(Math.random() * 9) + 1,
    lucky_direction: directions[Math.floor(Math.random() * directions.length)],
    lucky_zodiac: zodiacs[Math.floor(Math.random() * zodiacs.length)],
    fortune_score: Math.floor(Math.random() * 30) + 70,
    created_at: new Date().toISOString(),
  };
}

// 월간 운세 생성
export function generateMonthlyFortune(userId: string): FortuneContent {
  const fortunes = [
    '이번 달은 인간관계에서 새로운 기회가 들어올 가능성이 높습니다. 적극적인 네트워킹이 좋은 결과를 가져올 거예요.',
    '재물운이 상승하는 달입니다. 계획적인 소비와 저축을 병행하면 더 좋은 결과를 얻을 수 있어요.',
    '건강에 특히 신경 써야 할 달입니다. 규칙적인 생활 패턴을 유지해 보세요.',
    '커리어에서 중요한 전환점이 될 수 있는 달입니다. 새로운 기회에 열린 마음을 가져보세요.',
    '가족과의 시간이 행복을 가져다주는 달입니다. 소중한 사람들과 함께하는 시간을 늘려보세요.',
    '창의성이 폭발하는 달입니다. 예술적 활동이나 취미 생활에 투자해 보세요.',
    '학습과 자기 계발에 좋은 달입니다. 새로운 기술이나 지식을 배워보세요.',
    '여행운이 좋은 달입니다. 짧은 여행이라도 기분 전환에 큰 도움이 될 거예요.',
  ];
  
  const colors = ['파랑', '초록', '흰색', '금색'];
  const directions = ['동쪽', '남쪽', '서쪽', '북쪽'];
  const zodiacs = ['용띠', '뱀띠', '호랑이띠', '토끼띠'];
  
  return {
    fortune_id: `fortune_monthly_${userId}_${Date.now()}`,
    fortune_type: 'monthly',
    fortune_category: '종합운',
    fortune_text: fortunes[Math.floor(Math.random() * fortunes.length)],
    lucky_color: colors[Math.floor(Math.random() * colors.length)],
    lucky_number: Math.floor(Math.random() * 9) + 1,
    lucky_direction: directions[Math.floor(Math.random() * directions.length)],
    lucky_zodiac: zodiacs[Math.floor(Math.random() * zodiacs.length)],
    fortune_score: Math.floor(Math.random() * 20) + 75,
    created_at: new Date().toISOString(),
  };
}

// 연간 운세 생성
export function generateYearlyFortune(userId: string): FortuneContent {
  const fortunes = [
    '올해는 새로운 도전이 성과로 이어질 가능성이 높은 해입니다. 두려움 없이 도전하세요. 특히 상반기에 시작한 일들이 하반기에 결실을 맺을 거예요. 인간관계에서도 중요한 인연을 만날 수 있으니, 새로운 만남에 열린 마음을 가져보세요.',
    '올해는 안정과 성장이 함께 오는 해입니다. 기존에 해왔던 일들이 탄탄해지고, 새로운 기반을 다질 수 있어요. 건강 관리에 조금 더 신경 쓰면 에너지 넘치는 한 해를 보낼 수 있습니다.',
    '올해는 변화와 적응의 해입니다. 예상치 못한 변화가 있을 수 있지만, 그것이 오히려 더 좋은 기회가 될 거예요. 유연한 마음가짐이 중요합니다. 하반기에 재물운이 상승합니다.',
    '올해는 인간관계가 핵심인 해입니다. 주변 사람들과의 관계가 당신의 운을 좌우할 거예요. 진심 어린 소통을 통해 깊은 유대감을 형성해 보세요. 협력을 통해 큰 성과를 이룰 수 있습니다.',
    '올해는 자기 발견과 성장의 해입니다. 내면을 돌아보고 진정으로 원하는 것이 무엇인지 생각해 보세요. 자기 계발에 투자한 시간이 미래에 큰 자산이 될 것입니다.',
  ];
  
  const colors = ['금색', '흰색', '파랑'];
  const directions = ['동쪽', '남동쪽'];
  const zodiacs = ['용띠', '뱀띠'];
  
  return {
    fortune_id: `fortune_yearly_${userId}_${Date.now()}`,
    fortune_type: 'yearly',
    fortune_category: '종합운',
    fortune_text: fortunes[Math.floor(Math.random() * fortunes.length)],
    lucky_color: colors[Math.floor(Math.random() * colors.length)],
    lucky_number: Math.floor(Math.random() * 9) + 1,
    lucky_direction: directions[Math.floor(Math.random() * directions.length)],
    lucky_zodiac: zodiacs[Math.floor(Math.random() * zodiacs.length)],
    fortune_score: Math.floor(Math.random() * 15) + 80,
    created_at: new Date().toISOString(),
  };
}

// 사주 리포트 생성
export function generateSajuReport(sajuData: SajuData): SajuReport {
  const summaries = [
    '실행력이 뛰어나고 목표를 향해 꾸준히 나아가는 성향',
    '창의적이고 예술적 감각이 뛰어난 자유로운 영혼',
    '안정을 추구하며 신뢰감을 주는 든든한 존재',
    '리더십이 있고 사람들을 이끄는 카리스마의 소유자',
    '섬세하고 배려심이 깊어 주변을 따뜻하게 만드는 성향',
  ];
  
  const personalities = [
    '당신은 목표가 생기면 끝까지 해내는 강한 의지를 가지고 있어요. 한번 마음먹은 일은 포기하지 않는 끈기가 있습니다. 주변 사람들에게 신뢰를 주고, 팀에서 중요한 역할을 맡는 경우가 많아요.',
    '당신은 창의적인 아이디어가 넘치고, 새로운 것을 시도하는 것을 좋아해요. 예술적 감각이 뛰어나고, 자유로운 환경에서 능력을 발휘합니다. 틀에 박힌 것보다 자신만의 방식을 찾아가는 스타일이에요.',
    '당신은 따뜻한 마음과 깊은 배려심을 가지고 있어요. 주변 사람들의 감정을 잘 이해하고, 그들에게 위안을 줍니다. 조용하지만 깊은 영향력을 가진 존재예요.',
  ];
  
  const strengthsList = [
    ['꾸준함과 인내심', '높은 집중력', '책임감 있는 태도', '문제 해결 능력'],
    ['창의적 사고', '적응력', '열린 마음', '소통 능력'],
    ['리더십', '결단력', '추진력', '카리스마'],
    ['섬세함', '공감 능력', '배려심', '직관력'],
  ];
  
  const cautionsList = [
    ['완벽주의로 인한 스트레스', '타인의 의견 무시 경향', '휴식 부족'],
    ['결정 장애', '집중력 분산', '현실적 계획 부족'],
    ['독단적 결정', '감정 표현 부족', '과로 경향'],
    ['우유부단함', '타인 눈치 보기', '자기 주장 부족'],
  ];
  
  const advices = [
    '당신의 강한 추진력은 큰 장점이에요. 하지만 가끔은 멈추고 주변을 돌아보는 여유도 필요합니다. 작은 휴식이 더 큰 성과를 가져올 거예요.',
    '창의성을 발휘할 수 있는 환경을 만들어 보세요. 새로운 취미나 프로젝트가 당신에게 큰 에너지를 줄 거예요.',
    '가끔은 완벽하지 않아도 괜찮아요. 과정을 즐기다 보면 결과도 자연스럽게 따라올 거예요.',
    '당신의 직관을 믿으세요. 마음이 이끄는 대로 따라가면 좋은 결과가 있을 거예요.',
  ];
  
  const randomIndex = Math.floor(Math.random() * summaries.length);
  const personalityIndex = Math.floor(Math.random() * personalities.length);
  
  return {
    summary: summaries[randomIndex],
    personality: personalities[personalityIndex],
    strengths: strengthsList[Math.floor(Math.random() * strengthsList.length)],
    cautions: cautionsList[Math.floor(Math.random() * cautionsList.length)],
    ai_advice: advices[Math.floor(Math.random() * advices.length)],
  };
}
