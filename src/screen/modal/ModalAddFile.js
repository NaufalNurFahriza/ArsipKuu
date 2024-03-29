import React from 'react';
import { View, Modal, TouchableOpacity, Text, StyleSheet } from 'react-native';

export const ModalAddFile = ({ show, onClose, openCamera, openImageLibrary }) => {
  return (
    <Modal transparent visible={show} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeaderText}>Select File Photo</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              onClose();
              openCamera();
            }}
            style={styles.modalOption}
          >
            <Text style={styles.modalOptionText}>Take Photo..</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onClose();
              openImageLibrary();
            }}
            style={styles.modalOption}
          >
            <Text style={styles.modalOptionText}>Choose from Gallery..</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cancelContainer}>
          <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#f8fafc',
    borderRadius: 8,
  },
  modalHeader: {
    width: '100%',
    paddingVertical: 16,
  },
  modalHeaderText: {
    textAlign: 'center',
    color: '#292524',
    fontSize: 16,
    fontWeight: '500',
  },
  modalOption: {
    width: '100%',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#d1d5db',
    paddingVertical: 12,
  },
  modalOptionText: {
    textAlign: 'center',
    color: '#3b82f6',
    fontSize: 18,
    fontWeight: '600',
  },
  cancelContainer: {
    width: '100%',
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    marginTop: 20,
    paddingVertical: 12,
  },
  cancelButton: {
    paddingVertical: 12,
  },
  cancelButtonText: {
    textAlign: 'center',
    color: '#3b82f6',
    fontSize: 18,
    fontWeight: '600',
  },
});