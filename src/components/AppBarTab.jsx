import { View } from "react-native";
import { Link } from "react-router-native";
import Text from "./Text";

const AppBarTab = (props) => {
    return (
        <View>
            <Link to={props.link}>
                <Text fontSize="subheading" fontWeight="bold" color="textAppBar" >{props.text}</Text>
            </Link>
        </View>
    );
};

export default AppBarTab;