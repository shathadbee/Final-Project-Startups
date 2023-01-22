import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StartupsService } from 'src/app/core/services/startups/startups.service';
import { UploadService } from 'src/app/core/services/upload/upload.service';
import { Location } from '@angular/common';
import { SectorsService } from 'src/app/core/services/sectors/sectors.service';
import { Subject, Subscription, takeUntil } from 'rxjs';
@Component({
  selector: 'app-update-startup',
  templateUrl: './update-startup.component.html',
  styleUrls: ['./update-startup.component.css']
})
export class UpdateStartupComponent implements OnInit ,OnDestroy{
  formGroup :FormGroup;
  imgSrc:any;
key:string='';
listSectors:any[]= [] ;
subject = new Subject();
loader=true;
constructor(
    private formBuilder:FormBuilder,
  private activatedRoute:ActivatedRoute
   , private _startupsService:StartupsService
   ,private _uploadService:UploadService,
   private  _sectorsService:SectorsService

   , private location:Location ){


  this.formGroup =this.formBuilder.group({
    city :null,
    logo :'',
    emailAddress:[null,[ Validators.email, Validators.required]],
    name:[null,[Validators.required]],
    sectors:[null,[Validators.required]],
    websiteUrl:[null,[Validators.required]],
    numberOfEmployees:null,
    yearOfEstablish:'',
    describtion:null,
  })
}
getErrorMessage(control:any){
  if(control && control.errors){

  if(control.hasError('required')){
return 'You must enter a value';
  }
  if(control.hasError('required')){
  return   'Not a valid email';}

  }
  return '';
}




  ngOnInit(): void {
    this.getAllSectors();

   this.activatedRoute.queryParams.pipe(takeUntil(this.subject)).subscribe((result)=>
   {
    if (result['key']){
      this.key=result['key']
      this.getById();
    }
    setTimeout(() => {
      this.loader=false;
    }, 1000);
   })
  }

  getById(){

this._startupsService.getById(this.key).pipe(takeUntil(this.subject)).subscribe((result:any)=>{
  console.log(result)
  this.formGroup =this.formBuilder.group({
    city : result['city'],
    logo : result['logo'],
    emailAddress:[result [ 'emailAddress'], [ Validators.email   ,Validators.required]],
    name:[result [ 'name'], [Validators.required]],
    sectors:[result [ 'sectors'],[Validators.required]],
    websiteUrl:[result [ 'websiteUrl'],[Validators.required]],
    numberOfEmployees: result['numberOfEmployees'],
    yearOfEstablish: result['yearOfEstablish'],
    describtion:result['describtion']
  });
  this.imgSrc=result['logo'];



})
  }
  onUpdateClicked(){
    if (this.formGroup.invalid){
      this.validateFormGroup()
    }else{
      if(this.formGroup.controls['logo'].value.name){
        this.upload();
      }
         this.updateStartup();

    }
      }

      upload(){
        this._uploadService.upload(this.formGroup.controls['logo'].value).subscribe((file)=>{
          if(file?.metadata){
          this.getDownloadURL()}
        })
      }

      getDownloadURL(){

        this._uploadService.getDownloadURL().subscribe((url)=>{
        console.log()
        this.formGroup.controls['logo'].setValue(url);
        this.updateStartup();
        })
       }


       validateFormGroup(){
        Object.keys(this.formGroup.controls).forEach((filed)=>{
      const control=this.formGroup.get(filed) ;
      control?.markAsTouched({onlySelf:true});
        })  ;
      }

  updateStartup(){
    this._startupsService.update( this.key,{
      name:this.formGroup.controls['name'].value,
      emailAddress:this.formGroup.controls['emailAddress'].value,
      sectors:this.formGroup.controls['sectors'].value,
      websiteUrl:this.formGroup.controls['websiteUrl'].value,
      city:this.formGroup.controls['city'].value,
      yearOfEstablish:this.formGroup.controls['yearOfEstablish'].value,
      numberOfEmployees:this.formGroup.controls['numberOfEmployees'].value,
      logo:this.formGroup.controls['logo'].value,
      describtion:this.formGroup.controls['describtion'].value,
    }).then(()=>{
    this.location.back()
    })}


onfileInputChang($event:any){
  this.formGroup.controls['logo'].setValue($event.target.files[0]);
  const reader =new FileReader();
  reader.onload=(e)=> (this.imgSrc=reader.result);
     reader.readAsDataURL (this.formGroup.controls['logo'].value);
  }


  getAllSectors(){

    this._sectorsService.getAll().pipe(takeUntil(this.subject)).subscribe((result)=>{
      if(result){
        this.listSectors= result;
      }
    })
  }


  ngOnDestroy(): void {
    this.subject.next(true);
    this.subject.complete();
  }
    }



