import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaView, StatusBar, Text } from 'react-native';

import { persistor, store } from './src/reducers/store';
import Routing from './src/Routing';


const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar barStyle={'dark-content'} />
          <Routing />
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
};

export default App;