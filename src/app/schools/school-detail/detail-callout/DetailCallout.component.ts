import { Component, Input } from '@angular/core';

@Component({
    selector: 'detail-callout',
    templateUrl: 'src/app/schools/school-detail/detail-callout/detail-callout.html'
})

export class DetailCalloutComponent{
    @Input() config: any;
    constructor(){

    }

}