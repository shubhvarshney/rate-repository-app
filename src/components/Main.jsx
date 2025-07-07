import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import SingleRepository from './SingleRepository';
import AddReview from './AddReview';
import AppBar from './AppBar';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Reviews from './Reviews';
import { Route, Routes, Navigate } from 'react-router-native';

const styles = StyleSheet.create({
    container:
    {
      backgroundColor: '#e1e4e8',
      flexGrow: 1,
      flexShrink: 1,
    },
});

const Main = () => {
    return (
      <View style={styles.container}>
        <AppBar />
        <Routes>
          <Route path="/" element={<RepositoryList />} />
          <Route path="/:id" element={<SingleRepository />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/create" element={<AddReview />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </View>
    );
}

export default Main;