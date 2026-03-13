"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { UserInfo, BirthData, SajuData, FortuneContent, SajuReport } from './types';
import { 
  generateCompleteSajuData, 
  generateDailyFortune, 
  generateSajuReport,
  sampleUsers,
  sampleBirthData,
  sampleSajuData
} from './mock-data';

interface UserContextType {
  user: UserInfo | null;
  birthData: BirthData | null;
  sajuData: SajuData | null;
  dailyFortune: FortuneContent | null;
  sajuReport: SajuReport | null;
  isLoading: boolean;
  setUser: (user: UserInfo) => void;
  setBirthData: (data: BirthData) => void;
  login: (userId: string) => void;
  signup: (userInfo: UserInfo, birthData: BirthData) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<UserInfo | null>(null);
  const [birthData, setBirthDataState] = useState<BirthData | null>(null);
  const [sajuData, setSajuData] = useState<SajuData | null>(null);
  const [dailyFortune, setDailyFortune] = useState<FortuneContent | null>(null);
  const [sajuReport, setSajuReport] = useState<SajuReport | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing user session
    const storedUserId = typeof window !== 'undefined' ? sessionStorage.getItem('userId') : null;
    if (storedUserId) {
      loadUserData(storedUserId);
    } else {
      setIsLoading(false);
    }
  }, []);

  const loadUserData = (userId: string) => {
    setIsLoading(true);
    
    // Check if it's a sample user
    const sampleUser = sampleUsers.find(u => u.user_id === userId);
    const sampleBirth = sampleBirthData.find(b => b.user_id === userId);
    const sampleSaju = sampleSajuData.find(s => s.user_id === userId);
    
    if (sampleUser) {
      setUserState(sampleUser);
      if (sampleBirth) setBirthDataState(sampleBirth);
      if (sampleSaju) {
        setSajuData(sampleSaju);
        setSajuReport(generateSajuReport(sampleSaju));
      }
      setDailyFortune(generateDailyFortune(userId));
    } else {
      // Try to load from session storage
      const storedUser = typeof window !== 'undefined' ? sessionStorage.getItem('userData') : null;
      const storedBirth = typeof window !== 'undefined' ? sessionStorage.getItem('birthData') : null;
      const storedSaju = typeof window !== 'undefined' ? sessionStorage.getItem('sajuData') : null;
      
      if (storedUser) setUserState(JSON.parse(storedUser));
      if (storedBirth) setBirthDataState(JSON.parse(storedBirth));
      if (storedSaju) {
        const saju = JSON.parse(storedSaju);
        setSajuData(saju);
        setSajuReport(generateSajuReport(saju));
      }
      if (storedUser) {
        setDailyFortune(generateDailyFortune(userId));
      }
    }
    
    setIsLoading(false);
  };

  const setUser = (newUser: UserInfo) => {
    setUserState(newUser);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('userId', newUser.user_id);
      sessionStorage.setItem('userData', JSON.stringify(newUser));
    }
  };

  const setBirthData = (data: BirthData) => {
    setBirthDataState(data);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('birthData', JSON.stringify(data));
    }
  };

  const login = (userId: string) => {
    loadUserData(userId);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('userId', userId);
    }
  };

  const signup = (userInfo: UserInfo, newBirthData: BirthData) => {
    // Save user info
    setUserState(userInfo);
    setBirthDataState(newBirthData);
    
    // Generate saju data
    const generatedSaju = generateCompleteSajuData(userInfo.user_id, newBirthData);
    setSajuData(generatedSaju);
    setSajuReport(generateSajuReport(generatedSaju));
    setDailyFortune(generateDailyFortune(userInfo.user_id));
    
    // Store in session
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('userId', userInfo.user_id);
      sessionStorage.setItem('userData', JSON.stringify(userInfo));
      sessionStorage.setItem('birthData', JSON.stringify(newBirthData));
      sessionStorage.setItem('sajuData', JSON.stringify(generatedSaju));
    }
  };

  const logout = () => {
    setUserState(null);
    setBirthDataState(null);
    setSajuData(null);
    setDailyFortune(null);
    setSajuReport(null);
    if (typeof window !== 'undefined') {
      sessionStorage.clear();
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        birthData,
        sajuData,
        dailyFortune,
        sajuReport,
        isLoading,
        setUser,
        setBirthData,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
