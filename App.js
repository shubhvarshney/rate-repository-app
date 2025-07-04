import { StatusBar } from 'expo-status-bar';
import { NativeRouter } from 'react-router-native';
import { StyleSheet, Text, View } from 'react-native';
import Main from './src/components/Main';

export default function App() {
  return (
    <>
      <NativeRouter>
        <Main />
      </NativeRouter>
      <StatusBar style="auto" />
    </>
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
