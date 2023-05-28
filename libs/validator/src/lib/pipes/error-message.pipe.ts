import { inject, Pipe, PipeTransform } from '@angular/core';
import { SafeAny } from '@shared/data-access/models';
import { VALIDATION_ERROR_MESSAGES } from '../di/validation-error-message.token';

@Pipe({
  standalone: true,
  name: 'errorMessage',
})
export class ErrorMessagePipe implements PipeTransform {
  errorMessages = inject(VALIDATION_ERROR_MESSAGES);
  
  transform(key: string, errValue: SafeAny): string {
    if (!this.errorMessages[key]) {
      console.warn(`Missing message for ${key} validator...`);
      return '';
    }
    return this.errorMessages[key](errValue);
  }
}
