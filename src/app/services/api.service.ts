import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, untracked } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public urlBase = '';
  public urlBaseU = '';
  getUsers: any;

  constructor(public http: HttpClient

  ) { 
    this.urlBase = environment.DOMAIN;
    this.urlBaseU = environment.DOMAIN_MOCKAPI;
  }

  //json 1
  getPr(rute: string): Promise<any> { 
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders({
        authorization: '',
        'Content-Type': 'aplication/json',
      });
      this.http.get(this.urlBase + rute, {headers}).subscribe({
        next: (resp) => {
          resolve(resp);
        }, 
        error: (err) => {
          reject(err);
        }
      });
    });
  }

  //json2
  getPro(rute: string, DOMAIN_MOCKAPI = false): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = DOMAIN_MOCKAPI ? this.urlBaseU + rute : this.urlBase + rute;
      const headers = new HttpHeaders({
        authorization: '',
        'Content-Type': 'application/json',
      });
      this.http.get(url, {headers}).subscribe({
        next: (resp) => {
          resolve(resp);
        }, 
        error: (err) => {
          reject(err);
        }
      });
    });
  }
  
  //json 1
  getOb(rute: string): Observable <any> {
    return this.http.get(this.urlBase + rute);
  } 

  //json 2 
  getObs(rute: string, DOMAIN_MOCKAPI = false): Observable<any> {
    const url2 = DOMAIN_MOCKAPI ? this.urlBaseU + rute : this.urlBase + rute;
    return this.http.get(url2);
  }
  
  //json 1 
  postPr(rute: string, data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.urlBase + rute, data).subscribe({
        next: (resp) => { resolve(resp);
        }, error: (err) => { reject(err);
        }
      });
    });
  }

  //json 2
  postPro(rute: string, data: any, DOMAIN_MOCKAPI = false): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = DOMAIN_MOCKAPI ? this.urlBaseU + rute : this.urlBase + rute;
      this.http.post(url, data).subscribe({
        next: (resp) => { resolve(resp); },
        error: (err) => { reject(err); }
      });
    });
  }
  
  //json 1
  postOb(rute: string, data: any): Observable <any> {
    return this.http.post(this.urlBase + rute, data);
  }

  //json 2
  postObs(rute: string, data: any, DOMAIN_MOCKAPI = false): Observable<any> {
    const url2 = DOMAIN_MOCKAPI ? this.urlBaseU + rute : this.urlBase + rute;
    return this.http.post(url2, data);
  }

  //json 1
  putPr(rute: string, data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(this.urlBase + rute, data).subscribe({
        next: (resp) => {
          resolve(resp);
        }, 
        error: (err) => {
          reject(err);
        }
      });
    });
  }

  //json 2
  putPro(rute: string, data: any, DOMAIN_MOCKAPI = false): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = DOMAIN_MOCKAPI ? this.urlBaseU + rute : this.urlBase + rute;
      this.http.put(url, data).subscribe({
        next: (resp) => { resolve(resp); },
        error: (err) => { reject(err); }
      });
    });
  }
  
  //json 1
  putOb(rute: string, data: any): Observable <any> {
    return this.http.put(this.urlBase + rute, data);
  }
  
  //json 2 
  putObs(rute: string, data: any, DOMAIN_MOCKAPI = false): Observable<any> {
    const url = DOMAIN_MOCKAPI ? this.urlBaseU + rute : this.urlBase + rute;
    return this.http.put(url, data);
  }

  //json 1
  deletePr(rute: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.delete(this.urlBase + rute).subscribe({
        next: (resp) => {
          resolve(resp);
        }, 
        error: (err) => {
          reject(err);
        }
      });
    });
  }

  //json 2
  deletePro(rute: string, DOMAIN_MOCKAPI = false): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = DOMAIN_MOCKAPI ? this.urlBaseU + rute : this.urlBase + rute;
      this.http.delete(url).subscribe({
        next: (resp) => { resolve(resp); },
        error: (err) => { reject(err); }
      });
    });
  }
  
  //json 1
  deleteOb(rute: string): Observable <any> {
    return this.http.
    delete(this.urlBase + rute);
  }

  //json 2
  deleteObs(rute: string, DOMAIN_MOCKAPI = false): Observable<any> {
    const url = DOMAIN_MOCKAPI ? this.urlBaseU + rute : this.urlBase + rute;
    return this.http.delete(url);
  }

} 
  

  // patchPromise(rute: string, data: any): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     this.http.patch(this.urlBase + rute, data).subscribe({
  //       next: (resp) => {
  //         resolve(resp);
  //       }, 
  //       error: (err) => {
  //         reject(err);
  //       }
  //     });
  //   });
  // }

  // patchObservable(rute: string, data: any): Observable<any> {
  //   return this.http.patch(this.urlBase + rute, data);
  