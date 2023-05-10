import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      />
      <Head>
        <meta
          property="og:url"
          content="https://emp-manager.squareboat.info/"
        />
        <meta property="og:image" content="/assets/meta-image.png" />
        <meta property="og:image:url" content="/assets/meta-image.png" />
        <link rel="icon" type="image/x-icon" href="/assets/favicon.png"></link>
        {process.env.NODE_ENV_TEST !== "production" && (
          <>
            <meta name="robots" content="noindex,nofollow" />
            <meta name="googlebot" content="noindex,nofollow" />
          </>
        )}
      </Head>
      <script src="https://accounts.google.com/gsi/client" defer></script>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
