// src/pages/_app.tsx
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import { loggerLink } from "@trpc/client/links/loggerLink";
import { withTRPC } from "@trpc/next";
import { SessionProvider } from "next-auth/react";
import superjson from "superjson";
import type { AppType } from "next/dist/shared/lib/utils";
import type { AppRouter } from "../server/router";
import { themeChange } from 'theme-change'
import { useEffect } from 'react';
import type { Session } from "next-auth";
import dynamic from 'next/dynamic'
import "../styles/globals.css";
import { Toaster } from 'react-hot-toast';
import { ReactQueryDevtools } from 'react-query/devtools'


const Header = dynamic(
  () => import('../components/Header'),
  { ssr: false }
)

//wagmi.
import { WagmiConfig, createClient, configureChains, Chain } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public';
import { infuraProvider } from 'wagmi/providers/infura'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'

//rainbow kit UI framework.
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import Footer from "../components/Footer";

const Celo: Chain = {
  id: 0xa4ec,
  name: 'Celo',
  network: 'Celo',
  nativeCurrency: {
    decimals: 18,
    name: 'Celo',
    symbol: 'CELO',
  },
  rpcUrls: {
    default: 'https://forno.celo.org',
  },
  blockExplorers: {
    default: { name: 'CeloExplorer', url: 'https://explorer.celo.org/' },
  },
  testnet: false,
}

const Alfajores: Chain = {
  id: 0xaef3,
  name: 'Alfajores Testnet',
  network: 'Alfajores Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Alfajores Celo',
    symbol: 'A-CELO',
  },
  rpcUrls: {
    default: 'https://alfajores-forno.celo-testnet.org',
  },
  blockExplorers: {
    default: { name: 'AlfajoresCeloExplorer', url: 'https://alfajores-blockscout.celo-testnet.org/' },
  },
  testnet: true,
}

const { chains, provider, webSocketProvider } = configureChains([Celo, Alfajores],
  [jsonRpcProvider({
    rpc: (chain) => {
      if (chain.id !== Celo.id || Alfajores.id) return null
      return { http: chain.rpcUrls.default }
    },
  }),
  publicProvider()
  ]
)

const { connectors } = getDefaultWallets({
  appName: 'Greengo',
  chains
});


const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
})

const MyApp: AppType = ({
  Component,
  pageProps: { session, ...pageProps },
}: { Component: any, pageProps: any }) => {

  useEffect(() => {
    themeChange(false)
  }, [])

  return (
    <SessionProvider session={session}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <Toaster />
          <div className="bg-base-100">
            <Header />
            <Component {...pageProps} />
            <Footer />
          </div>
          <ReactQueryDevtools initialIsOpen={false} />
        </RainbowKitProvider>
      </WagmiConfig>
    </SessionProvider>
  );
};

const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = `${getBaseUrl()}/api/trpc`;

    return {
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        httpBatchLink({ url }),
      ],
      url,
      transformer: superjson,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },

      // To use SSR properly you need to forward the client's headers to the server
      // headers: () => {
      //   if (ctx?.req) {
      //     const headers = ctx?.req?.headers;
      //     delete headers?.connection;
      //     return {
      //       ...headers,
      //       "x-ssr": "1",
      //     };
      //   }
      //   return {};
      // }
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(MyApp);
