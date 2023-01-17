import * as Joi from 'joi';
import { PublicationType } from '@prisma/client';
import { PublicationValidity as pv } from '../publication.constant';

export default Joi.object({
  type: Joi.string(),
  content: Joi.object()
    .when('type', {
      is: Joi.equal(PublicationType.Video),
      then: Joi.object({
        title: Joi.string().min(pv.VideoTitleMinLength).max(pv.VideoTitleMaxLength).required(),
        videoLink: Joi.string().pattern(new RegExp('^[www.youtube.com/]+')).required(),
      })
    })
    .when('type', {
      is: Joi.equal(PublicationType.Text),
      then: Joi.object({
        title: Joi.string().min(pv.TextTitleMinLength).max(pv.TextTitleMaxLength).required(),
        announcement: Joi.string().min(pv.AnnouncementMinLength).max(pv.AnnouncementMaxLength).required(),
        text: Joi.string().min(pv.TextMinLength).max(pv.TextMaxLength).required(),
      })
    })
    .when('type', {
      is: Joi.equal(PublicationType.Quote),
      then: Joi.object({
        quote: Joi.string().min(pv.QuoteMinLength).max(pv.QuoteMaxLength).required(),
        quoteAuthor: Joi.string().min(pv.QuoteAuthorMinLength).max(pv.QuoteAuthorMaxLength).required(),
      })
    })
    .when('type', {
      is: Joi.equal(PublicationType.Photo),
      then: Joi.object({
        photo: Joi.string().required(),
      })
    })
    .when('type', {
      is: Joi.equal(PublicationType.Link),
      then: Joi.object({
        link: Joi.string().uri().required(),
        linkDescription: Joi.string().min(pv.QuoteAuthorMinLength).max(pv.LinkDescriptionMaxLength).required(),
      })
    })
});
