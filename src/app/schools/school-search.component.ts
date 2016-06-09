import { Component } from '@angular/core';
import {CORE_DIRECTIVES, DecimalPipe} from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { SchoolListComponent } from './school-list/school-list.component';
import { SchoolService, School } from "./services/school.service";
import {SchoolDetailComponent} from "./school-detail/school-detail.component";
import {Callout} from "./services/callout";

@Component({
    selector: 'school-search',
    templateUrl: 'src/app/schools/school-search.html',
    providers: [SchoolService, DecimalPipe],
    directives: [SchoolListComponent, SchoolDetailComponent]
})
export class SchoolSearchComponent{
    schoolDetails: Array<any> = [];
    selectedSchool: School = {
        name: '',
        total_costs_out_of_state: 0,
        details: {},
        id: -1,
        population: 0
    };

    

    constructor(private schoolService: SchoolService){}
    
    setSelectedSchool(selectedSchool: School){
        this.selectedSchool = selectedSchool;
    }

    


}