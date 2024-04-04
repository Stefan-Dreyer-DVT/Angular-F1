import { Component } from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {F1Service} from '../../../services/f1/f1.service';
import {CountryService} from '../../../services/country.service';

@Component({
  selector: 'app-f1-results',
  standalone: true,
    imports: [
        AsyncPipe
    ],
  templateUrl: './f1-results.component.html',
  styleUrl: './f1-results.component.scss'
})
export class F1ResultsComponent {

  constructor(protected f1Service : F1Service,
              protected countryService : CountryService) {
  }

}
