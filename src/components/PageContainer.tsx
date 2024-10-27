import { ReactNode } from 'react';
import BackButton from './BackButton';

interface PageContainerProps {
  children: ReactNode;
  title: string;
  showBack?: boolean;
}

export default function PageContainer({ children, title, showBack = true }: PageContainerProps) {
  return (
    <div className="min-h-screen p-6">
      {showBack && <BackButton />}
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold text-black mb-8">{title}</h1>
        {children}
      </div>
    </div>
  );
}