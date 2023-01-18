
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../auth/auth.service';
import { ApplicationInitStatus } from '@angular/core';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, switchMap } from 'rxjs';

import { AngularFireDatabase } from '@angular/fire/compat/database';
import { LoaderService } from '../loader.service';
@Injectable({
  providedIn: 'root',
})
export class AppInitalizService {
private userData=new BehaviorSubject<null>(null);
readonly userData$=this.userData.asObservable();

  constructor(private _authService: AuthService,
    private fireAuth:AngularFireAuth,
    private db:AngularFireDatabase,
    private _loader:LoaderService) {}

    getUserById(uid:any){
      return this.db.object('/users'+ uid);
    }
   // : Promise<any>
  //this._authService.getUserById('') ;
      //resolve(true);



  appInitializer(){
    return new Promise<boolean>((resolve, reject) => {
      console.log('App-Initializer');
  this._loader.setload(true);
  this.fireAuth.authState.pipe (switchMap((user)=>{
  return this.getUserById(user?.uid).valueChanges().pipe(map((user) => user));
  }))
 .subscribe({
  next:(data:any)=>{
if(data){
  this._loader.setload(false);
  this.userData.next(data);
}else{this._loader.setload(false)
  this.userData.next(null);
}
  }
})
resolve(true);
  });
}


}


export function appInitializer(config: AppInitalizService) {
  return () => config.appInitializer();
}
