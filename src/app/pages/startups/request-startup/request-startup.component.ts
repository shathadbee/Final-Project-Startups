import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { StartupsService } from 'src/app/core/services/startups/startups.service';
import { UploadService } from 'src/app/core/services/upload/upload.service';
import { SectorsService } from 'src/app/core/services/sectors/sectors.service';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-request-startup',
  templateUrl: './request-startup.component.html',
  styleUrls: ['./request-startup.component.css']
})
export class RequestStartupComponent implements OnInit {
  formGroup: FormGroup;
  imgSrc: any;
  listSectors:any[]=[];
  subject = new Subject();
  loader=true;
  constructor(
    private formBuilder: FormBuilder,
    private _startupsService: StartupsService,
    private _uploadService: UploadService,
    private location: Location,
    private  _sectorsService:SectorsService
  ) {
    this.formGroup = this.formBuilder.group({
      city: null,
      logo: '',
      emailAddress: [null, [Validators.email, Validators.required]],
      name: [null, [Validators.required]],
      sectors: [null, [Validators.required]],
      websiteUrl: [null, [Validators.required]],
      numberOfEmployees: null,
      yearOfEstablish: '',
    });
  }

  getErrorMessage(control: any) {
    if (control && control.errors) {
      if (control.hasError('required')) {
        return 'You must enter a value';
      }
      if (control.hasError('required')) {
        return 'Not a valid email';
      }
    }
    return '';
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loader=false;
    }, 1000);
    this.getAllSectors()}

  onAddClicked() {
    if (this.formGroup.invalid) {
      this.validateFormGroup();
    } else {
      if (this.formGroup.controls['logo'].value) {
        this.upload();
      }else{
        this.createStartup();
      }

    }
  }
  upload() {
    this._uploadService
      .upload(this.formGroup.controls['logo'].value)
      .subscribe((file) => {
        if (file?.metadata) {
          this.getDownloadURL();
        }
      });
  }
  getDownloadURL() {
    this._uploadService.getDownloadURL().pipe(takeUntil(this.subject)).subscribe((url) => {
      console.log();
      this.formGroup.controls['logo'].setValue(url);
      this.createStartup();
    });
  }

  validateFormGroup() {
    Object.keys(this.formGroup.controls).forEach((filed) => {
      const control = this.formGroup.get(filed);
      control?.markAsTouched({ onlySelf: true });
    });
  }

  createStartup() {
    this._startupsService
      .createRequest({
        name: this.formGroup.controls['name'].value,
        emailAddress: this.formGroup.controls['emailAddress'].value,
        sectors: this.formGroup.controls['sectors'].value,
        websiteUrl: this.formGroup.controls['websiteUrl'].value,
        city: this.formGroup.controls['city'].value,
        yearOfEstablish: this.formGroup.controls['yearOfEstablish'].value,
        numberOfEmployees: this.formGroup.controls['numberOfEmployees'].value,
        logo: this.formGroup.controls['logo'].value,
      })
      .then(() => {
        this.location.back();
      });
  }

  onfileInputChang($event: any) {
    this.formGroup.controls['logo'].setValue($event.target.files[0]);

    const reader = new FileReader();
    reader.onload = (e) => (this.imgSrc = reader.result);
    reader.readAsDataURL(this.formGroup.controls['logo'].value);
  }



  getAllSectors(){
    this._sectorsService.getAll().pipe(takeUntil(this.subject)).subscribe((result)=>{
      if(result){
        this.listSectors= result;
      }
    });
  }

  ngOnDestroy(): void {
    this.subject.next(true);
    this.subject.complete();
  }









}
