/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Modal, TouchableOpacity, Image } from 'react-native';
import RNFS from 'react-native-fs';

export const ModalImage = ({ item, setItem }) => {
  // console.log('img', item)
  const [item2, setItem2] = useState('');
  const Show = () => {
    if (item === '') {
      return false;
    } else {
      return true;
    }
  };
  useEffect(() => {
    if (item === '') { return; }
    const handle = async () => {
      RNFS.readFile(item, 'base64')
        .then(data => {
          setItem2('data:image/gif;base64,' + data);
          return data;
        })
        .catch(err => {
          console.log(err);
        });
    };
    handle();
  }, [item]);
  // console.log('img', item2)
  return (
    <Modal transparent visible={Show()} onRequestClose={() => setItem('')}>
      <TouchableOpacity className=" flex flex-1 justify-center items-center bg-black/[.8] p-9" onPress={() => setItem('')}>
        <View className=" flex flex-1 justify-center items-center p-9">
          <Image source={{ uri: item2 }} height={350} width={350} />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};
