import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { useCurrentTheme } from 'use-theme-hook';
import WIP from '../components/WIP';

function MyApp({ Component, pageProps }: AppProps) {
  const currentTheme = useCurrentTheme();

  useEffect(() => {
    handleThemeChange();
  }, [currentTheme]);

  const handleThemeChange = () => {
    if (typeof document === 'undefined') return;

    const bodyClassList = document.body.classList;
    currentTheme === 'dark'
      ? bodyClassList.add('dark')
      : bodyClassList.remove('dark');
  };

  return (
    <div>
      <WIP />
      <Component {...pageProps} />
    </div>
  );
}
export default MyApp;
