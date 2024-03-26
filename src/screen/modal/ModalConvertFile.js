import React, {useState} from 'react';
import {View, Modal, TouchableOpacity, Text, Dimensions} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import RNImageToPdf from 'react-native-image-to-pdf';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const ModalConvertFile = ({ show, onClose, onConvertSuccess }) => {
  const [imageData, setImageData] = useState(null);

  const handleImageSelection = image => {
    setImageData(image);
  };

  const openImageLibraryPDF = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 1024,
      maxHeight: 1024,
      quality: 1,
      includeBase64: false,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log(
          'ImagePicker Error: ',
          response.errorCode,
          response.errorMessage,
        );
      } else {
        console.log('ImagePicker Response: ', response);
        handleImageSelection(response.assets[0]);
      }
    });
  };

  const convertToPDF = async () => {
    try {
      const { width, height } = Dimensions.get('window');
      const options = {
        imagePaths: [imageData.uri.replace('file://', '')],
        name: 'ConvertedPDF', // PDF file name
        maxSize: {
          width: 900,
          height: Math.round((height / width) * 900), // Calculate maximum image dimension
        },
        quality: 0.9,
      };
      const pdf = await RNImageToPdf.createPDFbyImages(options);
      
      console.log(pdf.filePath); // Log the PDF file path
      onConvertSuccess(pdf.filePath);
      setImageData(null); // Call onConvertSuccess with pdf.filePath
    } catch(e) {
      console.log(e);
    }
  };
  
  
  return (
    <Modal transparent visible={show} onRequestClose={onClose}>
      <View className="flex-1 bg-slate-100">
        <View className="w-full h-16 bg-white flex-row self-center items-center pl-3 shadow-md">
        <TouchableOpacity onPress={() => { onClose(); setImageData(null); }}>
            <Ionicons name="arrow-back" size={24} color="#243bbb" />
          </TouchableOpacity>
          <Text className="ml-3 font-bold text-lg text-stone-600">
            Convert File
          </Text>
        </View>
        <View className="px-6 py-6 items-center">
          <Text className="text-stone-900 font-semibold text-lg text-center pt-10 pb-8">
            Choose Image from Gallery
          </Text>

          <TouchableOpacity
            onPress={openImageLibraryPDF}
            className="w-56 rounded-lg py-3 border-blue-700 border-2 justify-center items-center">
            <Text className="text-blue-700 font-semibold text-lg">
              Select File
            </Text>
          </TouchableOpacity>

          {imageData && (
            <View className="bg-white px-4 py-6 w-80 my-9">
              <View className="flex-row justify-between py-3">
                <View className="flex-row items-center">
                  <MaterialIcons name="image" size={24} color="#87CEEB" />
                  <Text className="pl-5 font-medium text-base text-gray-600">
                    {imageData.fileName.length > 20
                      ? `${imageData.fileName.substring(0, 20)}...`
                      : imageData.fileName}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => setImageData(null)}>
                  <MaterialIcons name="close" size={24} color="gray" />
                </TouchableOpacity>
              </View>
            </View>
          )}

          <TouchableOpacity
            className="rounded-lg my-6 py-3 bg-red-700 justify-center items-center w-80"
            onPress={convertToPDF}>
            <Text className="text-white font-semibold text-lg">
              Convert to PDF
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
