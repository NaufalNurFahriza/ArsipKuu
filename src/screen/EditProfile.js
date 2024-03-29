import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
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
    <View style={styles.container}>
      <ModalAddPhoto show={modalPhoto} onClose={handleCloseModal} setImgProfile={setImgProfile} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#243bbb" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Edit Profile</Text>
      </View>
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
            <View style={styles.profileContainer}>
              <Image
                source={{ uri: imgProfile === '' ? loginData.imgProfile : imgProfile }}
                style={styles.profileImage}
              />
              <View style={styles.editPhotoContainer}>
                <TouchableOpacity
                  onPress={() => {
                    setModalPhoto(true);
                  }}>
                  <View style={styles.editPhotoButton}>
                    <MaterialIcons name="edit" size={20} color="white" />
                    <Text style={styles.editPhotoText}>Edit Photo</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Nama</Text>
            <TextInput
              placeholder="Name"
              defaultValue={loginData.name}
              onChangeText={Text => setName(Text)}
              style={styles.input}
              keyboardType="default"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              placeholder="Email@gmail.com"
              defaultValue={loginData.email}
              onChangeText={Text => setEmail(Text)}
              style={styles.input}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <TextInput
              placeholder="080040008000"
              defaultValue={loginData.phoneNumber}
              onChangeText={Text => setPhoneNumber(Text)}
              style={styles.input}
              keyboardType="numeric"
            />
          </View>
          <TouchableOpacity
            onPress={tambahData}
            style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  header: {
    width: '100%',
    height: 64,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerText: {
    marginLeft: 12,
    fontWeight: 'bold',
    fontSize: 18,
    color: '#292524',
  },
  backgroundImage: {
    height: 240,
  },
  gradient: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    height: 240,
  },
  profileContainer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  profileImage: {
    width: 112,
    height: 112,
    borderRadius: 56,
    borderWidth: 1,
    borderColor: 'blue',
    marginBottom: 12,
  },
  editPhotoContainer: {
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  editPhotoButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editPhotoText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  formContainer: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    color: '#3b82f6',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    marginTop: 12,
    borderRadius: 8,
    backgroundColor: '#f8fafb',
    paddingHorizontal: 12,
  },
  saveButton: {
    width: '100%',
    borderRadius: 8,
    marginTop: 24,
    paddingVertical: 12,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});