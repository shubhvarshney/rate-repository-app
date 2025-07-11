import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import AppBarTab from './AppBarTab';
import { useNavigate } from 'react-router-native';
import Text from './Text';
import Constants from 'expo-constants';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';
import useMe from '../hooks/useMe';
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
  const { me } = useMe();
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
    navigate('/');
  }

  return (
    <View style={styles.container}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.nav}>
            <AppBarTab link='/' text="Repositories"/>
            {me 
              ? <>
                  <AppBarTab link='/create' text="Create a review"/>
                  <AppBarTab link='/reviews' text="My reviews"/>
                  <Pressable onPress={handleSignOut}>
                    <Text fontSize="subheading" fontWeight="bold" color="textAppBar" >Sign out</Text>
                  </Pressable>  
                </>
            :   <>
                  <AppBarTab link='/signin' text="Sign in"/>
                  <AppBarTab link='/signup' text="Sign up"/>
                </>
            }
          </View>
        </ScrollView>
    </View>
  );
};

export default AppBar;