import {Component} from '@angular/core';
import {AsyncPipe, NgIf} from '@angular/common';
import {F1Service} from '../../../services/f1/f1.service';

@Component({
  selector: 'app-f1-polls',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf
  ],
  templateUrl: './f1-polls.component.html',
  styleUrl: './f1-polls.component.scss'
})
export class F1PollsComponent {

  results$ = this.f1Service.results$;
  constructor(private f1Service: F1Service) {
  }
}
