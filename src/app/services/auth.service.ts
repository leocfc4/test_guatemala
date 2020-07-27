import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private urlDesa = 'http://prueba.syncashop.com/';

  constructor(public http: HttpClient) {

   }

   loginApiLocal(data) {
    return this.http.post(this.urlDesa + "login", data)
      .map((results: Response) => results)
      .do((res: Response) => /*res*/ {
})
      .catch(this.handleError)
      ;

  }

  consultandoToken(){
    return this.http.get(this.urlDesa + "token")
    .map((results: Response) => results)
    .do((res: Response) => /*res*/ {
})
    .catch(this.handleError)
    ;
  }

  verListado(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json; charset=utf-8',
        'token': data
      })
    };

    return this.http.get(this.urlDesa + "promociones", httpOptions)
    .map((results: Response) => results)
    .do((res: Response) => /*res*/ console.log (res))
    .catch(this.handleError)
    ;

  }

  loadDetalle(id, data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json; charset=utf-8',
        'token': data
      })
    };

    return this.http.get(this.urlDesa + "promocion/"+id, httpOptions)
    .map((results: Response) => results)
    .do((res: Response) => /*res*/ console.log (res))
    .catch(this.handleError)
    ;

  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }
  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
