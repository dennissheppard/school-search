import { Component, Input } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import { RouterLink } from 'angular2/router';
import { Observable } from 'rxjs/Observable';
import { SchoolService } from './school.service';

@Component({
    selector: 'school-detail',
    templateUrl: 'app/schools/school-detail.html',
    providers: [],
    directives: []
})
export class SchoolDetailComponent{
    @Input() selectedSchool: any;
    constructor(private schoolService: SchoolService){


    }
}