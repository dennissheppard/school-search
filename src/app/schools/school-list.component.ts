import { Component, OnInit } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import { RouterLink } from 'angular2/router';
import { Observable } from 'rxjs/Observable';
import { SchoolService } from './school.service'

@Component({
    selector: 'school-list',
    templateUrl: 'app/schools/school-list.html',
    providers: [],
    directives: []
})
export class SchoolListComponent implements OnInit{
    selectedSchool: any;
    schools: any[] = [];

    constructor(private schoolService: SchoolService){

    }

    ngOnInit(){
        this.getSchools();
    }

    //DOM methods
    setSelectedSchool(school){
        this.selectedSchool = school;
    }

    //private methods
    getSchools(){
        this.schoolService.getSchools()
        .subscribe(
            schools => this.schools = this.schools.concat(schools)
        );
    }
}