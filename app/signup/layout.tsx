import { UserProvider } from '@/lib/user-context';

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <UserProvider>{children}</UserProvider>;
}
