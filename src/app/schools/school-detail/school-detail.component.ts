import { Component, Input, EventEmitter } from '@angular/core';
import { CORE_DIRECTIVES, DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { SchoolService, School } from '../services/school.service';
import { Subscription } from "rxjs/Subscription";
import { DetailCalloutComponent } from './detail-callout/DetailCallout.component';
import { ICallout } from '../services/ICallout';
import {Callout} from "../services/callout";

@Component({
    selector: 'school-detail',
    templateUrl: 'src/app/schools/school-detail/school-detail.html',
    providers: [DecimalPipe],
    directives: [DetailCalloutComponent]
})
export class SchoolDetailComponent{
    @Input() selectedSchool: School;
    @Input() schoolDetails: Array<any>;
    @Input() calloutData: any;
    


    constructor(private schoolService: SchoolService){
        
    }



    


}
