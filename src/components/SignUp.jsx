import Text from './Text';
import theme from '../theme';
import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-native';
import useSignIn from '../hooks/useSignIn';
import useSignUp from '../hooks/useSignUp';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .test({
    name: 'is-in-range',
    skipAbsent: true,
    test(value, ctx) {
      if (value.length < 5 || value.length > 30) {
        return ctx.createError({ message: 'Username must be between 5 and 30 characters' });
      }
      return true;
    },
  }),
  password: yup
    .string()
    .required('Password is required')
    .test({
    name: 'is-in-range',
    skipAbsent: true,
    test(value, ctx) {
      if (value.length < 5 || value.length > 30) {
        return ctx.createError({ message: 'Password must be between 5 and 30 characters' });
      }
      return true;
    },
  }),
  passwordConfirmation: yup
    .string()
    .required('Password confirmation is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match')
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
    passwordConfirmation: '',
};

export const SignUpContainer = ({ onSubmit }) => {
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
         <TextInput
            placeholder="Confirm Password"
            value={formik.values.passwordConfirmation}
            onChangeText={formik.handleChange('passwordConfirmation')}
            secureTextEntry={true}
            style={[styles.input, formik.touched.passwordConfirmation && formik.errors.passwordConfirmation && { borderColor: '#d73a4a' }]}
        />
        {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation && (
            <Text style={{ color: '#d73a4a', marginBottom: 15 }}>{formik.errors.passwordConfirmation}</Text>
        )}
        <Pressable onPress={formik.handleSubmit} style={styles.button}>
            <Text fontSize="subheading" fontWeight="bold" color="textAppBar">Sign Up</Text>
        </Pressable>
    </View>
  )
}

const SignUp = () => {
  const navigate = useNavigate();
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();

  const handleSubmit = async (values, { resetForm }) => {
      try {
        await signUp({ username: values.username, password: values.password });
        await signIn({ username: values.username, password: values.password });
        resetForm();
        navigate('/');
      } catch (e) {
        console.log('Sign in error:', e);
        console.log('Error details:', e.message);
      }
  }  

  return <SignUpContainer onSubmit={handleSubmit} />;
};

export default SignUp;