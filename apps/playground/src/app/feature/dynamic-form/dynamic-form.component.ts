import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'min-dynamic-form',
  templateUrl: 'dynamic-form.component.html',
  styleUrls: ['dynamic-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFormComponent {}
