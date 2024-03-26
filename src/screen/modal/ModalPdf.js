/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Modal, TouchableOpacity, Image } from 'react-native';
import RNFS from 'react-native-fs';

export const ModalPdf = ({ item, setItem }) => {
  console.log('pdf',item);
  const [item2, setItem2] = useState('');
  const Show = () => {
    if (item === '') {
      return false;
    } else {
      return true;
    }
  };
  const handle = async () => {
    RNFS.readFile(item, 'base64')
      .then(data => {
        setItem2('data:application/pdf;base64,' + data);
        console.log('pdf','data:application/pdf;base64,' + data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  useEffect(() => {
    handle();
  }, [item]);
  console.log('pdf',item2);
  return (
    <Modal transparent visible={Show()} onRequestClose={() => setItem('')}>
      <TouchableOpacity className=" flex flex-1 justify-center items-center bg-black/[.8] p-9" onPress={() => setItem('')}>
        <View className=" flex flex-1 justify-center items-center p-9">
          {/* <Image source={{ uri: item3 }} height={300} width={300} /> */}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};
