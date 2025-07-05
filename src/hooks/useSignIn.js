import { useMutation, useApolloClient } from '@apollo/client';
import { LOG_IN } from '../graphql/mutations';
import useAuthStorage from '../hooks/useAuthStorage';

const useSignIn = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(LOG_IN);

  const signIn = async ({ username, password }) => {
    const data = await mutate({
      variables: {
        credentials: { username, password },
      },
    });
    authStorage.setAccessToken(data.data.authenticate.accessToken);
    await apolloClient.resetStore();
  };

  return [signIn, result];
};

export default useSignIn;