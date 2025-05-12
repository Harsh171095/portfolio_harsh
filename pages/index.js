// pages/index.js
import Head from "next/head";
import Portfolio from "../components/Portfolio";

export default function Home() {
  return (
    <>
      <Head>
        <title>Harsh Kadiya | Senior iOS & Flutter Developer</title>
        <meta
          name="description"
          content="Harsh Kadiya - Senior iOS & Flutter Developer with 5+ years of experience creating exceptional mobile applications."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Harsh Kadiya | Senior iOS & Flutter Developer"
        />
        <meta
          property="og:description"
          content="Senior iOS & Flutter Developer with 5+ years of experience creating exceptional mobile applications."
        />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:title"
          content="Harsh Kadiya | Senior iOS & Flutter Developer"
        />
        <meta
          property="twitter:description"
          content="Senior iOS & Flutter Developer with 5+ years of experience creating exceptional mobile applications."
        />

        {/* Keywords for SEO */}
        <meta
          name="keywords"
          content="iOS Developer, Flutter Developer, Mobile App Development, Swift, SwiftUI, Objective-C, Dart, React Native, App Developer"
        />
      </Head>
      <Portfolio />
    </>
  );
}
