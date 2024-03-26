import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { ModalAddPhoto } from './modal/ModalAddPhoto';

export default function EditProfile({ navigation }) {
  const { loginData } = useSelector(state => state.login);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [imgProfile, setImgProfile] = useState('');
  const [modalPhoto, setModalPhoto] = useState(false);
  const dispatch = useDispatch();
  const tambahData = () => {
    const data = {
      name: name ? name : 'Agus Susanto',
      email: email ? email : 'Agussusanto@gmail.com',
      phoneNumber: phoneNumber ? phoneNumber : '081245678972',
      imgProfile: imgProfile ? imgProfile :
        'https://i.pinimg.com/564x/7c/c7/a6/7cc7a630624d20f7797cb4c8e93c09c1.jpg'
      ,
    };
    dispatch({ type: 'ADD_DATA_LOGIN', data: data });
    navigation.replace('bottom');
  };
  const handleCloseModal = () => {
    setModalPhoto(false);
  };
  return (
    <View className="flex-1 bg-slate-200">
      <ModalAddPhoto show={modalPhoto} onClose={handleCloseModal} setImgProfile={setImgProfile} />
      <View className="w-full h-16 bg-white flex-row self-center items-center pl-3 shadow-md">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#243bbb" />
        </TouchableOpacity>
        <Text className="ml-3 font-bold text-lg text-stone-600">
          Edit Profile
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}>
        <ImageBackground
          source={require('../assets/images/Book_Pattern.png')}
          resizeMode="cover"
          className="h-60">
          <LinearGradient
            start={{ x: 1, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={['rgba(5, 74, 122, 0.85)', 'rgba(10, 136, 225, 0.75)']}
            className="px-6 py-6 h-60">
            <View className="py-10 items-center">
              <Image
                source={{ uri: imgProfile === '' ? loginData.imgProfile : imgProfile }}
                className="w-28 h-28 object-contain my-3 border-2 border-black rounded-full"
              />
              <View className="bg-blue-500 items-center my-4 px-4 py-2 rounded-3xl">
                <TouchableOpacity
                  onPress={() => {
                    setModalPhoto(true);
                  }}>
                  <View className="flex-row items-center">
                    <MaterialIcons name="edit" size={20} color="white" />
                    <Text className="text-base text-white font-medium ml-2">
                      Edit Photo
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>

        <View className="px-6 py-6">
          <View className="mb-6">
            <Text className="text-blue-700 font-bold">Nama</Text>
            <TextInput
              placeholder="Name"
              defaultValue={loginData.name}
              onChangeText={Text => setName(Text)}
              className="w-full mt-3 rounded-lg bg-slate-50 px-3"
              keyboardType="default"
            />
          </View>

          <View className="mb-6">
            <Text className="text-blue-700 font-bold">Email</Text>
            <TextInput
              placeholder="Email@gmail.com"
              defaultValue={loginData.email}
              onChangeText={Text => setEmail(Text)}
              className="w-full mt-3 rounded-lg bg-slate-50 px-3"
              keyboardType="email-address"
            />
          </View>

          <View className="mb-6">
            <Text className="text-blue-700 font-bold">Phone Number</Text>
            <TextInput
              placeholder="080040008000"
              defaultValue={loginData.phoneNumber}
              onChangeText={Text => setPhoneNumber(Text)}
              className="w-full mt-3 rounded-lg bg-slate-50 px-3"
              keyboardType="numeric"
            />
          </View>
          <TouchableOpacity
            onPress={tambahData}
            className="w-full rounded-lg my-6 py-3 bg-blue-700 justify-center items-center">
            <Text className="text-white font-bold text-lg">Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
