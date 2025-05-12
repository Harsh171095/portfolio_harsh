import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="description"
            content="Harsh Kadiya - Senior iOS & Flutter Developer with 5+ years of experience creating exceptional mobile applications. Specializing in Swift, SwiftUI, Objective-C, and Flutter development."
          />
          <meta
            name="keywords"
            content="iOS Developer, Flutter Developer, Mobile App Development, Swift, SwiftUI, Objective-C, Dart, React Native, App Developer, Pune, Maharashtra, Firebase, SDK Development"
          />
          <meta name="author" content="Harsh Kadiya" />

          {/* Open Graph / Facebook */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://yourdomainname.com/" />
          <meta
            property="og:title"
            content="Harsh Kadiya | Senior iOS & Flutter Developer"
          />
          <meta
            property="og:description"
            content="Senior iOS & Flutter Developer with 5+ years of experience creating exceptional mobile applications."
          />
          <meta
            property="og:image"
            content="https://yourdomainname.com/og-image.jpg"
          />

          {/* Twitter */}
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://yourdomainname.com/" />
          <meta
            property="twitter:title"
            content="Harsh Kadiya | Senior iOS & Flutter Developer"
          />
          <meta
            property="twitter:description"
            content="Senior iOS & Flutter Developer with 5+ years of experience creating exceptional mobile applications."
          />
          <meta
            property="twitter:image"
            content="https://yourdomainname.com/twitter-image.jpg"
          />

          {/* Favicon */}
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />

          {/* Fonts */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
