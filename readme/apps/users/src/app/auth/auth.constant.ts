export const UserAuthMessages = {
  ALREADY_EXISTS: 'User with this email already exists',
  NOT_FOUND: 'User not found',
  WRONG_PASSWORD: 'User password is wrong',
  WRONG_LOGIN: 'User login is wrong.',
  CREATE: 'Creates a new user.',
  UPDATE: "Updates the user's profile data",
  LOGIN: "User's login procedure",
  PASSWORD_CHANGE: "Updates the user's password",
  NOTIFY: 'Launching notification distribution',
} as const;

export enum UserValidity {
  NameMinLength = 3,
  NameMaxLength = 50,
  PasswordMinLength = 6,
  PasswordMaxLength = 12,
  AvatarMaxWeight = 500,  // in Kbytes
}

