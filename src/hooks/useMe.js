import { ME } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const useMe = (includeReviews = false) => {
  const { data, loading, error } = useQuery(ME, {
    variables: { includeReviews },
    fetchPolicy: 'cache-and-network',
  });

  return {
    me: loading ? null : data?.me,
    loading,
    error,
  };
}

export default useMe;

