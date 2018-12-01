import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { HttpService } from '../../services/http.service';
import { SweetAlertService } from '../../services/sweet-alert.service';

import * as jwt_decode from "jwt-decode";
declare var $: any;

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

	public account: Account = <Account>{};
	public accounts: Array<Account> = <Array<Account>> [];

	public userData: any = {};
	public accountTypes: Array<any> = <Array<any>> [];

  	constructor(private httpService: HttpService,
  				private swaService: SweetAlertService,
  				private router: Router) { }

  	ngOnInit() { 
  		let token = sessionStorage.getItem('token');
  		if(token)
  			this.userData = jwt_decode(token);
  		
  		this.getAccounts();
  		this.getAccountTypes();
  	}

  	getAccounts(){
  		this.swaService.loading('Obteniendo cuentas...');

  		this.httpService.buildGetRequest('accounts', { })
  			.subscribe((data) => {
  				this.accounts = data.response;

  				this.swaService.close();
  			}, (error) => {
  				this.swaService.error('Ocurrió un problema', error.success);
  			});
  	}

  	createAccount(){
  		this.swaService.loading('Creando cuenta...');

  		this.account.userId = this.userData.id;

  		this.httpService.buildPostRequest('accounts', this.account)
  			.subscribe((data) => {

  				this.swaService.success('Cuenta creada', 'La cuenta se creo correctamente, favor de esperar 24 hrs. para su aprovación.');
  			}, (error) => {
  				this.swaService.error('Ocurrió un problema', error.success);
  			});
  	}

  	getAccountTypes(){
  		this.httpService.buildGetRequest('catalogs/cards', { })
  			.subscribe((data) => {
  				this.accountTypes = data.response.type_cards;

  				this.swaService.close();
  			}, (error) => {
  				this.swaService.error('Ocurrió un problema', error.success);
  			});
  	}

  	cancel(){
  		this.account = <Account> {};

  		$('form')[0].reset();
  	}

  	goToLogin(){
  		sessionStorage.clear();
  		this.router.navigate(['login']);
  	}
}

interface Account {
	_id: string,
	name: string,
	type: string,
	userId: string,
	deposits: number,
	withdrawals: number,
	balance: number
}
