import {Component, inject} from '@angular/core';
import {F1Service} from '../../services/f1.service';
import {CountryService} from '../../services/country.service';
import {AsyncPipe, NgIf} from '@angular/common';

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

  f1Service = inject(F1Service);
  countryService = inject(CountryService);
  ngOnInit(){

  }

  ngOnDestroy(){

  }

}
