import { Component, EventEmitter, Output } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { Observable } from 'rxjs/Observable';


@Component({
    selector: 'school-filter',
    templateUrl: 'src/app/schools/school-list/school-filter/school-filter.html',
    providers: [],
    directives: []
})
export class FilterComponent{
    searchText: string = '';

    @Output() onSearch: EventEmitter<any> = new EventEmitter();

    constructor(){
    }

    searchInputChange(event: any){
        if(event.keycode === 13){
            this.searchSchools();
        }
    }

    searchSchools(){
        this.onSearch.emit(this.searchText);
    }
}