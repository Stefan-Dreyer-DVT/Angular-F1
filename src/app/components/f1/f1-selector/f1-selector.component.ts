import {Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AsyncPipe} from '@angular/common';
import {F1Service} from '../../../services/f1/f1.service';

@Component({
    selector: 'app-f1-selector',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        FormsModule,
        AsyncPipe
    ],
    templateUrl: './f1-selector.component.html',
    styleUrl: './f1-selector.component.scss'
})
export class F1SelectorComponent {

    selectedSeason = '';
    selectedRace = 0;


    constructor(protected f1Service: F1Service) {
    }

}
