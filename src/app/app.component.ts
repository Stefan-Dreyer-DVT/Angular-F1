import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {F1SelectorComponent} from './components/f1-selector/f1-selector.component';

@Component({
  selector: 'app-root',
  standalone: true,
    imports: [RouterOutlet, F1SelectorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-project';
}
