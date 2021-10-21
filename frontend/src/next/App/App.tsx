import { AppProps, AppInitialProps } from 'next/app';
import Link from 'next/link';
import { ComponentPropsWithoutRef, useRef } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import Pipe from '@/components/Pipe';
import clsx from 'clsx';

function NavAnchor(props: ComponentPropsWithoutRef<'a'>) {
  return <a {...props} className={clsx(props.className, 'cursor-pointer hover:underline')} />;
}

function App({ Component, pageProps }: AppInitialProps & AppProps) {
  const queryClientRef = useRef<QueryClient | null>(null);

  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          refetchIntervalInBackground: false,
        },
      },
    });
  }

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <header className="bg-blue p-4 flex flex-wrap items-center justify-between">
        <Link href="/">
          <NavAnchor>My Restaurant</NavAnchor>
        </Link>
        <div>
          <Link href="/admin" prefetch={false}>
            <NavAnchor>Admin</NavAnchor>
          </Link>
          <Pipe />
          <Link href="/basket" prefetch={false}>
            <NavAnchor>Basket</NavAnchor>
          </Link>
        </div>
      </header>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default App;
