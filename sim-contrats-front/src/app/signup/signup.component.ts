import { Component } from '@angular/core';
import { GlobalConstants } from '../shared/global-constants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { SnackbarService } from '../services/snackbar.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  password= true;
  confirmPassword= true;
  signupForm:any = FormGroup;
  responseMessage:any;


  constructor(private formBuilder:FormBuilder, 
    private router:Router, 
    private userService:UserService,
    private snackbarService:SnackbarService,
    public dialogRef:MatDialogRef<SignupComponent>,
    private ngxservice:NgxUiLoaderService )  {}

  ngOnInit(): void{
    this.signupForm = this.formBuilder .group({
      firstName:[null,[Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      lastName:[null,[Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      email:[null,[Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
     
      password:[null,[Validators.required]],
      confirmPassword:[null,[Validators.required]]

  })
  }  

  validateSubmit(){
    if(this.signupForm.controls['password'].value != this.signupForm.controls['confirmPassword'].value){
      return true;
    }else{
      return false;
    }
  }

  handleSubmit(){
    this.ngxservice.start();
    var formData = this.signupForm.value;
    var data = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword
    }
    this.userService.signup(data).subscribe((response:any)=>{
      this.ngxservice.stop();
      this.dialogRef.close();
      this.responseMessage = response?.message;
      this.snackbarService.openSnackBar(this.responseMessage,"");
      this.router.navigate(['/']);
    },(error: any)=>{
      this.ngxservice.stop();
      if(error.error?.message){
        this.responseMessage = error.error?.message; 
      }
      else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    
   });
  }
  
}
