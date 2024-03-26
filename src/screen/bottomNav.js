import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Home from './Home';
import * as React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Profile from './Profile';
import Files from './Files';
const Tab = createBottomTabNavigator();

function MyTabBar({state, descriptors, navigation}) {
  return (
    <View className="flex-row h-16 content-center bg-white p-2"
>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const LabelIcon = {
          Home: 'home',
          Files: 'folder-open',
          Profile: 'person',
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            className="flex-1 self-center h-10 w-10 items-center"
>
            <Icon
              name={LabelIcon[label]}
              size={20}
              color={isFocused ? '#243bbb' : '#D8D8D8'}
            />
            <Text style={{color: isFocused ? '#243bbb' : '#D8D8D8'}}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function MyTabs(params) {
  return (
    <Tab.Navigator
      tabBar={props => <MyTabBar {...props} />}
      screenOptions={{headerShown: false}}
      initialRouteName="Home">
      <Tab.Screen name="Home" component={Home} />
      {/* <Tab.Screen name="Files" component={Files} /> */}
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
export default MyTabs;
