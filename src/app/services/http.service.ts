import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpService {

	private API: string = 'https://mighty-refuge-81707.herokuapp.com/api/';

	constructor(private http: HttpClient) { }

  	buildGetRequest(uri, params?) {
  		let httpOptions = this.getHttpOptions();

    	return this.http
      		.get(this.API + uri, httpOptions)
      		.pipe(catchError(this.handleError));
  	}

  	buildPostRequest(uri, data) {
  		let httpOptions = this.getHttpOptions();

    	return this.http
      		.post(this.API + uri, data, httpOptions)
      		.pipe(catchError(this.handleError));
  	}

  	buildPutRequest(uri, data) {
  		let httpOptions = this.getHttpOptions();

    	return this.http
      		.put(this.API + uri, data, httpOptions)
      		.pipe(catchError(this.handleError));
  	}

  	buildDeleteRequest(uri, id) {
  		let httpOptions = this.getHttpOptions();

    	return this.http
      		.delete(this.API + uri + id, httpOptions)
      		.pipe(catchError(this.handleError));
  	}

  	getHttpOptions(){
  		let token = sessionStorage.getItem('token');

  		if(token){
	  		var httpOptions: any = {
			  	headers: new HttpHeaders({
			    	'Content-Type': 'application/json',
			    	'x-access-token': token
			  	})
			};
        	
        	return httpOptions;
		}else{
			var httpOptions: any = {
			  	headers: new HttpHeaders({
			    	'Content-Type': 'application/json'
			  	})
			};

			return httpOptions;
		}
  
  	}

  	private handleError(error: HttpErrorResponse) {
	    if(error && error.status == 401)
	      return new ErrorObservable({ message: 'Tu sesión ha expirado o no tienes permisos para realizar esta acción.' });
	    else if(error && error.status == 404)
	      return new ErrorObservable(error.error);
	    else if(error && error.status == 500)
	      return new ErrorObservable({ message: 'Ocurrió un problema con el servidor.' });
	    else 
	      return new ErrorObservable(error.error);
  	}

}