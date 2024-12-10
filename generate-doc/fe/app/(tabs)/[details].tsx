import { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, SafeAreaView, BackHandler, Platform, Animated } from "react-native";
import { useLocalSearchParams } from 'expo-router';
import { useRouter } from "expo-router";
import { Button, ActivityIndicator } from 'react-native-paper';

type Mahasiswa = {
  id: string;
  name: string;
  nim: string;
};

const Details: React.FC = () => {
  const { details } = useLocalSearchParams();
  const [data, setData] = useState<any>(null);

  const router = useRouter();
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    const handleBackPress = () => {
      router.push('/');
      return true;
    };

    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    }

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, [router]);

  useEffect(() => {
    if (details) {
      const parsedData = parseDetails(details as string);
      setData(parsedData);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }
  }, [details]);

  const parseDetails = (data: string) => {
    const sections = data.split("#");
    const [kepada, tempatTujuan, fakultas, namaTtd, tanggalHijriyah, tanggalMasehi, daftarMahasiswa] = sections;

    const listMahasiswa = daftarMahasiswa.split("|").map((staff) => {
      const [id, name, nim] = staff.split(":");
      return { id, name, nim };
    });

    return {
      kepada,
      tempatTujuan,
      fakultas,
      namaTtd,
      tanggalHijriyah,
      tanggalMasehi,
      listMahasiswa,
    };
  };

  if (!data) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#3498db" style={styles.loading} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Animated.View style={[styles.infoContainer, { opacity: fadeAnim }]}>
          <Text style={styles.label}>Kepada:</Text>
          <Text style={styles.value}>{data.kepada}</Text>

          <Text style={styles.label}>Tempat Tujuan:</Text>
          <Text style={styles.value}>{data.tempatTujuan}</Text>

          <Text style={styles.label}>Fakultas:</Text>
          <Text style={styles.value}>{data.fakultas}</Text>

          <Text style={styles.label}>Nama TTD:</Text>
          <Text style={styles.value}>{data.namaTtd}</Text>

          <Text style={styles.label}>Tanggal Hijriyah:</Text>
          <Text style={styles.value}>{data.tanggalHijriyah}</Text>

          <Text style={styles.label}>Tanggal Masehi:</Text>
          <Text style={styles.value}>{data.tanggalMasehi}</Text>

          <Text style={styles.label}>Daftar Mahasiswa:</Text>

          {/* Table Layout for Mahasiswa */}
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>Nama</Text>
              <Text style={styles.tableHeaderText}>NIM</Text>
            </View>
            {data.listMahasiswa.map((mhs: Mahasiswa, index: number) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCell}>{mhs.name}</Text>
                <Text style={styles.tableCell}>{mhs.nim}</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        <View style={styles.buttonContainer}>
          <Button mode="contained" icon="qrcode-scan" buttonColor={'#244384'} labelStyle={styles.text} style={styles.button} onPress={() => router.push('/scanner')}>
            Scan Lagi
          </Button>
          {/* <Button mode="outlined" icon="home" textColor={'#244384'} labelStyle={styles.text} style={styles.button} onPress={() => router.push('/')}>
            Kembali ke halaman utama
          </Button> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1",
    paddingTop: 50,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  loading: {
    marginTop: 20,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 20,
    textAlign: "center",
    textTransform: "uppercase",
  },
  label: {
    fontSize: 18,
    color: "#7F8C8D",
    marginBottom: 5,
    fontWeight: "600",
  },
  value: {
    fontSize: 18,
    color: "#34495E",
    marginBottom: 15,
    fontWeight: "600",
  },
  infoContainer: {
    marginBottom: 20,
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  table: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#BDC3C7",
    borderRadius: 8,
    overflow: "hidden",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#ECF0F1",
    padding: 10,
  },
  tableHeaderText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: "#34495E",
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#BDC3C7",
    padding: 10,
  },
  tableCell: {
    flex: 1,
    fontSize: 16,
    color: "#34495E",
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  button: {
    marginBottom: 15,
    width: "80%",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Details;
