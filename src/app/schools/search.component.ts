import { Component } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import { RouterLink } from 'angular2/router';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'search',
    template: '<button class="btn" (click)="search()">',
    providers: [],
    directives: []
})
export class SearchComponent{
    constructor(){
    }
}