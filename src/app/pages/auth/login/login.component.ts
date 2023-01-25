import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit{
  visible = true;
  changetype:boolean=true;
  formGroup!:FormGroup;
  constructor(private router:Router ,private formBuilder:FormBuilder,private _authService:AuthService){}


  ngOnInit(): void {
    this.formGroup=this.formBuilder.group({

      email:[null, [Validators.required, Validators.email]],
      password:[null,[Validators.required,Validators.pattern("(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]],

          });
  }
  onloginClicked(){
    if(this.formGroup.invalid){
     this.validateFormGroup()}
     else{
      this._authService.login(this.email.value,this.password.value);
    }

}

validateFormGroup(){
  Object.keys(this.formGroup.controls).forEach((filed)=>{
const control=this.formGroup.get(filed) ;
control?.markAsTouched({onlySelf:true});
  })  ;
}


getEmailErrorMessage(){
  if (this.email.hasError('required')) {
    return 'You must enter a value';
  }

  return this.email.hasError('email') ? 'Not a valid email' : '';
}

getPasswordErrorMessage(){
  if (this.password.hasError('required')) {
    return 'You must enter a value';
  }

  return  'Password not valid ' ;
}



get email () {
  return this.formGroup.controls['email'] as FormControl;

}
get password () {
  return this.formGroup.controls['password'] as FormControl;

}


viewpass(){
  this.visible=!this.visible;
  this.changetype=!this.changetype;
    }

}

