import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiCalls {

  error: any;
  api_url: string = 'http://matrix-api.sapphirevirtual.com.ng/';

  constructor(public http: Http) {}

  apiCall(endpoints){
    return new Promise((resolve, reject) => {
      console.log(this.api_url+endpoints);
      this.http.get(this.api_url+endpoints)
        .map(res => res.json())
        .subscribe(
          data => {
            resolve(data)
          },
          err => {
            this.error = err;
            reject(err)
          }
        );
    });
  }

  runPricing(credentials) {
    return new Promise((resolve, reject) => {
      this.http.post(this.api_url+'pricing', credentials)
        .map(res => res.json())
        .subscribe(
          data => {
            resolve(data)
          },
          err => {
            this.error = err;
            reject(err)
          }
        );
    });
  }

  submitEvaluation(credentials) {
    return new Promise((resolve, reject) => {
      this.http.post(this.api_url+'submit', credentials)
        .map(res => res.json())
        .subscribe(
          data => {
            resolve(data)
          },
          err => {
            this.error = err;
            reject(err)
          }
        );
    });
  }

}
