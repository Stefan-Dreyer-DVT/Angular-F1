import {Component, Inject, inject} from '@angular/core';
import {F1Service} from '../../services/f1.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AsyncPipe} from '@angular/common';
import {WikiService} from '../../services/wiki.service';

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

    f1Service = inject(F1Service);

    wikiService = Inject(WikiService);


    log(string : any){
        console.log(string);
    }

    ngOnInit() {
        console.log('init')
    }

    ngOnDestroy() {
        console.log('destroy')
    }

}
