gimport {Component, inject} from '@angular/core';
import {F1Service, Race} from '../../services/f1.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-f1-selector',
    standalone: true,
    imports: [],
    templateUrl: './f1-selector.component.html',
    styleUrl: './f1-selector.component.scss'
})
export class F1SelectorComponent {

    f1Service = inject(F1Service);
    onSeasonUpdateSub: Subscription | undefined;
    onRaceUpdateSub: Subscription | undefined;

    seasons: string[] = [];
    races: string[] = [];

    onSeasonUpdate = (seasons: string[]) => {
        console.log('Subbed Function executed')
        this.seasons = seasons;
    }

    onRaceUpdate = (races: Race[]) => {
        console.log('Subbed Function executed')
        this.races = races.map(race => race.round);

    }

    ngOnInit() {
        console.log('init')
        this.onSeasonUpdateSub = this.f1Service.seasons$.subscribe(this.onSeasonUpdate);
        this.onRaceUpdateSub = this.f1Service.races$.subscribe(this.onRaceUpdate);
    }

    ngOnDestroy() {
        console.log('destroy')
        this.onSeasonUpdateSub?.unsubscribe();
        this.onRaceUpdateSub?.unsubscribe();
    }

}
