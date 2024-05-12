import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // This makes the service globally available
})
export class ExpenseData {
  food:number | undefined;
  travel:number | undefined;
  shooping  :number | undefined;
  grocery:number | undefined;
  gifts:number | undefined;
  bills:number | undefined;
  others:number | undefined;
}