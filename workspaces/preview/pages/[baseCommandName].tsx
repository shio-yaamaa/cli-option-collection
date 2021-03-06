import { GetStaticPaths, GetStaticProps } from 'next';

import { Command } from '../types';
import Layout from '../components/Layout';
import { CommandList } from '../components/CommandList';
import {
  getBaseCommandNamesFromSnapshots,
  getCommandsFromSnapshot,
} from '../utils/snapshot';

const BASE_COMMAND_NAME_PATTERN = /^[A-Za-z][A-Za-z0-9-]*$/;

type Props = {
  baseCommandName: string;
  commands: Command[];
};

const CommandsPage = (props: Props) => {
  return (
    <Layout title={`${props.baseCommandName} | CLI Option Collection`}>
      <CommandList commands={props.commands} />
    </Layout>
  );
};

export default CommandsPage;

// Doing SSG instead of SSR because I couldn't figure out
// how to add /snapshots directory to the build artifacts
// so that it can be accessed at runtime.
export const getStaticPaths: GetStaticPaths = async () => {
  const baseCommandNames = getBaseCommandNamesFromSnapshots();
  return {
    paths: baseCommandNames.map((baseCommandName) => ({
      params: {
        baseCommandName,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const baseCommandNameParam = context.params.baseCommandName;
  const baseCommandName = (() => {
    if (typeof baseCommandNameParam === 'string') {
      return baseCommandNameParam;
    } else {
      return baseCommandNameParam[0];
    }
  })();

  if (!BASE_COMMAND_NAME_PATTERN.test(baseCommandName)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      baseCommandName,
      commands: getCommandsFromSnapshot(baseCommandName),
    },
  };
};
