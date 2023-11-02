import { Component,OnInit } from '@angular/core';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { DemandeService } from 'src/app/services/demande.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mange-demande',
  templateUrl: './mange-demande.component.html',
  styleUrls: ['./mange-demande.component.scss']
})
export class MangeDemandeComponent implements OnInit {

  displayedColumns: string[] = ['ddate','nom','prenom','tel','email','matricule','modelev', 'type','dureeGarantie', 'km', 'puht', 'puttc' ,'edit'];
  dataSource:any;
  responseMessage:any;
  fileHandle!: {
    file: File;
    url: SafeUrl;
  };
  constructor(private demandeService:DemandeService,
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
    this.demandeService.getDemande().subscribe((response:any)=>{
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


 

 

  handleDeleteAction(values:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data ={
      message: 'delete' ,
      confirmation : true
    };
    
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);

    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((response:any)=>{
      this.ngxService.start();
      this.deleteDemande(values.id);
      dialogRef.close();
    })

  }



  deleteDemande(id:any){
    this.demandeService.delete(id).subscribe((response:any)=>{
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


  



}

