import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';

const Profile = ({navigation}) => {
  const dispatch = useDispatch();
  const {loginData} = useSelector(state => state.login);
  return (
    <View className="flex-1 bg-slate-100">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 10}}>
        <ImageBackground
          source={require('../assets/images/Book_Pattern.png')}
          resizeMode="cover"
          className="h-60">
          <LinearGradient
            start={{x: 1, y: 0}}
            end={{x: 1, y: 1}}
            colors={['rgba(5, 74, 122, 0.85)', 'rgba(10, 136, 225, 0.75)']}
            className="px-6 py-6 h-60">
            <Text className="text-white text-2xl font-bold text-center">
              Profile
            </Text>
          </LinearGradient>
        </ImageBackground>
        <View className="items-center bg-neutral-200 mx-6 -mt-32 px-5 pt-4 pb-8 rounded-2xl">
          <Image
            source={{uri: loginData.imgProfile}}
            className="w-24 h-24 object-contain my-3 rounded-full"
          />
          <Text className="font-bold text-xl text-stone-900 my-2">
            {loginData.name}
          </Text>
          <Text className="font-normal text-sm text-stone-900">
            {loginData.email}
          </Text>
        </View>

        <View className="my-12 mx-6 ">
          <TouchableOpacity
            onPress={() => navigation.navigate('EditProfile')}
            className="bg-white my-2 rounded-xl items-center flex-row px-6">
            <Ionicons name="person-circle-sharp" size={36} color="gray" />
            <Text className="text-stone-900 text-lg font-semibold my-4 ml-6">
              Edit Profile
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('About')}
            className="bg-white my-2 rounded-xl items-center flex-row px-6">
            <Ionicons name="information-circle-sharp" size={36} color="gray" />
            <Text className="text-stone-900 text-lg font-semibold my-4 ml-6">
              About
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={() => {
            dispatch({type: 'LOGOUT'});
            navigation.replace('Login');
          }}
            // onPress={() => {
            //   dispatch({type: 'RESET_DATA_LOGIN'});
            //   navigation.replace('Login');
            // }}
            // onPress={() => navigation.navigate('Login')}
            className="bg-white my-2 rounded-xl items-center flex-row px-6">
            <AntDesign name="logout" size={32} color="red" />
            <Text className="text-red-600 text-lg font-semibold my-4 ml-7">
              Logout
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity

            onPress={() => {
              dispatch({type: 'RESET_DATA_LOGIN'});
              navigation.replace('Login');
            }}
            className="bg-white my-2 rounded-xl items-center flex-row px-6">
            <AntDesign name="logout" size={32} color="red" />
            <Text className="text-red-600 text-lg font-semibold my-4 ml-7">
              Reset data
            </Text>
          </TouchableOpacity> */}
        </View>
      </ScrollView>
    </View>
  );
};
export default Profile;
