import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialRoutes } from './material.routing';
import { MaterialModule } from '../shared/material-module';
import { ViewBillProductsComponent } from './dialog/view-bill-products/view-bill-products.component';
import { ConfirmationComponent } from './dialog/confirmation/confirmation.component';

import { ManageUserComponent } from './manage-user/manage-user.component';
import {MatGridListModule} from '@angular/material/grid-list';


import { ManageContratComponent } from './manage-contrat/manage-contrat.component';
import { ContratComponent } from './dialog/contrat/contrat.component';
import { MangeDemandeComponent } from './mange-demande/mange-demande.component';

@NgModule({
  imports: [
    MatGridListModule,
    CommonModule,
    RouterModule.forChild(MaterialRoutes),
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule
  ],
  
  declarations: [
    ViewBillProductsComponent,
    ConfirmationComponent,
  
    ManageUserComponent,
    ManageContratComponent,
    ContratComponent,
    MangeDemandeComponent

  ],
  providers: []

})
export class MaterialComponentsModule {}
