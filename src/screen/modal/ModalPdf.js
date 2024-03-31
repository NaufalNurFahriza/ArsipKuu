import React from 'react';
import { View, Modal, StyleSheet } from 'react-native';
import { Pdf } from 'react-native-pdf';

const ModalPdf = ({ visible, pdfPath, onClose }) => {
  return (
    <Modal transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.pdfContainer}>
          {/* Komponen Pdf untuk menampilkan file PDF */}
          <Pdf source={{ uri: pdfPath }} style={styles.pdf} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  pdfContainer: {
    width: '80%',
    height: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
  },
  pdf: {
    flex: 1,
    width: '100%',
  },
});

export default ModalPdf;