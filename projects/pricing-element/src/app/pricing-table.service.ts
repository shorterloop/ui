import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PricingTableService {
  token: string;
  baseUrl = '';

  constructor(private http: HttpClient) {
    const host = document.location?.ancestorOrigins?.[0] || window.location?.hostname || '';

    const envConfigs = [
      { domain: 'localhost', key: 'devauthorization', baseUrl: 'http://localhost:3000' },
      { domain: 'qa.shorterloop.com', key: 'qaauthorization', baseUrl: 'https://qa-api.shorterloop.com' },
      { domain: 'dev.shorterloop.com', key: 'qaauthorization', baseUrl: 'https://qa-api.shorterloop.com' },
      { domain: 'app.shorterloop.com', key: 'prodauthorization', baseUrl: 'https://api.shorterloop.com' },
      { domain: 'shorterloop.com', key: 'prodauthorization', baseUrl: 'https://api.shorterloop.com' }
    ];

    const config = envConfigs.find(c => host.includes(c.domain)) || 
                   { key: 'authorization', baseUrl: 'http://localhost:3000' };

    this.baseUrl = `${config.baseUrl}/api`;
    this.token = this.getCookie(config.key);
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
    const headers = this.setHttpHeaders();

    const pricingUrl = '/v2/pricing-table/plan-details';
    const productsUrl = this.baseUrl + pricingUrl;
    // Make API call
    return this.http.get<any>(productsUrl, { headers });
  }
  
  getUsersDetails(): Observable<any> {
    // Retrieve values from localStorage safely
    const headers = this.setHttpHeaders();

    const url = '/users/profile';
    const usersUrl = this.baseUrl + url;
    // Make API call
    return this.http.get<any>(usersUrl, { headers });
  }

  requestEnterpriseAccess(formData: any): Observable<any> {
    // Retrieve values from localStorage safely
    const headers = this.setHttpHeaders();

    const enterpriseUrl = '/auth/upgrade-to-enterprise';
    const enterpriseRequestUrl = this.baseUrl + enterpriseUrl;
    // Make API call
    return this.http.post<any>(enterpriseRequestUrl,formData, { headers });
  }

  private setHttpHeaders() {
    const initiativeId = localStorage.getItem('selected-initiative');
    const subscriptionId = localStorage.getItem('subscriptionId');

    // Set up headers
    let headers = new HttpHeaders({
      Pragma: 'no-cache',
      'Cache-Control': 'no-cache',
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });

    // Append headers conditionally
    if (initiativeId)
      headers = headers.set('InitiativeId', JSON.parse(initiativeId));
    if (subscriptionId)
      headers = headers.set('subscriptionId', JSON.parse(subscriptionId));
    return headers;
  }

  getCustomerCurrentPlan() {
    const headers = this.setHttpHeaders();

    const subscriptionUrl = this.baseUrl + '/subscription';
    // Make API call
    return this.http.get<any>(subscriptionUrl, { headers });
  }

  upgradeDowngrade(data: any) {
    const headers = this.setHttpHeaders();

    const subscriptionUrl = this.baseUrl + '/upgrade-downgrade';
    return this.http.put(subscriptionUrl, data, { headers });
  }

  openCustomerPortal(switchTo: any) {
    const headers = this.setHttpHeaders();

    const subscriptionUrl = this.baseUrl + '/create-customer-portal-session';
    return this.http.post(
      subscriptionUrl,
      {
        plan: switchTo,
      },
      { headers },
    );
  }

  deleteStripeSubscription() {
    const headers = this.setHttpHeaders();

    const subscriptionUrl = this.baseUrl + '/subscription/plan';
    return this.http.delete(subscriptionUrl, { headers });
  }

  startMyTrial(plan: any) {
    const headers = this.setHttpHeaders();

    const subscriptionUrl = this.baseUrl + '/start-my-trial';
    return this.http.post(
      subscriptionUrl,
      {
        switchTo: plan,
      },
      { headers },
    );
  }
}
