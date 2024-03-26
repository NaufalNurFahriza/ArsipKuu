import React from 'react';
import { View, Modal, TouchableOpacity, Text } from 'react-native';

export const ModalAddFile = ({ show, onClose, openCamera, openImageLibrary }) => {
  return (
    <Modal transparent visible={show} onRequestClose={onClose}>
      <View className="flex flex-1 justify-end items-center bg-black/[.8] p-4">
        <View className="w-full bg-slate-100 rounded-lg">
          <View className="w-full  py-4">
            <Text className=" text-center text-stone-900 text-base font-medium">
              Select File Photo
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              onClose();
              openCamera();
            }}
            className="w-full  border-y-[1px] border-gray-300 py-3">
            <Text className=" text-center text-blue-600 text-lg font-semibold my-2">
              Take Photo..
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onClose();
              openImageLibrary();
            }}
            className="w-full  py-4">
            <Text className="text-center text-blue-600 text-lg font-semibold my-2">
              Choose from Gallery..
            </Text>
          </TouchableOpacity>
        </View>
        <View className="w-full bg-slate-100 rounded-lg my-5 py-3">
          <TouchableOpacity onPress={onClose}>
            <Text className=" text-center text-blue-600 text-lg font-semibold my-2">
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};