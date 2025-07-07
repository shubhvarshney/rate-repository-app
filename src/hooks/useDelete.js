import { useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../graphql/mutations';
import { ME, GET_REPOSITORY, GET_REPOSITORIES } from '../graphql/queries';

const useDelete = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW);

  const deleteReview = async (id, repositoryId) => {
    await mutate({
      variables: {
        id
      },
      refetchQueries: [
        { query: ME, variables: { includeReviews: true } },
        ...(repositoryId ? [{ query: GET_REPOSITORY, variables: { id: repositoryId } }] : []),
        { query: GET_REPOSITORIES }
      ],
      awaitRefetchQueries: true
    });
  };

  return [deleteReview, result];
};

export default useDelete;
       