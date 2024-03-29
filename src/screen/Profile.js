import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';

const Profile = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loginData } = useSelector(state => state.login);
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}>
        <ImageBackground
          source={require('../assets/images/Book_Pattern.png')}
          resizeMode="cover"
          style={styles.backgroundImage}>
          <LinearGradient
            start={{ x: 1, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={['rgba(5, 74, 122, 0.85)', 'rgba(10, 136, 225, 0.75)']}
            style={styles.gradient}>
            <Text style={styles.title}>Profile</Text>
          </LinearGradient>
        </ImageBackground>
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: loginData.imgProfile }}
            style={styles.profileImage}
          />
          <Text style={styles.name}>{loginData.name}</Text>
          <Text style={styles.email}>{loginData.email}</Text>
        </View>

        <View style={styles.optionsContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('EditProfile')}
            style={styles.option}>
            <Ionicons name="person-circle-sharp" size={36} color="gray" />
            <Text style={styles.optionText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('About')}
            style={styles.option}>
            <Ionicons name="information-circle-sharp" size={36} color="gray" />
            <Text style={styles.optionText}>About</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              dispatch({ type: 'LOGOUT' });
              navigation.replace('Login');
            }}
            style={styles.option}>
            <AntDesign name="logout" size={32} color="red" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  backgroundImage: {
    height: 200,
  },
  gradient: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    height: 200,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  profileContainer: {
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    marginHorizontal: 24,
    marginTop: -64,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 8,
    shadowColor: '#000', 
    shadowOffset: { 
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25, 
    shadowRadius: 3.84, 
    elevation: 5, 
  },
  profileImage: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: 12,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#292524',
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: '#292524',
  },
  optionsContainer: {
    marginTop: 48,
    marginHorizontal: 24,
  },
  option: {
    backgroundColor: 'white',
    marginVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  optionText: {
    color: '#292524',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 24,
  },
  logoutText: {
    color: 'red',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 28,
  },
});

export default Profile;