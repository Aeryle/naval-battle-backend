/**
 * Password rules:
 * Minimum 8 characters,
 * at least one upper case letter,
 * one lower case  letter,
 * one number
 * and one special character
 */
export const PASSWORD_REGEX =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,15}$/;
