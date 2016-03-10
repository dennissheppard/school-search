import { Component } from 'angular2/core';
import { HTTP_PROVIDERS } from 'angular2/http';
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