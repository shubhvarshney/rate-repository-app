import { View, StyleSheet, Pressable, Alert } from 'react-native';
import { Link } from 'react-router-native';
import Text from './Text';
import theme from '../theme';
import { useLocation } from 'react-router-native';
import useDelete from '../hooks/useDelete';

const styles = StyleSheet.create({
    fullReview: {
        display: 'flex',
        flexDirection: 'column',
        gap:10,
        backgroundColor: 'white',
    },
    reviewItem: {
        padding: 15,
        display: 'flex',
        flexDirection: 'row',
        gap: 15,
    },
    rating: {
        borderWidth: 2,
        borderColor: theme.colors.primary,
        borderRadius: 25,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    reviewContent: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
        flexShrink: 1,
    },
    reviewHeader: {
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
    },
    reviewText: {
        flexWrap: 'wrap',
        flexShrink: 1,
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        paddingBottom: 15,
        paddingHorizontal: 30,
        justifyContent: 'center',
        gap: 20
    },
    button: {
        padding: 20,
        display: 'flex',
        borderRadius: 5,
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    }
});


const ReviewItem = ({ review }) => {

    const location = useLocation();
    const isMyReviews = location.pathname === '/reviews';
    const [deleteReview] = useDelete();

    const confirmDelete = () =>
      Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Delete', onPress: () => deleteReview(review.id, review.repositoryId)},
    ]);

    return (
        <View style={styles.fullReview}>
            <View style={styles.reviewItem}>
            <View style={styles.rating}>
                <Text color="primary" fontWeight="bold">{review.rating}</Text>
            </View>
            <View style={styles.reviewContent}>
                <View style={styles.reviewHeader}>
                    <Text fontWeight="bold" fontSize="subheading">{isMyReviews ? review.repository.fullName : review.user.username }</Text>
                    <Text color="textSecondary">{new Date(review.createdAt).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: '2-digit', 
                        day: '2-digit' 
                    }).replace(/\//g, '.')}</Text>
                </View>
                <Text color="textPrimary" style={styles.reviewText}>{review.text}</Text>
            </View>
            </View>
            { isMyReviews && 
                <View style={styles.buttons}>
                    <Link 
                        to={`/${review.repositoryId}`} 
                        style={[styles.button, { backgroundColor: theme.colors.primary}]}
                    >
                        <Text color="white" fontWeight="bold" fontSize='subheading'>View repository</Text>
                    </Link>
                    <Pressable 
                        onPress={confirmDelete}
                        style={[styles.button,  { backgroundColor: '#d73a4a' }]}
                    >
                        <Text color="white" fontWeight="bold" fontSize='subheading'>Delete review</Text>
                    </Pressable>
                </View>
            }
        </View>
    );
};

export default ReviewItem