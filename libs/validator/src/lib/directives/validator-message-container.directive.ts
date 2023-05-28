import { Directive, inject, ViewContainerRef } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[validatorMessageContainer]',
  exportAs: 'validatorMessageContainer',
})
export class ValidatorMessageContainer {
  container = inject(ViewContainerRef);
}
