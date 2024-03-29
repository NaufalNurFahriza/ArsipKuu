import React, { useState } from 'react';
import { View, Modal, TouchableOpacity, Text, Dimensions, StyleSheet } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
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
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => { onClose(); setImageData(null); }}>
            <Ionicons name="arrow-back" size={24} color="#243bbb" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Convert File</Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Choose Image from Gallery</Text>

          <TouchableOpacity
            onPress={openImageLibraryPDF}
            style={styles.selectFileButton}>
            <Text style={styles.selectFileButtonText}>Select File</Text>
          </TouchableOpacity>

          {imageData && (
            <View style={styles.imageContainer}>
              <View style={styles.imageInfo}>
                <View style={styles.imageInfoRow}>
                  <MaterialIcons name="image" size={24} color="#87CEEB" />
                  <Text style={styles.imageFileName}>
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
            style={styles.convertButton}
            onPress={convertToPDF}>
            <Text style={styles.convertButtonText}>Convert to PDF</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

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
  contentContainer: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    alignItems: 'center',
  },
  title: {
    color: '#292524',
    fontWeight: '600',
    fontSize: 18,
    textAlign: 'center',
    paddingVertical: 40,
    paddingHorizontal: 24,
  },
  selectFileButton: {
    width: 216,
    borderRadius: 8,
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectFileButtonText: {
    color: '#3b82f6',
    fontWeight: '600',
    fontSize: 18,
  },
  imageContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 24,
    width: 320,
    marginVertical: 36,
  },
  imageInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  imageInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageFileName: {
    paddingLeft: 20,
    fontWeight: '500',
    fontSize: 16,
    color: '#4b5563',
  },
  convertButton: {
    borderRadius: 8,
    marginVertical: 24,
    paddingVertical: 12,
    backgroundColor: '#ef4444',
    justifyContent: 'center',
    alignItems: 'center',
    width: 320,
  },
  convertButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
  },
});