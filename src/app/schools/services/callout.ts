import { ICallout } from './ICallout';

export class Callout implements ICallout {
    panelClass:string;
    iconClass:string;
    dataPoint:string;
    dataLabel:string;

    constructor(){
        this.panelClass = '';
        this.iconClass = '';
        this.dataPoint = '';
        this.dataLabel = '';
    }
}