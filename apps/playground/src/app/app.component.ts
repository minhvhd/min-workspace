import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./core/header/header.component";
import { FooterComponent } from "./core/footer/footer.component";

@Component({
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  selector: 'min-root',
  template: `
    <min-playground-header></min-playground-header>
    <main class="content">
      <router-outlet></router-outlet>
    </main>
    <min-playground-footer></min-playground-footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'playground';
}
