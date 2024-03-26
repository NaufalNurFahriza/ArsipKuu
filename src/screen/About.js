import React from 'react';
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

export default function About({navigation}) {
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={{flex: 1, backgroundColor: '#F4F6F8'}}>
        <View className="w-full h-16 bg-white flex-row self-center items-center pl-3 shadow-md">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#243bbb" />
          </TouchableOpacity>
          <Text className="ml-3 font-bold text-lg text-stone-600">About</Text>
        </View>

        <ImageBackground
          source={require('../assets/images/Book_Pattern.png')}
          resizeMode="cover"
          className="">
          <LinearGradient
            start={{x: 1, y: 0}}
            end={{x: 1, y: 1}}
            colors={['rgba(5, 74, 122, 0.85)', 'rgba(10, 136, 225, 0.75)']}
            className="px-6 py-6">
            <Text className="text-white text-2xl font-bold text-center mb-2">
              Kelompok A1 PPG Prajabatan Gel 1 Tahun 2023
            </Text>
            <Text className="text-white text-lg text-center mb-6">
              Manajemen Perkantoran dan Layanan Bisnis
            </Text>
          </LinearGradient>
        </ImageBackground>

        <View className="px-4 py-6 bg-white rounded-lg mx-4 my-5 shadow-md">
          <Text className="text-lg font-bold mb-4">Anggota Kelompok:</Text>
          <Text className="text-base mb-2">- Ayudina Dhaniswari Nirwana</Text>
          <Text className="text-base mb-2">- Aziz Ramadhan Mulyo</Text>
          <Text className="text-base mb-2">- Ika Mulyani</Text>
          <Text className="text-base mb-2">- Mita Herliati</Text>
          <Text className="text-base mb-2">- Irwanda Wisnu Wardhana</Text>
          <Text className="text-base mb-2">- Muh. Husain</Text>
        </View>
        <View className="flex-1 justify-center items-center py-4 px-4 bg-white rounded-lg mx-4 my-5 shadow-md">
          <Image
            source={require('../assets/images/splashLogo.png')}
            className="w-32 h-36 object-contain"
          />
          <View className="flex-row justify-between items-center w-36 py-3 ">
            <Text className="text-md text-gray-500 font-normal">
              App Version
            </Text>
            <Text className="text-md text-gray-500 font-normal">v.1.0.0</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
