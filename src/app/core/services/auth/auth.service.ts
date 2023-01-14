import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, from, Observable } from 'rxjs';
import {UserCredential} from '@firebase/auth-types';
import { AngularFireDatabase , AngularFireList } from '@angular/fire/compat/database';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  dbUserPath='/users';
dbRef:AngularFireList<any>;
userInfo= new BehaviorSubject<any>({});
userId:string='';
isLoggedIn$ = new BehaviorSubject<boolean>( !!localStorage.getItem('userId'));

  constructor(private router:Router ,
  private angularFireAuth :AngularFireAuth,
 private angularFireDatabase:AngularFireDatabase ) {
   this.dbRef=angularFireDatabase.list(this.dbUserPath);
   this.authStateSubscribe()

  }


login(email:string,password:string):Observable<any>{
  return from (this.angularFireAuth.signInWithEmailAndPassword(email,password)
.catch((error)=>{
    //this.router.navigate (['/auth/login']);
    window.alert(error.massage);

  })
 );
}


get isLoggedIn(){
  return this.isLoggedIn$.getValue();
}



authStateSubscribe(){
  this.angularFireAuth.authState.subscribe((user)=>{
    if(user){
      if(!this.isLoggedIn){
      this.router.navigate(['/startups/all-startup']);}

      this.getUserById(user.uid);
      localStorage.setItem('userId', user.uid);
     this.isLoggedIn$.next(true);
    }
    else{
      localStorage.removeItem('userId');
      this.isLoggedIn$.next(false);
      this.router.navigate(['/home']);
  }
  });
}

signup ( email:string, password:string  ) :Observable<any>  {
return from(this.angularFireAuth.createUserWithEmailAndPassword( email ,password)
.catch((error)=>{
  window.alert(error.massage);
}
));
}


createUser ( userId:string,email:string, name:string,age:number ) :Observable<any>  {

return from
(this.dbRef.update(userId,{userId:userId,email:email, name:name,age:age,role:'enduser'})

);

  }

getUserById (userId:string) {
 this.angularFireDatabase.object(`${this.dbUserPath}/${userId}`).valueChanges()
 .subscribe((user)=>{
this.userInfo.next(user);
 })


 /*.subscribe((result)=>
{
  this.userInfo=result;
  console.log(this.userInfo);
});*/

}
logout(){
  return this.angularFireAuth.signOut().then(()=>{
  localStorage.removeItem('userId')
  this.router.navigate(['/home']);
  this.isLoggedIn$.next(false);
})
}


}
