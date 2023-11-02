import { Component, OnInit } from '@angular/core';

import { ContratService } from '../services/contrat.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import { GlobalConstants } from '../shared/global-constants';
import { DemandeService } from '../services/demande.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-best-seller',
  templateUrl: './best-seller.component.html',
  styleUrls: ['./best-seller.component.scss','../assets/css/uikit.min.css'
  ,'../assets/css/commons.1619420078634.css','../assets/css/global.20210423103310.css'
  ,'../assets/css/main1bcd.css','../assets/css/new-main-v13860.css','../assets/css/new-main1bcd.css'
  ,'../assets/css/main.css_v02.2021.01.css' ,'../assets/css/new-main.css_v02.2021.01.css'
]
})

export class BestSellerComponent implements OnInit {
 
  //contratForm:any = FormGroup;
  demandeForm:any = FormGroup;
  constructor(
     private formBuilder:FormBuilder,
    private contratService:ContratService,
    private demandeService: DemandeService,
    private ngxservice:NgxUiLoaderService)  {
      //localStorage.clear();
    }

  ngOnInit(): void {
    this.ModelevData();

    this.demandeForm = this.formBuilder.group({
      nom:[null,[Validators.required, Validators.pattern(GlobalConstants.fullnameRegex)]],
      prenom:[null,[Validators.required, Validators.pattern(GlobalConstants.fullnameRegex)]],
      tel:[null,[Validators.required, Validators.pattern(GlobalConstants.telRegex)]],
      email:[null,[Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
      matricule:[null,[Validators.required]]
  });

  }


  responseMessage:any;
  responsedata: any;
  handleSubmit(){
   // this.ngxservice.start();
    var formData = this.demandeForm.value;
    var data = {
      nom: formData.nom,
      prenom: formData.prenom,
      tel: formData.tel,
      email: formData.email,
      matricule: formData.matricule,
      modelev: this.mvtarget,
      dureeGarantie: this.dureetarget,
      km: this.ktarget,
      type: this.typetarget,
      puht: this.PUHT,
      puttc: this.PUTTC
    }
   
    this.demandeService.add(data).subscribe((response:any)=>{
      this.responsedata = response; 
      
     // this.ngxservice.stop();
    //  this.dialogRef.close();
    //if (this.responsedata != null) {}
      
    
    },(error: any)=>{

     // this.ngxservice.stop();
      
      alert("Il faut faire le calcule de service !");
    
   });

   this.demandeService.sendEmail(data).subscribe(
    response => {
      let res:any = response; 
      console.log(
        `👏 > 👏 > 👏 > 👏 is successfully register and mail has been sent and the message id is ${res.messageId}`
      );
   alert("mail sent !!")
   })
   
  }

  type:any=[];
  modelev:any=[];
  dureeGarantie:any=[];
  km:any=[];
 
  PUHT:any;
  PUTTC:any;
 
typetarget:any; 
mvtarget:any;
dureetarget:any;
ktarget:any;
//formdata = new form

hidedisplay:boolean=false;

onClick(){
  this.hidedisplay=!this.hidedisplay;
}

onSelectModelv(modele:any){
 // console.log(this.mvtarget);
  this.TypeData(modele.value);
  this.mvtarget=modele.value;
  this.ktarget='km';
   this.dureetarget='dureeGarantie';
   this.typetarget='type';
   this.hidedisplay=false;
 }

 onSelectType(type:any){
  // console.log(this.mvtarget);
   this.DureeGarantieData(this.mvtarget,type.value);
   this.typetarget=type.value;
   console.log(this.typetarget);
   //this.getTypeGarantieByName(this.typetarget);
   
   this.ktarget='km';
   this.dureetarget='dureeGarantie';
   this.hidedisplay=false;
  }

 onSelectDureeGarantie(duree:any){
  //console.log(garantie.target.value);
 
  this.KmData(this.mvtarget,this.typetarget,duree.value)
  this.dureetarget=duree.value;
  
  this.ktarget='km';
  this.hidedisplay=false;
 }

 onSelectKm(k:any){
  //console.log(km.target.value);
 
  this.ktarget=k.value;
  this.PUHTData(this.mvtarget,this.typetarget,this.dureetarget,this.ktarget);
  this.PUTTCData(this.mvtarget,this.typetarget,this.dureetarget,this.ktarget);
  this.hidedisplay=false;

 }

 

 onSelectAll(){
  this.ktarget='km';
 }

 ModelevData(){
  return this.contratService.getModeleV().subscribe((response:any)=>{
   this.modelev = response; })

 }

 TypeData(type:any){
  return this.contratService.getType(type).subscribe((response:any)=>{
   this.type = response; })

 }

  
  DureeGarantieData(model:any,type:any){
    return this.contratService.getDureeGarantie(model,type).subscribe((response:any)=>{
    this.dureeGarantie = response; })

  }
  KmData(model:any,type:any,dureeGarantie:any){
    return this.contratService.getKm(model,type,dureeGarantie).subscribe((response:any)=>{
      this.km = response; })

  }
  PUHTData(model:any,type:any,dureeGarantie:any,km:any){
    //console.log(typeGar,modele,garantie,km);
    return this.contratService.getPUHT(model,type,dureeGarantie,km).subscribe((response:any)=>{
      this.PUHT = response;
      if(response===null){
        this.PUHT='';
      }
      //console.log(this.tarif); 
    })

  }

  PUTTCData(model:any,type:any,dureeGarantie:any,km:any){
    //console.log(typeGar,modele,garantie,km);
    return this.contratService.getPUTTC(model,type,dureeGarantie,km).subscribe((response:any)=>{
      this.PUTTC = response;
      if(response===null){
        this.PUTTC='';
      }
      //console.log(this.tarif); 
    })

  }


  onLoadPart(){
    return 
  }






}
