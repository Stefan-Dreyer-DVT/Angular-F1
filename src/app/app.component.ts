import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {F1SelectorComponent} from './components/f1-selector/f1-selector.component';
import {F1PollsComponent} from './components/f1-polls/f1-polls.component';
import {F1DetailsComponent} from './components/f1-details/f1-details.component';

@Component({
  selector: 'app-root',
  standalone: true,
    imports: [RouterOutlet, F1SelectorComponent, F1PollsComponent, F1DetailsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-project';
}
