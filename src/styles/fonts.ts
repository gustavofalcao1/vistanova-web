// This file is used to define font faces and font families

// Import font files
const inter = {
  normal: {
    src: '/fonts/Inter-Regular.woff2',
    weight: '400',
    style: 'normal',
    display: 'swap',
  },
  medium: {
    src: '/fonts/Inter-Medium.woff2',
    weight: '500',
    style: 'normal',
    display: 'swap',
  },
  semibold: {
    src: '/fonts/Inter-SemiBold.woff2',
    weight: '600',
    style: 'normal',
    display: 'swap',
  },
  bold: {
    src: '/fonts/Inter-Bold.woff2',
    weight: '700',
    style: 'normal',
    display: 'swap',
  },
} as const;

export const fonts = {
  inter,
} as const;

export type FontFamily = keyof typeof fonts;
export type FontWeight = keyof typeof inter;
