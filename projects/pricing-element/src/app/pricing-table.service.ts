import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PricingTableService {
  apiUrl = '/api/v2/pricing-table/plan-details';
  token: string;

  constructor(private http: HttpClient) {
    let key = 'authorization';
    let endPoint = 'http://localhost:3000';
    if (window.location.hostname === 'localhost') {
      key = 'devauthorization';
    }
    if (window.location.hostname === 'qa.prodeasy.com') {
      key = 'qaauthorization';
      endPoint = 'https://qa-api.prodeasy.com';
    }
    if (window.location.hostname === 'app.shorterloop.com') {
      key = 'prodauthorization';
      endPoint = 'https://api.shorterloop.com';
    }
    this.apiUrl = endPoint + this.apiUrl;
    this.token = this.getCookie(key);
  }

  getCookie(cookieName: any) {
    const cookie: any = {};
    document.cookie.split(';').forEach(function (el) {
      const [key, value] = el.split('=');
      cookie[key.trim()] = value;
    });

    return cookie[cookieName];
  }

  getPlanDetails(): Observable<any> {
    // Retrieve values from localStorage safely
    const initiativeId = localStorage.getItem('selected-initiative');
    const subscriptionId = localStorage.getItem('subscriptionId');

    // Set up headers
    let headers = new HttpHeaders({
      'Pragma': 'no-cache',
      'Cache-Control': 'no-cache',
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });

    // Append headers conditionally
    if (initiativeId) headers = headers.set('InitiativeId', JSON.parse(initiativeId));
    if (subscriptionId) headers = headers.set('subscriptionId', JSON.parse(subscriptionId));

    // Make API call
    return this.http.get<any>(this.apiUrl, { headers });
  }
}
