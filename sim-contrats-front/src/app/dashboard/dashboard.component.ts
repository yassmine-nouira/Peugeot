import { Component,AfterViewInit} from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
import { GlobalConstants } from '../shared/global-constants';
import { Chart } from 'highcharts';
import { ContratService } from '../services/contrat.service';
import { DemandeService } from '../services/demande.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent  implements AfterViewInit {

	responseMessage:any;
	dmddata:any;
	cntdata:any;
	
	ngAfterViewInit() { }

	constructor(private dashboardService:DashboardService,
				private ngxService: NgxUiLoaderService,
				private snackbarService: SnackbarService,
				private contratService: ContratService,
				private demandeService: DemandeService) {

		this.ngxService.start();
		this.demandeData();
		this.contratData();

	}

	demandeData() {
		this.demandeService.getNBdemande().subscribe((response:any) => { 
			this.ngxService.stop();
			this.dmddata = response;
		},(error:any)=> {
			this.ngxService.stop();
			console.log(error);
			if(error.error?.message){
				this.responseMessage = error.error?.message;
			}
			else{
				this.responseMessage = GlobalConstants.genericError;
			}
			this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
		}
		)
	}

	contratData() {
		this.contratService.getNBcontrat().subscribe((response:any) => { 
			this.ngxService.stop();
			this.cntdata = response;
		},(error:any)=> {
			this.ngxService.stop();
			console.log(error);
			if(error.error?.message){
				this.responseMessage = error.error?.message;
			}
			else{
				this.responseMessage = GlobalConstants.genericError;
			}
			this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
		}
		)
	}
		
		


}
