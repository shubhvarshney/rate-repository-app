import { View, Image, StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../theme';
import Counts from './Counts';

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#ffffff',
        paddingVertical: 20,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 5,
    },
    info: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 20,
    },
    textInfo: {
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
    },
    language: {
        marginVertical: 5,
        backgroundColor: theme.colors.primary,
        color: 'white',
        padding: 5,
        borderRadius: 5,
        alignSelf: 'flex-start',
        textAlign: 'center',
    },
    counts: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        marginHorizontal: 20,
    }
});

const RepositoryItem = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.info}>
                <Image source={{ uri: props.item.ownerAvatarUrl }} style={styles.avatar} />
                <View style={styles.textInfo}>
                    <Text fontSize='subheading' color="textPrimary" fontWeight='bold' >{props.item.fullName}</Text>
                    <Text fontSize='subheading' color="textSecondary" >{props.item.description}</Text>
                    <Text style={styles.language} fontSize='subheading'>{props.item.language}</Text>
                </View>
            </View>
            <View style={styles.counts}>
                <Counts text='Forks' count={props.item.forksCount} />
                <Counts text='Stars' count={props.item.stargazersCount} />
                <Counts text='Reviews' count={props.item.reviewCount} />
                <Counts text='Rating' count={props.item.ratingAverage} />
            </View>
        </View>
    )
}

export default RepositoryItem;