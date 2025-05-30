'use client';

import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

/**
 * Componente para alternar entre os temas claro e escuro
 */
export function ThemeToggle() {
  const { isDark, toggleTheme, isMounted } = useTheme();
  
  // Evita hidratação incorreta
  if (!isMounted) {
    return (
      <Button variant="ghost" size="icon" aria-label="Alternar tema" className="w-10 px-0">
        <Sun className="h-5 w-5" />
      </Button>
    );
  }
  
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label={isDark ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
          className="w-10 px-0"
        >
          {isDark ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="right">
        {isDark ? 'Tema claro' : 'Tema escuro'}
      </TooltipContent>
    </Tooltip>
  );
}

export default ThemeToggle;
