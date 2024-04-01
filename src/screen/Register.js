import React, { useState } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ScrollView,
  TextInput,
  Platform,
} from 'react-native';
import { useDispatch } from 'react-redux';

const Register = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
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
    dispatch({ type: 'ADD_DATA_LOGIN', data: data });
    navigation.replace('bottom');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}>
        <KeyboardAvoidingView
          behavior="padding"
          enabled
          keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
          <Image
            source={require('../assets/images/Book_Pattern4.png')}
            style={styles.image}
          />
          <View style={styles.formContainer}>
            <Text style={styles.title}>
              Welcome, Please create your account
            </Text>
            <Text style={styles.label}>Name</Text>
            <TextInput
              placeholder="Masukkan Nama"
              onChangeText={text => setName(text)}
              style={styles.input}
              keyboardType="default"
            />
            <Text style={styles.label}>Email</Text>
            <TextInput
              placeholder="Masukkan Email"
              onChangeText={text => setEmail(text)}
              style={styles.input}
              keyboardType="email-address"
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
              placeholder="Masukkan Password"
              onChangeText={text => setPassword(text)}
              secureTextEntry={true}
              style={styles.input}
            />
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              placeholder="Masukkan Nomor Handphone"
              onChangeText={text => setPhoneNumber(text)}
              style={styles.input}
              keyboardType="numeric"
            />
            <TouchableOpacity
              style={styles.button}
              onPress={tambahData}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginLink}>Login</Text>
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
  scrollView: {
    paddingBottom: 10,
  },
  image: {
    width: Dimensions.get('window').width,
    height: 220,
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
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12,
  },
  loginText: {
    fontSize: 14,
    color: '#666',
  },
  loginLink: {
    color: '#007bff',
    fontWeight: 'bold',
    marginLeft: 4,
  },
});

export default Register;