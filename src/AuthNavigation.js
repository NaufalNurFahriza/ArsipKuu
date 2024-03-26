import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './screen/Login';
import EditProfile from './screen/EditProfile';
import Register from './screen/Register';
import MyTabs from './screen/bottomNav';
import Routing from './Routing';
import About from './screen/About';
import ConvertFile from './screen/ConvertFile';
import { ModalMenu } from './screen/modal/ModalMenu';
import { ModalNewFolder } from './screen/modal/ModalNewFolder';
import { ModalAddFile } from './screen/modal/ModalAddFile';

const Stack = createStackNavigator();
function AuthNavigation() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen
        name="bottom"
        component={MyTabs}
        screenOptions={{headerShown: false}}
        // options={{title: 'Overview'}}
      />
      <Stack.Screen name="Routing" component={Routing} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="ConvertFile" component={ConvertFile} />
      <Stack.Screen name="ModalMenu" component={ModalMenu} />
      <Stack.Screen name="ModalNewFolder" component={ModalNewFolder} />
      <Stack.Screen name="ModalAddFile" component={ModalAddFile} />
    </Stack.Navigator>
  );
}
export default AuthNavigation;
