import React from 'react';
import { StyleSheet, View } from 'react-native';
import Pdf from 'react-native-pdf';

export default function PdfViewer({ route }) {
  const { pdfPath } = route.params;

  return (
    <View style={styles.container}>
      <Pdf
        source={{ uri: pdfPath }}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`);
        }}
        onError={(error) => {
          console.log('Cannot render PDF:', error);
        }}
        onPressLink={(uri) => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={styles.pdfView}
        trustAllCerts={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pdfView: {
    flex: 1,
    width: '100%',
  },
});