import React from 'react';
import Head from 'next/head';

type Props = {
  title?: string;
  children?: React.ReactNode;
};

const Layout: React.VFC<Props> = (props: Props) => {
  const baseTitle = 'CLI Option Collection Preview';
  const title = props.title ? `${props.title} | ${baseTitle}` : baseTitle;
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {props.children}
    </div>
  );
};

export default Layout;
