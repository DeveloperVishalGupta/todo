
import '@/styles/globals.css'
import { NextUIProvider } from '@nextui-org/react';

function MyApp({ Component, pageProps }) {
  const renderWithLayout = Component.getLayout || ((page) => page);
  return (
    <NextUIProvider>
      {renderWithLayout(<Component {...pageProps} />)}
    </NextUIProvider>
  );
}

export default MyApp;
