import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuardService implements CanActivate {

  	constructor(private router: Router) { }

 	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
	    
	    if (route.routeConfig.path === 'login') {
	      	return true;
	    }

	    let token = sessionStorage.getItem('token');
	    if (token) {
	    	return true;
	    }

	    this.router.navigate(['login']);
	    return false;
    }
}