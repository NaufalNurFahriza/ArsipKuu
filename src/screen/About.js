import React from 'react';
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

export default function About({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#243bbb" />
          </TouchableOpacity>
          <Text style={styles.headerText}>About</Text>
        </View>

        <ImageBackground
          source={require('../assets/images/Book_Pattern.png')}
          resizeMode="cover"
          style={styles.backgroundImage}>
          <LinearGradient
            start={{ x: 1, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={['rgba(5, 74, 122, 0.85)', 'rgba(10, 136, 225, 0.75)']}
            style={styles.gradient}>
            <Text style={styles.title}>
              Kelompok A1 PPG Prajabatan Gel 1 Tahun 2023
            </Text>
            <Text style={styles.subtitle}>
              Manajemen Perkantoran dan Layanan Bisnis
            </Text>
          </LinearGradient>
        </ImageBackground>

        <View style={styles.memberContainer}>
          <Text style={styles.memberTitle}>Anggota Kelompok:</Text>
          <Text style={styles.memberName}>- Ayudina Dhaniswari Nirwana</Text>
          <Text style={styles.memberName}>- Aziz Ramadhan Mulyo</Text>
          <Text style={styles.memberName}>- Ika Mulyani</Text>
          <Text style={styles.memberName}>- Mita Herliati</Text>
          <Text style={styles.memberName}>- Irwanda Wisnu Wardhana</Text>
          <Text style={styles.memberName}>- Muh. Husain</Text>
        </View>
        <View style={styles.versionContainer}>
          <Image
            source={require('../assets/images/splashLogo.png')}
            style={styles.logo}
          />
          <View style={styles.versionInfo}>
            <Text style={styles.versionLabel}>App Version</Text>
            <Text style={styles.versionValue}>v.1.0.0</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
  },
  header: {
    width: '100%',
    height: 64,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerText: {
    marginLeft: 12,
    fontWeight: 'bold',
    fontSize: 18,
    color: '#292524',
  },
  backgroundImage: {
    // Add any additional styles for the background image if needed
  },
  gradient: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 24,
  },
  memberContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 20,
    paddingHorizontal: 16,
    paddingVertical: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  memberTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  memberName: {
    fontSize: 16,
    marginBottom: 8,
  },
  versionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logo: {
    width: 128,
    height: 144,
    marginBottom: 12,
  },
  versionInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 144,
    paddingVertical: 12,
  },
  versionLabel: {
    fontSize: 16,
    color: '#4b5563',
  },
  versionValue: {
    fontSize: 16,
    color: '#4b5563',
  },
});