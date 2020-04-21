/* tslint:disable */
// This file was automatically generated and should not be edited.

import { UpdateProfileInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: EditProfileMutation
// ====================================================

export interface EditProfileMutation_updateProfile_user {
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
}

export interface EditProfileMutation_updateProfile {
  __typename: "UpdateProfilePayload";
  errors: string[] | null;
  user: EditProfileMutation_updateProfile_user | null;
}

export interface EditProfileMutation {
  updateProfile: EditProfileMutation_updateProfile | null;
}

export interface EditProfileMutationVariables {
  input: UpdateProfileInput;
}
