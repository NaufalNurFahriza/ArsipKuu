import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const Login = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { loginData, isLoggedIn } = useSelector(state => state.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    console.log('login userCheck', isLoggedIn);
    if (isLoggedIn !== false) {
      console.log('login user', isLoggedIn);
      navigation.replace('bottom');
    } else {
      console.log('gagal', isLoggedIn);
    }
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}>
        <KeyboardAvoidingView
          behavior="padding"
          enabled
          keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
          <Image
            source={require('../assets/images/Book_Pattern4.png')}
            style={{
              width: Dimensions.get('window').width,
              height: 310,
            }}
          />
          <View style={styles.formContainer}>
            <Text style={styles.title}>Welcome, Please Login First</Text>
            <Text style={styles.label}>Email</Text>
            <TextInput
              placeholder="Masukkan Email"
              onChangeText={text => setEmail(text)}
              style={styles.input}
              placeholderTextColor='#555'
              keyboardType="email-address"
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
              placeholder="Masukkan Password"
              secureTextEntry={true}
              onChangeText={text => setPassword(text)}
              style={styles.input}
              placeholderTextColor='#555'
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                if (
                  loginData.email === email &&
                  loginData.email !== '' &&
                  loginData.password === password &&
                  loginData.password !== ''
                ) {
                  console.log('login user', isLoggedIn);
                  dispatch({ type: 'LOGIN' });
                  navigation.replace('bottom');
                }
              }}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>
                Don't Have An Account yet?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.registerLink}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 28,
    marginTop: -20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    color: '#333',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  label: {
    color: '#007bff',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 6,
  },
  input: {
    width: '100%',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginVertical: 12,
    fontSize: 16,
    fontWeight: '500'
  },
  button: {
    width: '100%',
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 24,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12,
  },
  registerText: {
    fontSize: 14,
    color: '#666',
  },
  registerLink: {
    color: '#007bff',
    fontWeight: 'bold',
    marginLeft: 4,
  },
});

export default Login;