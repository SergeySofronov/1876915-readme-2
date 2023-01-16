export enum ValidityMessage {
  IsEmailMessage = 'Field \u00AB$property\u00BB must be a valid email address',
  IsStringMessage = 'Field \u00AB$property\u00BB must be a string',
  IsArrayMessage = 'Field \u00AB$property\u00BB must be an array',
  IsArrayMaxSizeMessage = 'Field \u00AB$property\u00BB must be an array with size equal or less than $constraint1',
  IsEnumMessage = 'Field \u00AB$property\u00BB must be one of these values $constraint1',
  IsInMessage = 'Field \u00AB$property\u00BB must consist of these values $constraint1',
  IsNotEmptyMessage = 'Field \u00AB$property\u00BB must not be empty',
  MinValueMessage = 'Field \u00AB$property\u00BB value/length must be equal or greater than $constraint1',
  MaxValueMessage = 'Field \u00AB$property\u00BB value/length must be equal or less than $constraint1',
  IsValidValueMessage = 'Field \u00AB$property\u00BB values must starts with letter and contains of numbers and letters',
  IsDateMessage = 'Field \u00AB$property\u00BB values must be a Date object',
  MongoIdMessage = 'Field \u00AB$property\u00BB value must be valid ObjectID',
}
