import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { HttpService } from '../../services/http.service';
import { SweetAlertService } from '../../services/sweet-alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	public credentials: Login = <Login>{};
	public emailPattern: any = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,6})+$/;

  	constructor(private httpService: HttpService,
  				private swaService: SweetAlertService,
  				private router: Router) { }

  	ngOnInit() { }

  	login(){
  		this.swaService.loading('Iniciando sesión...');

  		this.httpService.buildPostRequest('auth/user/authenticate', this.credentials)
  			.subscribe((data) => {
  				sessionStorage.setItem('token', data.token);
  				
  				this.router.navigate(['accounts']);
  			}, (error) => {
  				this.swaService.error('Ocurrió un problema', error.success);
  			});
  	}

  	goToRegister(){
  		this.router.navigate(['register']);
  	}

}

interface Login {
	email: string,
	password: string
}

