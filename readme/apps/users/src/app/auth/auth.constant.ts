export const AUTH_RABBITMQ_CLIENT = Symbol('AUTH_RABBITMQ_CLIENT');

export const UserAuthMessages = {
  ALREADY_EXISTS: 'User with this email already exists',
  NOT_FOUND: 'User not found',
  WRONG_PASSWORD: 'User password is wrong',
  WRONG_LOGIN: 'User login is wrong.',
  CREATED: 'The new user has been successfully created.',
  UPDATED: 'The user has been successfully updated.',
  LOGGED: 'User has been successfully logged.',
  PASSWORD_CHANGED: "The user's password has been successfully updated",
} as const;

export enum UserValidity {
  NameMinLength = 3,
  NameMaxLength = 50,
  PasswordMinLength = 6,
  PasswordMaxLength = 12,
  AvatarMaxWeight = 500,  // in Kbytes
}

