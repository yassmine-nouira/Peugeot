import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ContratService } from 'src/app/services/contrat.service';

import { SnackbarService } from 'src/app/services/snackbar.service';
import { DomSanitizer } from '@angular/platform-browser';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { MatSelectChange } from '@angular/material/select';


@Component({
  selector: 'app-contrat',
  templateUrl: './contrat.component.html',
  styleUrls: ['./contrat.component.scss']
})
export class ContratComponent implements OnInit {

  onAddContrat = new EventEmitter();
  onEditContrat = new EventEmitter();
  contratForm:any = FormGroup;
  dialogAction :any ="Add";
  action:any ="Add";
  responseMessage:any;

  selectedValue!:string;
  types:any=[];
  
  name:string='';

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
              private formBuilder:FormBuilder,
              private contratService:ContratService,
              public dialogRef:MatDialogRef<ContratComponent>,
              private snackbarService:SnackbarService,
              private sanitizer: DomSanitizer
              ) {}

              
  ngOnInit(): void {

 
    this.contratForm = this.formBuilder.group({
      modelev:[null,[Validators.required]],
      type:[null,[Validators.required]],
      dureeGarantie:[null,[Validators.required]],
      km:[null,[Validators.required]],
      puht:[null,[Validators.required]],
      puttc:[null,[Validators.required]]
    });

    if(this.dialogData.action === "Edit"){
      this.dialogAction = "Edit";
      this.action = "Update";
      this.contratForm.patchValue(this.dialogData.data);
    }

  }

  

  handleSubmit(){
    if(this.dialogAction === "Edit"){
      this.edit();
    }
    else{
      this.add();
    }
  }


  add(){
    var formData = this.contratForm.value;

    this.contratService.add(formData).subscribe((response:any)=>{
      this.dialogRef.close();
      this.onAddContrat.emit();
      this.responseMessage = response.message;
      this.snackbarService.openSnackBar(this.responseMessage, "success");
    },(error:any)=>{
      this.dialogRef.close();
      console.error(error);
      if(error.error?.message){
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
     });
  }

  

  edit(){
    var formData = this.contratForm.value;
    var data = {
      id: this.dialogData.data.id,
      modelev: formData.modelev ,
      type: formData.type ,
      dureeGarantie: formData.dureeGarantie ,
      km: formData.km ,
      puht: formData.puht,
      puttc: formData.puttc
    };
   
    this.contratService.update(data).subscribe((response:any)=>{
      this.dialogRef.close();
      this.onEditContrat.emit();
      this.responseMessage = response.message;
      this.snackbarService.openSnackBar(this.responseMessage, "success");
    },(error:any)=>{
      this.dialogRef.close();
      console.error(error);
      if(error.error?.message){
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
     });
  }


  
  }