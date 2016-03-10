import { Component, Input } from 'angular2/core';

@Component({
    selector: 'detail-callout',
    templateUrl: 'app/schools/school-detail/detail-callout/detail-callout.html'
})

export class DetailCalloutComponent{
    @Input() config: any;
    constructor(){

    }

}