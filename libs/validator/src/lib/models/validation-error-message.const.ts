import { SafeAny } from '@shared/data-access/models';
import { ValidationTypeEnum } from './validation-type.enum';

type ErrorMessage<T = ValidationTypeEnum> = {
  [K in T as string]: (args?: SafeAny) => string;
};

export const ERROR_MESSAGES: ErrorMessage = {
  [ValidationTypeEnum.REQUIRED]: () => `This field is required`,
  [ValidationTypeEnum.REQUIRED_TRUE]: () => `This field is required`,
  [ValidationTypeEnum.EMAIL]: () => `It should be a valid email`,
  [ValidationTypeEnum.MINLENGTH]: ({ requiredLength }) =>
    `The length should be at least ${requiredLength} characters`,
  [ValidationTypeEnum.BAN_WORDS]: ({ bannedWord }) =>
    `The word "${bannedWord}" isn't allowed`,
  [ValidationTypeEnum.APP_BAN_WORDS]: ({ bannedWord }) =>
    `The word "${bannedWord}" isn't allowed`,
  [ValidationTypeEnum.APP_PASSWORD_SHOULD_MATCH]: () => `Password should match`,
  [ValidationTypeEnum.PASSWORD_SHOULD_MATCH]: () => `Password should match`,
  [ValidationTypeEnum.PATTERN]: () => `Wrong format`,
  [ValidationTypeEnum.APP_UNIQUE_NICKNAME]: () => `Nickname is taken`,
  [ValidationTypeEnum.UNIQUE_NICKNAME]: () => `Nickname is taken`,
};

