import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { appConfig } from './../../helper/app.config';

import { Socket } from 'ng-socket-io';

import 'rxjs/operator/map';
import 'rxjs/operator/catch';

@Injectable()
export class LoginService {

  constructor(
    private socket:Socket,
    private _http:HttpClient
  ) { }

  HttpLoginUser(u){
    let obj={
      'email':u.name,
      'password':u.password
    }
    return this._http.post(appConfig.apiUrl+'/login',obj);
  }
}
