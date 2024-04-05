import {Injectable} from '@angular/core';
import {WikiImageService} from './wiki-image.service';
import {WikiDescriptionService} from './wiki-description.service';
import {F1Service} from '../f1/f1.service';
import {map, switchMap} from 'rxjs';


export const corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com/';

@Injectable({
    providedIn: 'root'
})
export class WikiService {

    result$ = this.f1Service.results$
        .pipe(
            map(results => results.filter(result => result.position === '1')),
            map(([first]) => first),
            map(result => result.Driver.url.substring(result.Driver.url.lastIndexOf('/') + 1))
        )

    image$ = this.result$.pipe(
        switchMap(url => this.wikiImage.fetchImage(url))
    );

    description$ = this.result$.pipe(
        switchMap(url => this.wikiDesc.fetchDescription(url))
    );


    constructor(private f1Service: F1Service,
                private wikiImage: WikiImageService,
                private wikiDesc: WikiDescriptionService) {
    }

}
