import { Prisma } from '@prisma/client'

type VideoPublication = {
  title?: string;
  videoLink?: string;
}

type TextPublication = {
  title?: string;
  announcement?: string;
  text?: string,
}

type QuotePublication = {
  quote?: string;
  quoteAuthor?: string;
}

type PhotoPublication = {
  photo: string;
}

type LinkPublication = {
  link?: string;
  linkDescription?: string;
}

export type PublicationContent = (
  | VideoPublication
  | TextPublication
  | QuotePublication
  | PhotoPublication
  | LinkPublication
  | Prisma.JsonValue
);

export const PublicationTypeObject = {
  Video: 'Video',
  Text: 'Text',
  Quote: 'Quote',
  Photo: 'Photo',
  Link: 'Link',
} as const;

export type PublicationType = keyof typeof PublicationTypeObject;

export type Tag = {
  name: string;
}

export type Publication = {
  id?: number;
  originalId?: number;
  type: PublicationType;
  isPublished?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  likesCount?: number;
  commentsCount?: number;
  tags?: Tag[];
  content: PublicationContent;
  isRepublication?: boolean;
  originalUserId?: string;
  userId: string;
}
