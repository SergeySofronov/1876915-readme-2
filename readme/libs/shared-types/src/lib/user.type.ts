export type User = {
  _id?: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  createdAt?: Date;
  updatedAt?: Date;
  password: string;
  publicationCount?: number;
  subscriberCount?: number;
  lastPublicationDate?: Date;
}
