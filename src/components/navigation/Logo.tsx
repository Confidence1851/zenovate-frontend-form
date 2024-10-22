import { cn } from '@/lib/utils';
import React from 'react';

interface LogoProps {
  className?: string;
}
const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <h4
      className={cn(
        className,
        'font-raleway font-bold tracking-tight capitalize',
      )}
    >
      Zenovate
    </h4>
  );
};

export default Logo;
