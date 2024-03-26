import React from 'react';
import {View, Modal, TouchableOpacity, Text, TextInput} from 'react-native';

export const ModalNewFolder = ({show, onClose, folderName, setFolderName, createFolder}) => {
  return (
    <Modal transparent visible={show} onRequestClose={onClose}>
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
              placeholder="Enter New Folder"
              value={folderName}
              onChangeText={text => setFolderName(text)}
              className="my-3 w-full rounded-lg bg-white px-3 text-sm border-b-[1px] border-blue-700"
              keyboardType="default"
            />
          </View>
          <View className="flex-row justify-end">
            <TouchableOpacity className="" onPress={onClose}>
              <Text className="text-blue-600 text-sm font-semibold">
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="ml-7" 
             onPress={() => {
              onClose();
              createFolder();
            }}>
              <Text className="text-blue-600 text-sm font-semibold">Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
