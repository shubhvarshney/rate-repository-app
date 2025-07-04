import { View, StyleSheet, ScrollView } from 'react-native';
import AppBarTab from './AppBarTab';
import Constants from 'expo-constants';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: theme.colors.backgroundAppBar, 
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 30
  }
});

const AppBar = () => {
  return (
    <View style={styles.container}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.nav}>
            <AppBarTab link='/' text="Repositories"/>
            <AppBarTab link='/signin' text="Sign in"/>
          </View>
        </ScrollView>
    </View>
  );
};

export default AppBar;