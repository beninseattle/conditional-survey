/*
  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
  SPDX-License-Identifier: MIT-0 
*/

export function validateSignInForm(formData: { username: string; password: string }) {
  if (formData.username === '' || formData.password === '') {
    return {
      valid: false,
      message: 'Username and password field must be filled in.'
    };
  }
  return { valid: true };
}
