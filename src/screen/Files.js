import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  ScrollView,
  ImageBackground,
  TextInput,
  StyleSheet,
  Modal,
} from 'react-native';
import RNFS from 'react-native-fs';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import {ModalMenu} from './modal/ModalMenu';

const Files = ({navigation}) => {
  const [currentPath, setCurrentPath] = useState(RNFS.DocumentDirectoryPath);
  const [folders, setFolders] = useState([]);
  const [folderName, setFolderName] = useState('');
  const [showNewFolderInput, setShowNewFolderInput] = useState(false);
  const [showNewFileInput, setShowNewFileInput] = useState(false);
  const [fileName, setFileName] = useState('');
  const [showAllPath, setShowAllPath] = useState(false);
  const [sortDirection, setSortDirection] = useState('asc');
  const [modalMenu, setModalMenu] = useState(false);
  const [showNewImageInput, setShowNewImageInput] = useState(false);

  useEffect(() => {
    getAllFolders(currentPath);
  }, [currentPath]);

  const getAllFolders = path => {
    RNFS.readDir(path)
      .then(result => {
        setFolders(result);
      })
      .catch(error => {
        console.error('Error reading folder:', error);
      });
  };

  const createFolder = () => {
    const newPath = `${currentPath}/${folderName}`;
    RNFS.mkdir(newPath)
      .then(() => {
        setFolderName('');
        setShowNewFolderInput(false);
        getAllFolders(currentPath);
      })
      .catch(error => {
        console.error('Error creating folder:', error);
      });
  };

  const createFile = () => {
    const filePath = `${currentPath}/${fileName}`;
    const fileContent = 'This is a sample file content.';
    RNFS.writeFile(filePath, fileContent, 'utf8')
      .then(() => {
        getAllFolders(currentPath);
        console.log('File created successfully!');
        setShowNewFileInput(false); // Close the modal
      })
      .catch(error => {
        console.error('Error creating file:', error);
      });
  };

  const deleteDir = path => {
    RNFS.unlink(path)
      .then(() => {
        getAllFolders(currentPath);
      })
      .catch(error => {
        console.error('Error deleting folder:', error);
      });
  };

  const navigateToFolder = folder => {
    setCurrentPath(folder.path);
  };

  const navigateBack = () => {
    // Define the root directory path
    const rootDirectoryPath = '/data/user/0/com.file_manager_app';

    // Remove the last part of the current path to navigate to the parent directory
    const parentPath = currentPath.split('/').slice(0, -1).join('/');

    // Check if the parentPath is at the root directory
    if (parentPath === rootDirectoryPath) {
      // If at root directory, disable back navigation
      return;
    }

    // Otherwise, navigate to the parent directory
    setCurrentPath(parentPath);
  };

  const sortData = () => {
    // Buat salinan array folders agar tidak merubah state langsung
    const sortedFolders = [...folders];
    // Logika pengurutan data
    if (sortDirection === 'asc') {
      // Urutkan data dari A ke Z
      sortedFolders.sort((a, b) => a.name.localeCompare(b.name));
      // Ubah arah pengurutan menjadi descending
      setSortDirection('desc');
    } else {
      // Urutkan data dari Z ke A
      sortedFolders.sort((a, b) => b.name.localeCompare(a.name));
      // Ubah arah pengurutan menjadi ascending
      setSortDirection('asc');
    }
    // Perbarui state folders dengan data yang sudah diurutkan
    setFolders(sortedFolders);
  };

  const openCamera = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 1024,
      maxHeight: 1024,
      quality: 1,
      includeBase64: false,
      saveToPhotos: true, // Menyimpan ke galeri setelah diambil
    };
  
    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera picker');
      } else if (response.errorCode) {
        console.log(
          'Camera Error: ',
          response.errorCode,
          response.errorMessage,
        );
      } else {
        console.log('Camera Response: ', response);
        // Simpan gambar sebagai file .png
        saveImageAsPng(response.assets[0]);
      }
    });
  };
  
  const openImageLibrary = () => {
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
        // Simpan gambar sebagai file .png
        saveImageAsPng(response.assets[0]);
      }
    });
  };
  
  const saveImageAsPng = async asset => {
    const sourcePath = asset.uri; // Path dari gambar yang diambil
    const fileNamePrefix = 'IMG_00'; // Awalan nama file
    const existingFiles = await RNFS.readdir(RNFS.DocumentDirectoryPath); // Mendapatkan daftar file yang ada
    let maxNumber = 0;
    
    // Mencari nomor file terbesar
    existingFiles.forEach(file => {
      if (file.startsWith(fileNamePrefix)) {
        const fileNumber = parseInt(file.replace(fileNamePrefix, '').replace('.png', ''));
        if (!isNaN(fileNumber) && fileNumber > maxNumber) {
          maxNumber = fileNumber;
        }
      }
    });
  
    // Membuat nama file baru dengan nomor yang belum digunakan
    const newFileName = `${fileNamePrefix}${(maxNumber + 1).toString().padStart(3, '0')}.png`;
    const destinationPath = `${RNFS.DocumentDirectoryPath}/${newFileName}`; // Path untuk menyimpan gambar sebagai .png
  
    try {
      // Membaca konten gambar
      const imageContent = await RNFS.readFile(sourcePath, 'base64');
      // Menyimpan konten gambar sebagai file .png
      await RNFS.writeFile(destinationPath, imageContent, 'base64');
      console.log('Image saved as .png:', destinationPath);
      // Perbarui daftar folder setelah menyimpan gambar
      getAllFolders(currentPath);
    } catch (error) {
      console.error('Error saving image as .png:', error);
    }
  };

  const handleCloseModal = () => {
    setModalMenu(false);
  };

  const renderItem = ({item}) => (
    <View className="w-full py-5 bg-white flex-row items-center justify-between px-4 border-b-2 border-b-slate-100 rounded-sm">
      <TouchableOpacity
        className="flex-row items-center"
        onPress={() => navigateToFolder(item)}
        onLongPress={() => {
          Alert.alert(
            `Delete ${item.isDirectory() ? 'Folder' : 'File'}`,
            `Are you sure you want to delete ${item.name}?`,
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Delete',
                onPress: () => deleteDir(item.path),
                style: 'destructive',
              },
            ],
          );
        }}>
        <View>
        {item.isDirectory() ? (
          <FontAwesome name="folder" size={24} color="#F8D775" />
        ) : (
          item.name.toLowerCase().endsWith('.jpg') || item.name.toLowerCase().endsWith('.png') ? (
            <FontAwesome name="image" size={24} color="#87CEEB" />
          ) : (
            <FontAwesome name="file-text" size={24} color="gray" />
          )
        )}
      </View>
        <Text className="text-sm font-medium ml-4">{item.name}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          Alert.alert(
            `Delete ${item.isDirectory() ? 'Folder' : 'File'}`,
            `Are you sure you want to delete ${item.name}?`,
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Delete',
                onPress: () => deleteDir(item.path),
                style: 'destructive',
              },
            ],
          );
        }}
        className="w-6 h-6">
        <AntDesign name="delete" size={20} color="gray" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 bg-slate-100">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 10}}>
        <ModalMenu
          show={modalMenu}
          onClose={handleCloseModal}
          navigation={navigation}
        />
        <ImageBackground
          source={require('../assets/images/Book_Pattern2.png')}
          resizeMode="cover"
          className=" h-44">
          <LinearGradient
            start={{x: 0, y: 1}}
            end={{x: 1, y: 0}}
            colors={['rgba(9, 136, 224, 0.45)', 'rgba(5, 74, 122, 0.85)']}
            className="px-6 py-6 h-44">
            <Text className="text-white text-2xl font-bold">File Manager</Text>
          </LinearGradient>
        </ImageBackground>
        <View className="px-5 py-5">
          <View className="pb-5 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <TouchableOpacity className="px-4" onPress={navigateBack}>
                <AntDesign
                  name="arrowleft"
                  size={24}
                  className="bg-stone-900"
                />
              </TouchableOpacity>
              <View style={{flexDirection: 'column'}}>
                <Text className="text-lg text-stone-900 capitalize">
                  {currentPath.split('/').pop()}
                </Text>
              </View>
            </View>

            <TouchableOpacity onPress={sortData}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text className="text-base text-stone-900 font-semibold pr-3">
                  {sortDirection === 'asc' ? 'Z - A' : 'A - Z'}
                </Text>
                <AntDesign
                  name={sortDirection === 'asc' ? 'caretdown' : 'caretup'}
                  size={16}
                  className="bg-stone-900"
                />
              </View>
            </TouchableOpacity>
          </View>

          <FlatList
            data={folders}
            renderItem={renderItem}
            keyExtractor={item => item.path}
          />
        </View>
      </ScrollView>

      <View className="bottom-3 right-5 absolute flex-col">
        <TouchableOpacity onPress={() => setShowNewImageInput(true)}>
          <LinearGradient
            start={{x: 0, y: 1}}
            end={{x: 1, y: 0}}
            colors={['#71C9EA', '#498AD7']}
            className="items-center justify-center rounded-full w-12 h-12 ">
            <AntDesign name="jpgfile1" size={24} color="white" />
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setShowNewFileInput(true)}>
          <LinearGradient
            start={{x: 0, y: 1}}
            end={{x: 1, y: 0}}
            colors={['#71C9EA', '#498AD7']}
            className="items-center justify-center rounded-full w-12 h-12 my-6">
            <AntDesign name="addfile" size={24} color="white" />
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setShowNewFolderInput(true)}>
          <LinearGradient
            start={{x: 0, y: 1}}
            end={{x: 1, y: 0}}
            colors={['#71C9EA', '#498AD7']}
            className="items-center justify-center rounded-full w-12 h-12">
            <AntDesign name="addfolder" size={24} color="white" />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {showNewImageInput && (
         <Modal>
         <View className=" flex flex-1 justify-end items-center bg-black/[.8] p-9">
          <View className="w-full bg-slate-100 rounded-lg">
            <View className="w-full py-4">
              <Text className="text-center text-stone-900 text-base font-medium">
                Select File Photo
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                openCamera();
                setShowNewImageInput(false);
              }}
              className="w-full border-y-[1px] border-gray-300 py-3">
              <Text className="text-center text-blue-600 text-lg font-semibold my-2">
                Take Photo
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                openImageLibrary();
                setShowNewImageInput(false);
              }}
              className="w-full py-4">
              <Text className="text-center text-blue-600 text-lg font-semibold my-2">
                Choose from Gallery
              </Text>
            </TouchableOpacity>
          </View>
          <View className="w-full bg-slate-100 rounded-lg my-5 py-3">
            <TouchableOpacity onPress={() => setShowNewImageInput(false)}>
              <Text className="text-center text-blue-600 text-lg font-semibold my-2">
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        </Modal>
      )}

      {showNewFileInput && (
        <Modal>
          <View className=
          " flex flex-1 justify-center items-center bg-black/[.8] p-9">
            <View className="w-full bg-slate-100 rounded-lg p-4">
              <View className="w-full">
                <Text className=" text-stone-900 text-lg font-medium">
                  New File
                </Text>
              </View>
              <View className="w-full">
                <Text className=" text-gray-500 text-sm font-normal my-2">
                  New File Name
                </Text>
                <TextInput
                  className=""
                  placeholder="Enter file name"
                  value={fileName}
                  onChangeText={text => setFileName(text)}
                  keyboardType="default"
                />
              </View>
              <View className="flex-row justify-end">
                <TouchableOpacity
                  className=""
                  onPress={() => setShowNewFileInput(false)}>
                  <Text className="text-blue-600 text-sm font-semibold">
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity className="ml-7" onPress={createFile}>
                  <Text className="text-blue-600 text-sm font-semibold">
                    Ok
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
      {showNewFolderInput && (
        <Modal>
         <View className=" flex flex-1 justify-center items-center bg-black/[.8] p-9">
            <View className="w-full bg-slate-100 rounded-lg p-4">
              <View className="w-full">
                <Text className=" text-stone-900 text-lg font-medium">
                  New Folder
                </Text>
              </View>
              <View className="w-full">
                <Text className=" text-gray-500 text-sm font-normal my-2">
                  New Folder Name
                </Text>
                <TextInput
                  className=""
                  placeholder="Enter file name"
                  value={folderName}
                  onChangeText={text => setFolderName(text)}
                  keyboardType="default"
                />
              </View>
              <View className="flex-row justify-end">
                <TouchableOpacity
                  className=""
                  onPress={() => setShowNewFolderInput(false)}>
                  <Text className="text-blue-600 text-sm font-semibold">
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity className="ml-7" onPress={createFolder}>
                  <Text className="text-blue-600 text-sm font-semibold">
                    Ok
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default Files;
