import { Html, Head, Main, NextScript } from 'next/document'
import SEO from '../components/SEO'

export default function Document() {
  return (
    <Html>
      <Head>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Hind:wght@300;400;500;600;700&display=swap"  />
            <link rel="icon" href="./assets/img/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}