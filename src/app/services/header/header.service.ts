import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { appConfig } from './../../helper/app.config';

import 'rxjs/operator/map';
import 'rxjs/operator/catch';

@Injectable()
export class HeaderService {

  constructor(
    private _http:HttpClient
  ) { }

  // LOGOUT USER
  HttpOnLogout(){
    let obj = {
      'token':(localStorage.getItem('currentUser').split(','))[0]
    };
    return this._http.post(appConfig.apiUrl+'/logout',obj);
  }

}
