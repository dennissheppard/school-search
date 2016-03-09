import { Component } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import { RouterLink } from 'angular2/router';
import { Observable } from 'rxjs/Observable';
import {SchoolService} from "./school.service";

@Component({
    selector: 'school-search-app',
    templateUrl: 'school-search-app.html',
    providers: [SchoolService],
    directives: []
})
export class SchoolSearchComponent{
    constructor(){


    }
}