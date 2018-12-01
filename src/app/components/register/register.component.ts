import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { HttpService } from '../../services/http.service';
import { SweetAlertService } from '../../services/sweet-alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	public user: User = <User>{};
	public emailPattern: any = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,6})+$/;

	constructor(private httpService: HttpService,
  				private swaService: SweetAlertService,
  				private router: Router) { }

  	ngOnInit() { }

  	register(){
  		this.swaService.loading('Registrando usuario...');

  		this.httpService.buildPostRequest('auth/user/create', this.user)
  			.subscribe((data) => {
  				this.swaService.success('Usuario creado', 'El usuario se creo correctamente.', (ok) => {
					this.router.navigate(['login']);
				});
  			}, (error) => {
  				this.swaService.error('Ocurrió un problema', error.success);
  			});
  	}

  	goToLogin(){
  		this.router.navigate(['login']);
  	}

}

interface User {
	email: string,
	firstname: string,
	lastname: string,
	password: string
}
