import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BestSellerComponent } from './best-seller/best-seller.component';

import { HomeComponent } from './home/home.component';
import { FullComponent } from './layouts/full/full.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from './shared/shared.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import { NgxUiLoaderConfig, NgxUiLoaderModule } from 'ngx-ui-loader';
import { LoginComponent } from './login/login.component';
import { ToekenInterceptorInterceptor } from './services/toeken-interceptor.interceptor';
import {MatGridListModule} from '@angular/material/grid-list';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ContrastComponent } from '@progress/kendo-angular-inputs/colorpicker/contrast.component';
import { TopWidgettsComponent } from './top-Widgetts/top-widgetts.component';
import { TopThreeContractsComponent } from './top-three-contracts/top-three-contracts.component';
import { ContratByDemandeComponent } from './contrat-by-demande/contrat-by-demande.component';





const ngxUiLoaderConfig: NgxUiLoaderConfig={
  text:"Loading...",
  textColor:"#A9A9A9",
  textPosition:"center-center",
  bgsColor:"#A9A9A9",
  fgsColor:"#A9A9A9",
  fgsType:"ball-spin-clockwise",
  fgsSize:100,
  hasProgressBar:false
}

@NgModule({
  declarations: [
    AppComponent,
    BestSellerComponent,
    HomeComponent,
    FullComponent,
    AppSidebarComponent,
    AppHeaderComponent,
    SignupComponent,
    LoginComponent,
    TopWidgettsComponent,
    TopThreeContractsComponent,
    ContratByDemandeComponent   
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    SharedModule,
    HttpClientModule,
    MatButtonToggleModule,
    MatSlideToggleModule, 
    MatGridListModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    DropDownsModule
  ],
  providers: [HttpClientModule, {provide:HTTP_INTERCEPTORS, useClass:ToekenInterceptorInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
