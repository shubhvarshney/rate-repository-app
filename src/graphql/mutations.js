import { gql } from '@apollo/client';

export const LOG_IN = gql`
    mutation Authenticate($credentials: AuthenticateInput!) {
        authenticate(credentials: $credentials) {
            accessToken
        }
    }
`;

export const CREATE_REVIEW = gql`
    mutation CreateReview($review: CreateReviewInput!) {
        createReview(review: $review) {
            repositoryId
        }
    }
`

export const DELETE_REVIEW = gql`
    mutation DeleteReview($id: ID!) {
        deleteReview(id: $id) 
    }
`

export const CREATE_USER = gql`
    mutation CreateUser($user: CreateUserInput!) {
        createUser(user: $user) {
            id
            username
        }
    }
`;