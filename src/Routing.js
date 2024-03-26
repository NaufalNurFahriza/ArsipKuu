import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthNavigation from './AuthNavigation';
import Splash from './screen/Splash';
const Stack = createNativeStackNavigator();

function Routing() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="AuthNavigation" component={AuthNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routing;
