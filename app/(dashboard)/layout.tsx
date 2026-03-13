import { UserProvider } from '@/lib/user-context';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <UserProvider>{children}</UserProvider>;
}
