import { Component } from 'angular2/core';
import { HTTP_PROVIDERS } from 'angular2/http';
import { CORE_DIRECTIVES } from 'angular2/common';
import { RouterLink } from 'angular2/router';
import { Observable } from 'rxjs/Observable';
import {SchoolSearchComponent} from './schools/school-search.component';
import {ConstantsService} from './shared/services/constants.service';

@Component({
    selector: 'school-search-app',
    template: `
        <school-search></school-search>
    `,
    providers: [HTTP_PROVIDERS, ConstantsService],
    directives: [SchoolSearchComponent]
})
export class AppComponent{
    constructor(){

    }
}