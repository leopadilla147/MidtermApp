import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, Button, Alert } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import database from './fconfig';
import { ref, set, onValue } from 'firebase/database'; 

export default function App() {
  const [isLightOn, setIsLightOn] = useState('off');
  const [isFountainOn, setIsFountainOn] = useState('off');
  const [temperature, setTemperature] = useState(25);

  useEffect(() => {
    const settingsRef = ref(database, 'Test');

    // Retrieve settings from Firebase
    onValue(settingsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setIsLightOn(data.light || 'off');
        setIsFountainOn(data.fountain || 'off');
        setTemperature(data.temperature || 25);
      }
    });

    return () => settingsRef.off();
  }, []);

  const saveSettings = async () => {
    const settingsRef = ref(database, 'Test');
    await set(settingsRef, {
      light: isLightOn,
      fountain: isFountainOn,
      temperature: temperature,
    });
    Alert.alert("Settings saved!");
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.title}>Midterm App</Text> 

        <View style={styles.centeredContainer}>
          <View style={styles.tempContainer}>
            <Text style={styles.label}>Temperature:</Text>
            <Text style={styles.temperatureValue}>{temperature}°C</Text>
          </View>

          <View style={styles.switchContainer}>
            <View style={styles.switchRow}>
              <Ionicons name="bulb-outline" size={24} color={isLightOn === 'on' ? 'yellow' : 'gray'} />
              <Text style={styles.label}>Light Switch</Text>
              <Switch
                value={isLightOn === 'on'}
                onValueChange={(value) => {
                  setIsLightOn(value ? 'on' : 'off');
                }}
              />
            </View>
            <View style={styles.switchRow}>
              <Ionicons name="water-outline" size={24} color={isFountainOn === 'on' ? 'blue' : 'gray'} />
              <Text style={styles.label}>Fountain Switch</Text>
              <Switch
                value={isFountainOn === 'on'}
                onValueChange={(value) => {
                  setIsFountainOn(value ? 'on' : 'off');
                }}
              />
            </View>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Save Settings" onPress={saveSettings} color="#841584" />
        </View>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 60, 
    textAlign: 'center', 
    color: '#333',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  tempContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 3,
    width: '100%',
    marginBottom: 20, 
  },
  temperatureValue: {
    fontSize: 18,
    color: '#333', 
  },
  switchContainer: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 3,
    width: '100%',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  label: {
    fontSize: 18,
    flex: 1, 
  },
  buttonContainer: {
    marginBottom: 30, 
  },
});
