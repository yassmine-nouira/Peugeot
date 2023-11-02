import { Component,OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

import { ContratService } from '../services/contrat.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private dialog: MatDialog,
    private contratService:ContratService,
    private userService: UserService,
    private router: Router) { }

    ngOnInit(): void { }


  
   

 


}