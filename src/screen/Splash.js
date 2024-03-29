import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Splash = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('AuthNavigation');
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/splashLogo.png')}
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 174,
    resizeMode: 'contain',
  },
});

export default Splash;