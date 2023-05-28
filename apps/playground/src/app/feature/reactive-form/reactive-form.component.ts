import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule, ValidationErrors,
  Validators,
} from '@angular/forms';
import { JsonPipe, NgIf } from '@angular/common';
import {
  DynamicValidatorMessage,
  OnTouchedErrorStateMatcher,
} from '@min-workspace/validator';

@Component({
  standalone: true,
  imports: [
    NgIf,
    JsonPipe,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    DynamicValidatorMessage,
  ],
  selector: 'min-reactive-form',
  templateUrl: 'reactive-form.component.html',
  styleUrls: ['reactive-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReactiveFormComponent {
  readonly #fb = inject(FormBuilder);

  form = this.#fb.group({
    firstName: [
      '',
      Validators.compose([Validators.required, Validators.minLength(4)]),
    ],
    lastName: [
      '',
      Validators.compose([Validators.required, Validators.minLength(8)]),
    ],
    password: this.#fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: '',
      },
      {
        validators: passwordShouldMatch,
      }
    ),
  });

  errorStateMatcher = new OnTouchedErrorStateMatcher();

  onSubmit(e: Event): void {
    console.log(this.form.value);
  }
}

export function passwordShouldMatch(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  const errors = { passwordShouldMatch: { mismatch: true } };

  if (password?.value === confirmPassword?.value) {
    return null;
  }

  confirmPassword?.setErrors(errors);

  return errors;
}
