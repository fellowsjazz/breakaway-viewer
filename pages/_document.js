// pages/_document.js
import { theme, ColorModeScript } from '@chakra-ui/react';
import Document, { Html, Head, Main, NextScript } from 'next/document';


class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Add your custom <head> elements here */}
        </Head>
        <body>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <Main />
    <NextScript />
</body>
      </Html>
    );
  }
}

export default MyDocument;
