import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';
import { HomeComponent } from './home/home.component';
import { RouteGuardService } from './services/route-guard.service';
import { LoginComponent } from './login/login.component';

const routes: Routes = [ { path: '', component: HomeComponent }, 

{
  path: 'admin',
  component: FullComponent,
  children: [
    {
      path: '',
      redirectTo: '/admin/dashboard',
      pathMatch: 'full',
      canActivate: [RouteGuardService],
      data: {
        expectedRole: ['ADMIN']
      }
    },
    {
      path: '',
      loadChildren:
        () => import('./material-component/material.module').then(m => m.MaterialComponentsModule),
        canActivate: [RouteGuardService],
        data: {
          expectedRole: ['ADMIN']
        }
    },
    {
      path: 'dashboard',
      loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
      canActivate: [RouteGuardService],
      data: {
        expectedRole: ['ADMIN']
      }
    }
  ]
},
//{ path: '**', component: HomeComponent },
{path:"login",component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
