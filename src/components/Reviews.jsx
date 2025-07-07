import useMe from '../hooks/useMe';
import { FlatList, View, ActivityIndicator, StyleSheet } from 'react-native';
import ReviewItem from './ReviewItem';
import Text from './Text';

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

const Reviews = () => {
    const { me, loading, error } = useMe(true);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
                <Text style={{ marginTop: 10 }}>Loading your reviews...</Text>
            </View>
        );
    }

    if (!me) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Please sign in to view your reviews</Text>
            </View>
        );
    }

    if (!me.reviews || !me.reviews.edges || me.reviews.edges.length === 0) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>You haven't written any reviews yet</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={me.reviews.edges.map(edge => edge.node)}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <ReviewItem review={item} />}
            ItemSeparatorComponent={ItemSeparator}
        />
    );
}

export default Reviews;