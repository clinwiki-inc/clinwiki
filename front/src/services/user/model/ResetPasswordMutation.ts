/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.




/**
 * Autogenerated input type of ResetPassword
 */
export interface ResetPasswordInput {
  email: string;
  clientMutationId?: string | null;
}


//import { ResetPasswordInput } from "../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: ResetPasswordMutation
// ====================================================

export interface ResetPasswordMutation_resetPassword {
  __typename: "ResetPasswordPayload";
  success: boolean;
}

export interface ResetPasswordMutation {
  resetPassword: ResetPasswordMutation_resetPassword | null;
}

export interface ResetPasswordMutationVariables {
  input: ResetPasswordInput;
}


