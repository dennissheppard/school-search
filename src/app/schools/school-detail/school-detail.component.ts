import { Component, Input, EventEmitter, OnChanges } from '@angular/core';
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
export class SchoolDetailComponent implements OnChanges{
    selectedSchool: any;

    constructor(private schoolService: SchoolService){
        this.selectedSchool = this.schoolService.selectedSchool;

    }

    ngOnChanges(property: any){
        console.log('property changed: ' + JSON.stringify(property));
    }



    


}
