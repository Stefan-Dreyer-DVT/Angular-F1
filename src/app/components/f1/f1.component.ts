import { Component } from '@angular/core';
import {F1DetailsComponent} from './f1-details/f1-details.component';
import {F1PollsComponent} from './f1-polls/f1-polls.component';
import {F1SelectorComponent} from './f1-selector/f1-selector.component';
import {F1ResultsComponent} from './f1-results/f1-results.component';

@Component({
  selector: 'app-f1',
  standalone: true,
    imports: [
        F1DetailsComponent,
        F1PollsComponent,
        F1SelectorComponent,
        F1ResultsComponent
    ],
  templateUrl: './f1.component.html',
  styleUrl: './f1.component.scss'
})
export class F1Component {

}
