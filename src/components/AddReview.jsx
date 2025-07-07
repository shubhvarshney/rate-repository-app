import Text from './Text';
import theme from '../theme';
import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-native';
import useReviewCreator from '../hooks/useReviewCreator';
import * as yup from 'yup';

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
    },
    buttonText: {
        color: 'white',
    },
    error: {
        color: '#d73a4a', 
        marginBottom: 15
    }
});

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required('Repository owner\'s username is required'),
  repositoryName: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number()
    .required('Rating is required')
    .test({
    name: 'is-in-range',
    skipAbsent: true,
    test(value, ctx) {
      if (value < 0 || value > 100) {
        return ctx.createError({ message: 'Rating must be between 0 and 100' });
      }
      return true;
    },
  }),
  text: yup
    .string()
    .optional()
});

const initialValues = {
    ownerName: '',
    repositoryName: '',
    rating: '',
    text: '',
}

const AddReview = () => {
  const navigate = useNavigate();
  const [createReview] = useReviewCreator();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        console.log('Submitting review')
        const { data } = await createReview({...values, rating: Number(values.rating)});
        if (data) {
          navigate(`/${data.createReview.repositoryId}`)
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, formik.touched.ownerName && formik.errors.ownerName && { borderColor: '#d73a4a' }]}
        placeholder="Repository owner's username"
        onChangeText={formik.handleChange('ownerName')}
        value={formik.values.ownerName}
      />
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text style={styles.error}>{formik.errors.ownerName}</Text>
      )}
      <TextInput
        style={[styles.input, formik.touched.repositoryName && formik.errors.repositoryName && { borderColor: '#d73a4a' }]}
        placeholder="Repository name"
        onChangeText={formik.handleChange('repositoryName')}
        value={formik.values.repositoryName}
      />
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text style={styles.error}>{formik.errors.repositoryName}</Text>
      )}
      <TextInput
        style={[styles.input, formik.touched.rating && formik.errors.rating && { borderColor: '#d73a4a' }]}
        placeholder="Rating between 0 and 100"
        keyboardType="numeric"
        onChangeText={formik.handleChange('rating')}
        value={formik.values.rating.toString()}
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text style={styles.error}>{formik.errors.rating}</Text>
      )}
    <TextInput
            style={[styles.input, formik.touched.text && formik.errors.text && { borderColor: '#d73a4a' }]}
            placeholder="Review"
            onChangeText={formik.handleChange('text')}
            multiline={true}
            value={formik.values.text}
      />
      {formik.touched.text && formik.errors.text && (
        <Text style={styles.error}>{formik.errors.text}</Text>
      )}
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text fontSize='subheading' fontWeight='bold' style={styles.buttonText}>Create a Review</Text>
      </Pressable>
    </View>
  );
};


export default AddReview;