import React from 'react';
import { View, Modal, TouchableOpacity, Text } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export const ModalAddPhoto = ({ show, onClose, setImgProfile, dispatch, navigation }) => {
  const openCamera = async () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
    };

    try {
      const result = await launchCamera(options);
      console.log(result, result.assets[0].uri);
      if (!result.cancelled) {
        setImgProfile(result.assets[0].uri); // Update imgProfile dengan URI gambar dari kamera
        tambahData(result.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openImageLibrary = async () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
    };

    try {
      const result = await launchImageLibrary(options);
      console.log(result, result.assets[0].uri)
      if (!result.cancelled) {
        setImgProfile(result.assets[0].uri); // Update imgProfile dengan URI gambar dari galeri
        tambahData(result.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const tambahData = (i: any) => {
    const data = {
      imgProfile: i
    };
    dispatch({ type: 'ADD_IMAGE', data: data });
    navigation.replace('bottom');
  };

  return (
    <Modal transparent visible={show} onRequestClose={onClose}>
      <View className="flex flex-1 justify-end items-center bg-black/[.8] p-4">
        <View className="w-full bg-slate-100 rounded-lg">
          <View className="w-full py-4">
            <Text className="text-center text-stone-900 text-base font-medium">
              Select File Photo
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              openCamera();
              onClose();
            }}
            className="w-full border-y-[1px] border-gray-300 py-3">
            <Text className="text-center text-blue-600 text-lg font-semibold my-2">
              Take Photo
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              openImageLibrary();
              onClose();
            }}
            className="w-full py-4">
            <Text className="text-center text-blue-600 text-lg font-semibold my-2">
              Choose from Gallery
            </Text>
          </TouchableOpacity>
        </View>
        <View className="w-full bg-slate-100 rounded-lg my-5 py-3">
          <TouchableOpacity onPress={onClose}>
            <Text className="text-center text-blue-600 text-lg font-semibold my-2">
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
