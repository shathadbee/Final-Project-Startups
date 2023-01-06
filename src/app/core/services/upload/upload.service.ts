import { Injectable } from '@angular/core';
import {AngularFireStorageReference ,AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UploadService {
dbpath="/files"
storageRef:AngularFireStorageReference;
fileUrl:string='';
  constructor( private  storage:AngularFireStorage) {
    this.storageRef= storage.ref(this.dbpath);
  }

  upload(file:File){
    const filePath=`${this.dbpath}/${file.name}`;
    this.storageRef= this.storage.ref (filePath);
      return this.storage.upload(filePath,file).snapshotChanges();

  }
  getDownloadURL(){
  return this.storageRef.getDownloadURL();

}


}
