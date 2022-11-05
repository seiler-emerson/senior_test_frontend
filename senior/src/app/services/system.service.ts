import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  currentTitle!: string;
  
  constructor() { }
}
