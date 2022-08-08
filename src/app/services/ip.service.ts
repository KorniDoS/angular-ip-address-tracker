import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class IpService {

  apiCountry_City = environment.apiCountry_City;
  apiBaseUrl:string = environment.apiBaseUrl;
  apiKey: string = environment.apiKey;
  constructor(private http: HttpClient) { }


  getClientIp(): Observable<any>{
    return this.http.get<any>(this.apiBaseUrl + this.apiKey);
  }

  getClientRegion(ipAddress: any): Observable<any>{
    return this.http.get<any>(this.apiCountry_City + this.apiKey + '&ipAddress=' + ipAddress );
  }

  searchCustomIp(ipAddress: any): Observable<any>{
    return this.http.get<any>(this.apiCountry_City + this.apiKey + '&ipAddress=' + ipAddress);
  }


  searchCustomDomain(domain: any): Observable<any>{
    return this.http.get<any>(this.apiCountry_City + this.apiKey + '&domain=' + domain);
  }


}
