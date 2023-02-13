import { FC } from 'react';
import AppContextProvider from './App.context';
import Layout from './Layout';

const App: FC = (): JSX.Element => {
  return (
    <AppContextProvider>
      <Layout />
    </AppContextProvider>
  );
};

export default App;
