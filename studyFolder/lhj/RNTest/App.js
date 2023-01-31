import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const name = 'hakjun1';
  return (
    <View style={styles.container}>
      {name === 'hakjun' && (
        <Text>My name is hakjun</Text>
      )}
      {name !== 'hakjun' && (
        <Text>My name is not hakjun</Text>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
