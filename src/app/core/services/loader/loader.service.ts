import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {


private loading:boolean=false;
  constructor() { }
  setload(loading:boolean){
    this.loading=loading;
  }
  getload():boolean{
    return this.loading;
  }
}
