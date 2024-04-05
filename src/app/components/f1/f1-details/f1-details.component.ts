import {Component} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {WikiService} from '../../../services/wiki/wiki.service';
import {F1Service} from '../../../services/f1/f1.service';

@Component({
  selector: 'app-f1-details',
  standalone: true,
    imports: [
        AsyncPipe
    ],
  templateUrl: './f1-details.component.html',
  styleUrl: './f1-details.component.scss'
})
export class F1DetailsComponent {


    image$ = this.wikiService.image$;
    desc$ = this.wikiService.description$;
    results$ = this.f1Service.results$;


    isExpanded: boolean = false; // Flag to track whether full text is displayed

    truncateText(text: string | null, maxLength: number): string {
        if(!text){
            return '';
        }
        if (text.length <= maxLength) {
            return text;
        }
        return text.substring(0, maxLength) + '...';
    }

    constructor(private wikiService: WikiService,
                private f1Service: F1Service) {
    }

}
