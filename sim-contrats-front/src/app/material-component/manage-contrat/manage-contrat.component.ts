import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ContratService } from 'src/app/services/contrat.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { ContratComponent } from '../dialog/contrat/contrat.component';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-manage-contrat',
  templateUrl: './manage-contrat.component.html',
  styleUrls: ['./manage-contrat.component.scss']
})
export class ManageContratComponent implements OnInit {

  displayedColumns: string[] = ['modelev', 'type','dureeGarantie', 'km', 'puht', 'puttc' ,'edit'];
  dataSource:any;
  responseMessage:any;
  fileHandle!: {
    file: File;
    url: SafeUrl;
  };
  constructor(private contratService:ContratService,
              private ngxService:NgxUiLoaderService,
              private dialog:MatDialog,
              private snackbarService:SnackbarService,
              private router:Router,
              private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.ngxService.start();
    this.tableData();
  }


  tableData(){
    this.contratService.getContrat().subscribe((response:any)=>{
      this.ngxService.stop();
      this.dataSource = new MatTableDataSource(response);
    },(error:any)=>{
      this.ngxService.stop();
      console.log(error.error?.message);
      if(error.error?.message){
        this.responseMessage  = error.error?.message;
      }
      else{
        this.responseMessage  = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }


  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  handleAddAction(){
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data ={
      action: 'Add'
    };
    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(ContratComponent, dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onAddContrat.subscribe((response:any)=>{
      this.tableData(); 
    })
  }

  handleEditAction(values:any){
    //allValues ={values,type_id:type.id}
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data ={
      action: 'Edit',
      data: values
    };
    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(ContratComponent, dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onEditContrat.subscribe((response:any)=>{
      this.tableData();
    })
  }


  handleDeleteAction(values:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data ={
      message: 'delete' ,
      confirmation : true
    };
    
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);

    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((response)=>{
      this.ngxService.start();
      this.deleteContrat(values.id);
      dialogRef.close();
    })

  }



  deleteContrat(id:any){
    this.contratService.delete(id).subscribe((response:any)=>{
      this.ngxService.stop();
      this.tableData();
      this.responseMessage = response?.message;
      this.snackbarService.openSnackBar(this.responseMessage,"success");
    },(error:any)=>{
      this.ngxService.stop();
      console.log(error.error?.message);
      if(error.error?.message){
        this.responseMessage  = error.error?.message;
      }
      else{
        this.responseMessage  = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }


  onChange(status:any,id:any){
    this.ngxService.start();
    var data = {
      status: status.toString(),
      id:id
    }

    this.contratService.updateStatus(data).subscribe((response:any)=>{
      this.ngxService.stop();
      this.responseMessage  = response?.message;
      this.snackbarService.openSnackBar(this.responseMessage,"success");
    },(error:any)=>{
      this.ngxService.stop();
      console.log(error.error?.message);
      if(error.error?.message){
        this.responseMessage  = error.error?.message;
      }
      else{
        this.responseMessage  = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }

  xlsxImport(event:any){
    console.log(event.target.files[0].name);
    console.log(event.target.files[0]);

   const  file =  event.target.files[0];
    this.fileHandle={
      file : file,
      url : this.sanitizer.bypassSecurityTrustUrl(
        window.URL.createObjectURL(file)
      )
    }
   

  }


  handleImport(){
    const formData = new FormData();
    formData.append('file',
      this.fileHandle.file,
      this.fileHandle.file.name);
   // this.contratService.exceltodatabse(event.target.files[0].name);
   // this.ngxService.start();
    //var data = event.target.files[0];

    this.contratService.exceltodatabse(formData).subscribe((response:any)=>{
    //  this.ngxService.stop();
      this.responseMessage  = response?.message;
      this.snackbarService.openSnackBar(this.responseMessage,"success");
    },(error:any)=>{
    //  this.ngxService.stop();
      console.log(error.error?.message);
      if(error.error?.message){
        this.responseMessage  = error.error?.message;
      }
      else{
        this.responseMessage  = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }


}

