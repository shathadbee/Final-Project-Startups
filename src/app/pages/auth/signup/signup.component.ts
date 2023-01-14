import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CustomValidators } from 'src/app/help/custom-validators';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  formGroup!:FormGroup;
  visible = true;
  changetype:boolean=true;
  constructor(private router:Router ,private formBuilder:FormBuilder,private _authService:AuthService){}
  ngOnInit(): void {

this.formGroup=this.formBuilder.group({
name:[null, Validators.required],
age:[null, Validators.required],
email:[null, [Validators.required, Validators.email]],
password:[null,[Validators.required,Validators.pattern("(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]],
 confirmPassword: [null, [Validators.required]],

},
CustomValidators.mustMatch('password', 'confirmPassword'),
    );

  }
  onSignupClicked(){
if(this.formGroup.invalid){
  this.validateFormGroup();
}
else{
  this._authService.signup(this.email.value,this.password.value).pipe(switchMap((user : any ) =>{
    return this._authService.createUser(user.user.uid ,  this.email.value,this.name.value,this.age.value)
})).subscribe((result)=>{
   //this.router.navigate(['/home'])
  })
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















  get name () {
    return this.formGroup.controls['name'] as FormControl;

  }
  get age () {
    return this.formGroup.controls['age'] as FormControl;

  }
  get email () {
    return this.formGroup.controls['email'] as FormControl;

  }
  get password () {
    return this.formGroup.controls['password'] as FormControl;

  }
  get confirmPassword() {
    return this.formGroup.controls['confirmPassword'];
  }


  viewpass(){
this.visible=!this.visible;
this.changetype=!this.changetype;
  }
}


