import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="jp">
      <Head>
        <title>HairSalonApp</title>
        <meta
          name="description"
          content="このHairSalonAppはヘアサロンの経営で管理したい要素を一元管理できるアプリです。"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <meta name="author" content="R_Serori" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon"></link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
