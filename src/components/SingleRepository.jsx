import RepositoryItem from './RepositoryItem';
import useRepository from '../hooks/useRepository';
import Text from './Text';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useParams } from 'react-router-native';
import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
    const { id } = useParams();
    const { repository, fetchMore, loading, error } = useRepository({ id, first: 5 });

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
                <Text style={{ marginTop: 10 }}>Loading repository...</Text>
            </View>
        );
    }
    
    if (error) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Error loading repository: {error.message}</Text>
            </View>
        );
    }
    
    if (!repository) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Repository not found</Text>
            </View>
        );
    }

    const reviews = repository.reviews?.edges?.map(edge => edge.node) || [];
    
    return (
        <FlatList
            data={reviews}
            renderItem={({ item }) => <ReviewItem review={item} />}
            keyExtractor={({ id }) => id}
            ListHeaderComponent={() => (
                <>
                    <RepositoryItem item={repository} />
                    <ItemSeparator />
                </>
            )}
            onEndReached={() => {
                fetchMore()
            }}
            onEndReachedThreshold={0.75}
            ItemSeparatorComponent={ItemSeparator}
        />
    );
}

export default SingleRepository;