import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sectors } from 'src/app/core/interfaces/sectors.interfaace';
import { StartupsService } from 'src/app/core/services/startups/startups.service';
import { UploadService } from 'src/app/core/services/upload/upload.service';
import { Location } from '@angular/common';
import { SectorsService } from 'src/app/core/services/sectors/sectors.service';
import { Subject, Subscription, takeUntil } from 'rxjs';
@Component({
  selector: 'app-add-sector',
  templateUrl: './add-sector.component.html',
  styleUrls: ['./add-sector.component.css']
})
export class AddSectorComponent implements OnInit,OnDestroy{
    formGroup:FormGroup;
    imgSrc:any;
    subject = new Subject();

    loader=true;
    constructor(
      private formBuilder: FormBuilder,

      private _sectorsService:SectorsService,
      private _uploadService: UploadService,
      private location: Location
    ) {
      this.formGroup = this.formBuilder.group({
        name:[null,[Validators.required]],
        logo:null,
        color:[null,[Validators.required]],
        sectors:[null,[Validators.required]],
        categoryName:null,
      })
    }



  ngOnInit(): void {
    setTimeout(() => {
    this.loader=false;
  }, 1000);}

  getErrorMessage(control:any){
    if(control && control.errors){


     if(control.hasError('required')){
        return  'You must enter a value '
     }
     if(control.hasError('email')){
      return  'Not a valid email '
   } }
   return '';
   }

   validaterFormGroup(){
    Object.keys(this.formGroup.controls).forEach((filed)=>{
      const control = this.formGroup.get(filed);
      control?.markAsTouched({onlySelf:true});
    })
   }
   onAddSectorCliked(){
    if(this.formGroup.invalid){
      this.validaterFormGroup();
    }else{
      if(this.formGroup.controls['logo'].value){
        this.upload();
      }else{
        this.createSectors()
      }

    }
}
createSectors(){
  this._sectorsService .create({
    name:this.formGroup.controls['name'].value,
    logo:this.formGroup.controls['logo'].value,
    color:this.formGroup.controls['color'].value,
    sectors:this.formGroup.controls['sectors'].value,
    categoryName:this.formGroup.controls['categoryName'].value,
}).then(()=>{
  this.location.back();
})
 }

  onFileInputChange($event:any){
    console.log($event);
     this.formGroup.controls['logo'].setValue($event.target.files[0]);
     //file data Url storge
     const reader = new FileReader();
     reader.readAsDataURL(this.formGroup.controls['logo'].value);
     reader.onload = e =>(this.imgSrc = reader.result);
    }

   upload(){
    this._uploadService
    .upload
    (this.formGroup.controls['logo'].value)
    .subscribe((file)=>{
     if(file?.metadata){
      this.getDownloadURL();
     }
  })
};

getDownloadURL(){

  this._uploadService.getDownloadURL().pipe(takeUntil(this.subject)).subscribe((url)=>{
  console.log();
  this.formGroup.controls['logo'].setValue(url);
  this.createSectors();
  });
}


ngOnDestroy(): void {
  this.subject.next(true);
  this.subject.complete();
}



}
