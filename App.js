import React, { useEffect } from 'react';
import { Provider } from 'react-redux'
import { NativeBaseProvider, Box } from 'native-base';

import storeConfig from './src/redux/store'
import SplashScreen from './src/components/SplashScreen';
import socket from './src/socket';
import { setNotificationEvents } from './src/helpers/pushNotification';

const store = storeConfig()
socket(store)

setNotificationEvents()

export default function App() {

  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <SplashScreen />
      </NativeBaseProvider>
    </Provider>
  );
};