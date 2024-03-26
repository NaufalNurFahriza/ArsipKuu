import React, {useEffect} from 'react';
import {View, Image} from 'react-native';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('AuthNavigation');
    }, 1000);
  }, []);

  return (
    <View className="flex-1 bg-white justify-center items-center ">
      <Image
        source={require('../assets/images/splashLogo.png')}
        className="W-[150] H-[174] object-contain"
      />
    </View>
  );
};
export default Splash;
