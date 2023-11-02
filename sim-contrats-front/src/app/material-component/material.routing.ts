import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { RouteGuardService } from '../services/route-guard.service';

import { ManageContratComponent } from './manage-contrat/manage-contrat.component';
import { MangeDemandeComponent } from './mange-demande/mange-demande.component';


export const MaterialRoutes: Routes = [
    
    {
        path:'contrat',
        component:ManageContratComponent,
        canActivate:[RouteGuardService],
        data:{
            expectedRole: ['ADMIN']
        }
    },
    
    {
        path:'demande',
        component:MangeDemandeComponent,
        canActivate:[RouteGuardService],
        data:{
            expectedRole: ['ADMIN']
        }
    }
    
];
