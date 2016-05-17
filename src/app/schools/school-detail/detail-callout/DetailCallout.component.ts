import { Component, Input } from '@angular/core';
import { Callout } from "../../services/Callout";

@Component({
    selector: 'detail-callout',
    templateUrl: 'src/app/schools/school-detail/detail-callout/detail-callout.html'
})

export class DetailCalloutComponent{
    @Input() config: Callout;
    constructor(){

    }

}