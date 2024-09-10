'use client';
import "@/styles/globals.css";
import type { AppProps } from "next/app";


import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';

// Global components
import Navbar from "@/components/general/Navbar";
import CookiesAlert from "@/components/general/CookiesAlert";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <CacheProvider>
        <div className="flex flex-col min-h-screen">
          <CookiesAlert />
          <Navbar />
          <Component {...pageProps} />
        </div>
      </CacheProvider>
    </ChakraProvider>
  );
}