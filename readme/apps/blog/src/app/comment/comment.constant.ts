export const CommentQueryDefault = {
  DEFAULT_COMMENT_QUERY_LIMIT : 1,
  DEFAULT_COMMENT_SORT_DIRECTION : 'desc',
} as const;

export const CommentHandleMessages = {
  CREATED: 'The new comment has been successfully created.',
  DELETED: 'The comment has been successfully deleted.',
} as const;

export enum CommentValidity {
  ContentMinLength = 3,
  ContentMaxLength = 50,
}
