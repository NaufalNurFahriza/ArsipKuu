/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Modal, TouchableOpacity, Image, StyleSheet } from 'react-native';
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
      <TouchableOpacity style={styles.modalContainer} onPress={() => setItem('')}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item2 }} style={styles.image} />
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 36,
    paddingVertical: 36,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 36,
    paddingVertical: 36,
  },
  image: {
    height: 350,
    width: 350,
  },
});