import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // This makes the service globally available
})
export class ChartDetail{
    name:String|    undefined;
    amount  :number | undefined;
}