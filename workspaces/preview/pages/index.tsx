import { GetServerSideProps } from 'next';
import Link from 'next/link';

import Layout from '../components/Layout';
import { getBaseCommandNamesFromSnapshots } from '../utils/snapshot';

type Props = {
  baseCommandNames: string[];
};

const IndexPage = (props: Props) => (
  <Layout>
    <p>
      Access{' '}
      <code>
        /{'{'}baseCommandName{'}'}
      </code>{' '}
      (e.g. <code>/ls</code>) to preview the command's options.
    </p>
    <ul>
      {props.baseCommandNames.map((baseCommandName) => (
        <li key={baseCommandName}>
          <Link href={`/${baseCommandName}`}>
            <a>{baseCommandName}</a>
          </Link>
        </li>
      ))}
    </ul>
  </Layout>
);

export default IndexPage;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  return {
    props: {
      baseCommandNames: getBaseCommandNamesFromSnapshots(),
    },
  };
};
