export const DEFAULT_PUBLICATION_QUERY_LIMIT = 25;
export const DEFAULT_PUBLICATION_SEARCH_LIMIT = 20;
export const DEFAULT_PUBLICATION_SORT_DIRECTION = 'desc';

export const PublicationHandleMessages = {
  CREATED: 'The new publication has been successfully created.',
  DELETED: 'The publication has been successfully deleted.',
} as const;

export enum PublicationValidity {
  TagMinLength = 3,
  TagMaxLength = 10,
  TagsMaxQuantity = 8,
  VideoTitleMinLength = 20,
  VideoTitleMaxLength = 50,
  TextTitleMinLength = 20,
  TextTitleMaxLength = 50,
  AnnouncementMinLength = 50,
  AnnouncementMaxLength = 255,
  TextMinLength = 100,
  TextMaxLength = 1024,
  QuoteMinLength = 20,
  QuoteMaxLength = 300,
  QuoteAuthorMinLength = 3,
  QuoteAuthorMaxLength = 50,
  LinkDescriptionMaxLength = 300,
}

export enum PublicationSort {
  Date = 'date',
  Likes = 'like',
  Comments = 'comment',
}

export const PublicationSortField = {
  [PublicationSort.Date]: 'createdAt',
  [PublicationSort.Likes]: 'likesCount',
  [PublicationSort.Comments]: 'commentsCount',
};
