import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { map, Observable } from 'rxjs';
import { Sectors } from '../../interfaces/sectors.interfaace';


@Injectable({
  providedIn: 'root'
})
export class SectorsService {
  dbpath='/sectors';
  dbRef:AngularFireList<Sectors>;

  constructor( private angularFiredatabase:AngularFireDatabase,) {
    this.dbRef= angularFiredatabase.list(this.dbpath)
  }

create(data:Sectors){
  return this.dbRef.push(data);
  }
  update(key:string,data:Sectors){
    return this.dbRef.update(key,data);
   }
  getById(key:string){
    return this.angularFiredatabase
    .object(`${this.dbpath}/${key}`).valueChanges();
  }

  delete(key: string | undefined) {
    return this.dbRef.remove(key);
  }



  deleteAll() {
    return this.dbRef.remove();
  }


   getAll(): Observable<any>{
    return  this.dbRef
    .snapshotChanges()
    .pipe(
        map((data)=>
          data.map((obj)=>({key:obj.payload.key , ...obj.payload.val()}))
       )
      )
    }
  }
