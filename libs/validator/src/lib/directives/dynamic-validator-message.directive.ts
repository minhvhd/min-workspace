import {
  ComponentRef,
  Directive,
  ElementRef,
  inject,
  Input,
  OnDestroy,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import {
  ControlContainer,
  FormGroupDirective,
  NgControl,
  NgForm,
} from '@angular/forms';
import { EMPTY, fromEvent, iif, merge, startWith, Subscription } from 'rxjs';
import { InputErrorComponent } from '../ui/input-error.component';
import { ErrorStateMatcher } from '../services/error-state-matcher.service';

@Directive({
  standalone: true,
  selector: `
    [ngModel]:not([withoutValidationErrors]),
    [formControl]:not([withoutValidationErrors]),
    [formControlName]:not([withoutValidationErrors]),
    [formGroupName]:not([withoutValidationErrors]),
    [ngModelGroup]:not([withoutValidationErrors])
  `,
})
export class DynamicValidatorMessage implements OnInit, OnDestroy {
  @Input()
  errorStateMatcher = inject(ErrorStateMatcher);

  ngControl =
    inject(NgControl, { self: true, optional: true }) ||
    inject(ControlContainer, { self: true });
  containerControl = inject(ControlContainer, { optional: true });

  #elementRef = inject(ElementRef);
  #containerRef = inject(ViewContainerRef);
  #componentRef: ComponentRef<InputErrorComponent> | null = null;

  #errorMessageTrigger!: Subscription;

  get form() {
    return this.containerControl?.formDirective as
      | NgForm
      | FormGroupDirective
      | null;
  }

  ngOnInit(): void {
    if (!this.ngControl.control)
      throw Error(`No control model for ${this.ngControl.name} control...`);
    this.#errorMessageTrigger = merge(
      this.ngControl.control.statusChanges,
      fromEvent(this.#elementRef.nativeElement, 'blur'),
      iif(() => !!this.form, this.form!.ngSubmit, EMPTY)
    )
      .pipe(startWith(this.ngControl.control.status))
      .subscribe(() => {
        if (
          this.errorStateMatcher.isErrorVisible(
            this.ngControl.control,
            this.form
          )
        ) {
          this.#componentRef ??=
            this.#containerRef.createComponent(InputErrorComponent);
          this.#componentRef?.setInput('errors', this.ngControl.errors);
        } else {
          this.#componentRef?.destroy();
          this.#componentRef = null;
        }
      });
  }

  ngOnDestroy() {
    this.#errorMessageTrigger.unsubscribe();
  }
}
