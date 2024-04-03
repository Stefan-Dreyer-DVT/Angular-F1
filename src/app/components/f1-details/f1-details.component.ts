import {Component} from '@angular/core';
import {F1Service} from '../../services/f1.service';
import {WikiService} from '../../services/wiki.service';
import {AsyncPipe} from '@angular/common';

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

    fullText: string = ''; // Full text from API
    truncatedText: string = ''; // Truncated text to display
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

    constructor(public wikiService: WikiService, protected f1Service: F1Service) {
        this.fullText = '...'; // Assign the full text here
        this.truncatedText = this.truncateText(this.fullText, 200); // Truncate text to 200 characters
    }

}
