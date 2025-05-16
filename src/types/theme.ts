import React from 'react';

export type ThemeType = 'light' | 'dark';

export interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
}

export interface ThemeProps {
  theme: ThemeType;
  children: React.ReactNode;
}
