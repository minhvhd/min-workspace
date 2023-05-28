import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { KeyValue, KeyValuePipe, NgFor } from '@angular/common';
import { SafeAny } from '@shared/data-access/models';
import { ErrorMessagePipe } from '../pipes/error-message.pipe';

@Component({
  standalone: true,
  imports: [NgFor, KeyValuePipe, ErrorMessagePipe],
  selector: 'min-input-error',
  templateUrl: 'input-error.component.html',
  styleUrls: ['input-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputErrorComponent {
  @Input()
  errors: ValidationErrors | undefined | null = null;

  trackByFn(index: number, item: KeyValue<string, SafeAny>) {
    return item.key;
  }
}
