import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import {  map, Observable } from 'rxjs';
import { Startup } from '../../interfaces/startups.interface';

@Injectable({
  providedIn: 'root',
})
export class StartupsService {
  dbpath = '/startups';
  dbRef: AngularFireList<Startup>;
  fileUrl: string = '';
  constructor(
    private angularFireDatabase: AngularFireDatabase,
    private storage: AngularFireStorage
  ) {
    this.dbRef = angularFireDatabase.list(this.dbpath);
  }
  create(data:Startup) {
    return this.angularFireDatabase.list('/startups').push(data);
  }

  createRequest(data: Startup) {
    return this.angularFireDatabase.list('/requestStartup/').push(data);
  }


  update(key: string, data: Startup) {
    return this.dbRef.update(key, data);
  }



  delete(key: string | undefined) {
    return this.dbRef.remove(key);
  }



  deleteAll() {
    return this.dbRef.remove();
  }


  getById(key: string) {
    return this.angularFireDatabase
      .object(`${this.dbpath}/${key}`)
      .valueChanges();
  }

  getAll(): Observable<any> {
    return this.dbRef
      .snapshotChanges()
      .pipe(
        map((data) =>
          data.map((obj) => ({ key: obj.payload.key, ...obj.payload.val() }))
        )
      );
  }


  getAllRequest(): Observable<any> {
    return this.angularFireDatabase.list<Startup>('/requestStartup/')
      .snapshotChanges()
      .pipe(
        map((data) =>
          data.map((obj) => ({ ...obj.payload.val() , key: obj.payload.key }))
        )
      );
  }

  deleteRequest(key: string | undefined) {
    return this.angularFireDatabase.list<Startup>('/requestStartup/').remove(key);
  }


  getByIdRequest(key: string) {
    return this.angularFireDatabase
      .object('/requestStartup/'+ key)
      .valueChanges();
  }







}







