import Text from './Text';
import theme from '../theme';
import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-native';
import useSignIn from '../hooks/useSignIn';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
});

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#ffffff',
        paddingVertical: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 5,
        padding: 20,
        fontSize: 16,
        marginBottom: 10,
    },
    button: {
        backgroundColor: theme.colors.primary,
        padding: 20,
        borderRadius: 5,
        alignItems: 'center',
    }
});

const initialValues = {
    username: '',
    password: '',
};

export const SignInContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  })

  return (
    <View style={styles.container}>
        <TextInput
            placeholder="Username"
            value={formik.values.username}
            onChangeText={formik.handleChange('username')}
            style={[styles.input, formik.touched.username && formik.errors.username && { borderColor: '#d73a4a' }]}
        />
        {formik.touched.username && formik.errors.username && (
            <Text style={{ color: '#d73a4a', marginBottom: 15 }}>{formik.errors.username}</Text>
        )}
        <TextInput
            placeholder="Password"
            value={formik.values.password}
            onChangeText={formik.handleChange('password')}
            secureTextEntry={true}
            style={[styles.input, formik.touched.password && formik.errors.password && { borderColor: '#d73a4a' }]}
        />
        {formik.touched.password && formik.errors.password && (
            <Text style={{ color: '#d73a4a', marginBottom: 15 }}>{formik.errors.password}</Text>
        )}
        <Pressable onPress={formik.handleSubmit} style={styles.button}>
            <Text fontSize="subheading" fontWeight="bold" color="textAppBar">Sign In</Text>
        </Pressable>
    </View>
  )
}

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const handleSubmit = async (values, { resetForm }) => {
    const { username, password } = values;
      try {
        await signIn({ username, password });
        resetForm();
        navigate('/');
      } catch (e) {
        console.log('Sign in error:', e);
        console.log('Error details:', e.message);
      }
  }  

  return <SignInContainer onSubmit={handleSubmit} />;
};

export default SignIn;