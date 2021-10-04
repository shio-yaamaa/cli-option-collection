import React, { useState, useEffect } from 'react';
import './App.css';

import { Command } from '../../types';

enum DataState {
  LOADING,
  READY,
  ERROR,
}

interface Props {
  baseCommandName: string | null;
}

export const App: React.VFC<Props> = (props) => {
  const [dataState, setDataState] = useState<DataState>(DataState.LOADING);
  const [commands, setCommands] = useState<Command[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!props.baseCommandName) {
      setDataState(DataState.ERROR);
      setError('Invalid base command name');
      return;
    }
    const fetchData = async () => {
      const response = await fetch(`snapshots/${props.baseCommandName}.json`);
      if (response.ok) {
        let json = [];
        try {
          json = await response.json();
        } catch (error) {
          console.log(error);
          setDataState(DataState.ERROR);
          setError('Invalid JSON data');
        }
        setCommands(json);
        setDataState(DataState.READY);
      } else {
        setDataState(DataState.ERROR);
        setError(response.statusText);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      {dataState === DataState.LOADING && <p>Loading...</p>}
      {dataState === DataState.READY && (
        <code>{JSON.stringify(commands, null, 2)}</code>
      )}
      {dataState === DataState.ERROR && <p>Error: {error}</p>}
    </div>
  );
};
