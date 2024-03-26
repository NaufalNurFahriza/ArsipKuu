import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
const Login = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {loginData, isLoggedIn} = useSelector(state => state.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    console.log('login userCheck', isLoggedIn);
    if (isLoggedIn != false) {
      console.log('login user', isLoggedIn);
      navigation.replace('bottom');
    } else {
      console.log('gagal', isLoggedIn);
    }
  }, []);

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
              height: 310,
            }}/>
          <View className="w-full bg-white rounded-t-2xl px-5 pt-7 -mt-5">
            <Text className="text-gray-900 font-bold text-2xl my-4">
              Welcome, Please Login First
            </Text>
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
              secureTextEntry={true}
              onChangeText={text => setPassword(text)}
              className="my-4 w-full rounded-lg bg-slate-100 px-3"
            />
            <TouchableOpacity
              className="w-full rounded-lg my-6 py-3 bg-blue-700 justify-center items-center"
              onPress={() => {
                if (
                  loginData.email === email &&
                  loginData.email != '' &&
                  loginData.password === password &&
                  loginData.password != ''
                ) {
                  console.log('login user', isLoggedIn);
                  dispatch({type: 'LOGIN'});
                  navigation.replace('bottom');
                }
              }}
              >
              <Text className="text-white font-bold text-lg">Login</Text>
            </TouchableOpacity>
            <View className="w-full justify-center items-center my-3 flex-row">
              <Text className="text-md text-gray-600">
                Don't Have An Account yet?
              </Text>
              <TouchableOpacity>
                <Text
                  className="text-md text-blue-900 font-medium ml-1"
                  onPress={() => navigation.navigate('Register')}>
                  Register
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default Login;
