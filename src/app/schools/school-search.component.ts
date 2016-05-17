import { Component } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { SchoolListComponent } from './school-list/school-list.component';
import { SchoolService, School } from "./services/school.service";
import {SchoolDetailComponent} from "./school-detail/school-detail.component";

@Component({
    selector: 'school-search',
    templateUrl: 'src/app/schools/school-search.html',
    providers: [SchoolService],
    directives: [SchoolListComponent, SchoolDetailComponent]
})
export class SchoolSearchComponent{

    constructor(){


    }


}