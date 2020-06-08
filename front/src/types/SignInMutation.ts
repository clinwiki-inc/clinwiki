/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SignInInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: SignInMutation
// ====================================================

export interface SignInMutation_signIn_user_reviews {
  __typename: "Review";
  content: string;
  briefTitle: string;
  nctId: string;
}

export interface SignInMutation_signIn_user_likedStudies {
  __typename: "Study";
  nctId: string;
  averageRating: number;
  briefTitle: string;
  overallStatus: string;
  startDate: any | null;
  completionDate: any | null;
}

export interface SignInMutation_signIn_user_dislikedStudies {
  __typename: "Study";
  nctId: string;
  averageRating: number;
  briefTitle: string;
  overallStatus: string;
  startDate: any | null;
  completionDate: any | null;
}

export interface SignInMutation_signIn_user {
  __typename: "User";
  /**
   * Id
   */
  id: number;
  /**
   * Email
   */
  email: string;
  /**
   * First name
   */
  firstName: string | null;
  /**
   * Last name
   */
  lastName: string | null;
  /**
   * Default query for user
   */
  defaultQueryString: string | null;
  roles: string[];
  /**
   * Number of reviews the user has done
   */
  reviewCount: number;
  reviews: SignInMutation_signIn_user_reviews[];
  contributions: number;
  pictureUrl: string | null;
  rank: string | null;
  likeCount: number | null;
  likedStudies: SignInMutation_signIn_user_likedStudies[] | null;
  dislikeCount: number | null;
  dislikedStudies: SignInMutation_signIn_user_dislikedStudies[] | null;
}

export interface SignInMutation_signIn {
  __typename: "SignInPayload";
  /**
   * Json web token
   */
  jwt: string | null;
  /**
   * Signed in user
   */
  user: SignInMutation_signIn_user | null;
}

export interface SignInMutation {
  signIn: SignInMutation_signIn | null;
}

export interface SignInMutationVariables {
  input: SignInInput;
}
