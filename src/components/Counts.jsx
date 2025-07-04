import { View, StyleSheet } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
    container: {
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
        backgroundColor: '#ffffff',
    },
});


const Counts = (props) => {
    let countString = props.count.toString();
    if (props.count > 1000) {
        countString = (props.count / 1000).toFixed(1) + 'k';
    }

    return (
        <View style={styles.container}>
            <Text fontSize='subheading' fontWeight='bold' color='textPrimary'>{countString}</Text>
            <Text fontSize='subheading' color='textSecondary'>{props.text}</Text>
        </View>
    )
}

export default Counts;