
import { Injectable } from '@angular/core';
 
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
 

 
@Injectable()
export class HTTPService {
 
  baseURL: string = "http://localhost:8080";
 
  constructor(private http: HttpClient) {
  }
 
  getRepos(repos: string): Observable<any> {
    return this.http.get(this.baseURL + '/' + repos)
  }

  postdata(file: any, repos: string): Observable<any> {
    const headers = { 'content-type': 'application/json'} 
    return this.http.post(this.baseURL + '/' + repos, file,{'headers':headers});
      
  }

 
}
