import { Component } from '@angular/core';
import { GlobalConstants } from '../shared/global-constants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { SnackbarService } from '../services/snackbar.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


  hide = true;
  loginForm:any = FormGroup;
  responseMessage:any;
  responsedata: any;

  constructor(private formBuilder:FormBuilder, 
    private router:Router, 
    private userService:UserService,
    private snackbarService:SnackbarService,
   
    private ngxservice:NgxUiLoaderService)  {
      localStorage.clear();
    }

  ngOnInit(): void{
    

    this.loginForm = this.formBuilder .group({
      
      email:[null,[Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
      password:[null,[Validators.required]]
  })



  }  



  handleSubmit(){
    this.ngxservice.start();
    var formData = this.loginForm.value;
    var data = {
      email: formData.email,
      password: formData.password
    }
    this.userService.login(data).subscribe((response:any)=>{
      this.responsedata = response; 
      this.ngxservice.stop();
    //  this.dialogRef.close();
    if (this.responsedata != null) {
    localStorage.setItem('accessToken', this.responsedata.accessToken);
    localStorage.setItem('token', this.responsedata.token);   
    this.router.navigate(['/admin/dashboard']);
    }
    
    },(error: any)=>{

      this.ngxservice.stop();
      
      alert("login Failed");
    
   });
  }


}
