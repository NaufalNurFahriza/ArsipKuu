
import React, {useState} from 'react';
import {View, Text, KeyboardAvoidingView, Image, TouchableOpacity, Dimensions,} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';

const Register = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNUmber] = useState('');
  const [password, setPassword] = useState('');
  const {loginData} = useSelector(state => state.login);
  const dispatch = useDispatch();
  const tambahData = () => {
    const data = {
      name: name ? name : 'Agus Susanto',
      email: email ? email : 'Agussusanto@gmail.com',
      phoneNumber: phoneNumber ? phoneNumber : '081245678972',
      imgProfile:
        'https://i.pinimg.com/564x/7c/c7/a6/7cc7a630624d20f7797cb4c8e93c09c1.jpg',
      password: password ? password : '123123',
    };
    dispatch({type: 'ADD_DATA_LOGIN', data: data});
    navigation.replace('bottom');
  };
  return (
    <View className="flex-1 bg-slate-100">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 10}}>
        <KeyboardAvoidingView
          behavior="padding"
          enabled
          keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
          <Image
            source={require('../assets/images/Book_Pattern4.png')}
            style={{
              width: Dimensions.get('window').width,
              height: 220,
            }}
          />
          <View className="w-full bg-white rounded-t-2xl px-5 pt-7 -mt-5">
            <Text className="text-gray-900 font-bold text-2xl my-4">
              Welcome, Please create your account
            </Text>
            <Text className="text-blue-900 font-bold text-sm">Name</Text>
            <TextInput
              placeholder="Masukkan Nama"
              onChangeText={text => setName(text)}
              className="my-4 w-full rounded-lg bg-slate-100 px-3"
              keyboardType="default"
            />
            <Text className="text-blue-900 font-bold text-sm">Email</Text>
            <TextInput
              placeholder="Masukkan Email"
              onChangeText={text => setEmail(text)}
              className="my-4 w-full rounded-lg bg-slate-100 px-3"
              keyboardType="email-address"
            />
            <Text className="text-blue-900 font-bold text-sm">Password</Text>
            <TextInput
              placeholder="Masukkan Password"
              onChangeText={text => setPassword(text)}
              secureTextEntry={true}
              className="my-4 w-full rounded-lg bg-slate-100 px-3"
            />
            <Text className="text-blue-900 font-bold text-sm">Phone Number</Text>
            <TextInput
              placeholder="Masukkan Nomor Handphone"
              onChangeText={text => setPhoneNUmber(text)}
              className="my-4 w-full rounded-lg bg-slate-100 px-3"
              keyboardType="numeric"
            />
            <TouchableOpacity
              className="w-full rounded-lg my-6 py-3 bg-blue-700 justify-center items-center"
              onPress={tambahData}
              // onPress={() => navigation.navigate('BottomNav')}
              >
              <Text className="text-white font-bold text-lg">Register</Text>
            </TouchableOpacity>
            <View className="w-full justify-center items-center my-3 flex-row">
              <Text className="text-md text-gray-600">
                already have an account?
              </Text>
              <TouchableOpacity>
                <Text
                  className="text-md text-blue-900 font-medium ml-1"
                  onPress={() => navigation.navigate('Login')}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default Register;