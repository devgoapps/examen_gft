import { Injectable } from '@angular/core';

import swal from 'sweetalert2';

@Injectable()
export class SweetAlertService {

  	constructor() { }

  	success(title, text, callback?) {
        let options: any = {
            type : 'success',
            title : title,
            onOpen: function(){
                swal.hideLoading();
            }
        };
        if(text) options.text = text;

        if(callback){
          	swal(options).then(function (result){
            	callback();
          	});
        }else {
          	swal(options);
        }
    }

    warning(title, text, callback?) {
        let options: any = {
            type : 'warning',
            title : title,
            onOpen: function(){
                swal.hideLoading();
            }
        };

        if(text) options.text = text;

        if(callback){
          	swal(options).then(function (result){
            	callback();
          	});
        }else {
          	swal(options);
        }
    }

    error(title?, text?) {
        let options: any = {
            type : 'error',
            title : title,
            text : text || 'Intente de nuevo más tarde',
            confirmButtonText: 'Aceptar',
            onOpen: function(){
                swal.hideLoading();
            }
        };

        swal(options);
    }

    loading(title?, text?) {
        let options: any = {
            title : title || 'Cargando...',
            allowOutsideClick : false,
            allowEscapeKey : false,
            onOpen: function(){
                swal.showLoading();
            }
        };

        if(text) options.text = text;
        swal(options);
    }

    confirm(title, text, callbackConfirm?) {
        let options: any = {
              type: 'warning',
              title : title || 'Confirmación',
              text : text || '¿Está seguro de realizar esta acción?',
              allowOutsideClick : false,
              showCancelButton: true,
              confirmButtonText: 'Aceptar',
              cancelButtonText: 'Cancelar',
              allowEscapeKey : true,
              reverseButtons: true
          };

        swal(options).then(function (result){
            if (result.value)
                callbackConfirm(result);
            else
                callbackConfirm({ value: false });
        });
    }

    close() {
        swal.close();
    }
}
