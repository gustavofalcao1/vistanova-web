import { Metadata } from 'next';

export function Favicon() {
  return (
    <>
      <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#E5FC2A" />
      <meta name="msapplication-TileColor" content="#E5FC2A" />
    </>
  );
}

export function getFaviconMetadata(): Metadata {
  return {
    icons: {
      icon: [
        { url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      ],
      shortcut: '/icons/favicon.ico',
      apple: [
        { url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
      other: [
        {
          rel: 'mask-icon',
          url: '/safari-pinned-tab.svg',
          color: '#E5FC2A',
        },
      ],
    },
    manifest: '/site.webmanifest',
  };
}
