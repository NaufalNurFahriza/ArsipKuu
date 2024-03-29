import React, { useEffect, useState } from 'react';
import { View, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import RNFS from 'react-native-fs';

export const ModalPdf = ({ item, setItem }) => {
  console.log('pdf', item);
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
        console.log('pdf', 'data:application/pdf;base64,' + data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  useEffect(() => {
    handle();
  }, [item]);
  console.log('pdf', item2);
  return (
    <Modal transparent visible={Show()} onRequestClose={() => setItem('')}>
      <TouchableOpacity style={styles.modalContainer} onPress={() => setItem('')}>
        <View style={styles.contentContainer}>
          {/* <Image source={{ uri: item3 }} height={300} width={300} /> */}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 36,
    paddingVertical: 36,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 36,
    paddingVertical: 36,
  },
});