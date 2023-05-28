import { InjectionToken } from '@angular/core';
import { ERROR_MESSAGES } from '../models/validation-error-message.const';

export const VALIDATION_ERROR_MESSAGES = new InjectionToken(
  `Validation Messages`,
  {
    providedIn: 'root',
    factory: () => ERROR_MESSAGES,
  }
);
