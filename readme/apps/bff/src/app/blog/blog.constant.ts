export const PublicationHandleMessages = {
  CREATED: 'Creates publications.',
  DELETED: 'Deletes publication.',
  FEED: 'Gets personal feed of publication',
} as const;

export enum BlogEndPoints {
  Publication = 'publications',
  Comment = 'comments',
  Feed = 'publications/feed',
  Draft = 'publications/users/drafts',
  Like = 'publications/likes',
  Repost = 'publications/repost',
  Photo = 'photo'
}
