import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthenticatedUserService} from "./authenticated-user.service";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private authenticatedUserService: AuthenticatedUserService,
              private httpClient: HttpClient) {
  }

  get<T>(url: string): Promise<T | undefined> {
    return new Promise((resolve, reject) =>
      this.httpClient.get(url, {
        headers: {
          'Authorization': `Bearer ${this.authenticatedUserService.getToken()}`,
          'content-type': 'application/json'
        },
        responseType: 'json',
        observe: 'response'
      })
        .subscribe(
          (data) => {
            if (data.status === 204) {
              resolve;
            } else if (data.body) {
              resolve(data.body as T);
            } else {
              reject;
            }
          },
          (error) => {
            if (error.status === 401 || error.status === 403) {
              this.authenticatedUserService.redirectToAuthentication();
            } else {
              reject(error);
            }
          }
        )
    );
  }

  getAll<T>(url: string): Promise<T[]> {
    return new Promise((resolve, reject) => this.httpClient.get(url, {
        headers: {
          'Authorization': `Bearer ${this.authenticatedUserService.getToken()}`,
          'content-type': 'application/json'
        },
        responseType: 'json',
        observe: 'response'
      })
        .subscribe(
          (data) => {
            if (data.status === 204) {
              resolve([]);
            } else if (data.body) {
              let res = data.body as T[];
              res = res.map(function (res) {
                return res;
              })
              resolve(res);
            } else {
              reject([]);
            }
          },
          (error) => {
            if (error.status === 401 || error.status === 403) {
              this.authenticatedUserService.redirectToAuthentication();
            } else {
              reject(error);
            }
          }
        )
    );
  }

  post<T>(url: string, body?: any): Promise<T> {
    return new Promise((resolve, reject) => this.httpClient.post(url,body ? body : {}, {
        headers: {
          'Authorization': `Bearer ${this.authenticatedUserService.getToken()}`,
          'content-type': 'application/json'
        },
        responseType: 'json',
        observe: 'response'
      })
        .subscribe(
          (data) => {
            if (data.status === 204) {
              resolve;
            } else if (data.body) {
              resolve(data.body as T);
            } else {
              reject;
            }
          },
          (error) => {
            if (error.status === 401 || error.status === 403) {
              this.authenticatedUserService.redirectToAuthentication();
            } else {
              reject(error);
            }
          }
        )
    );
  }

  postMultiRes<T>(url: string, body?: any): Promise<T[]> {
    return new Promise((resolve, reject) => this.httpClient.post(url,body ? body : {}, {
        headers: {
          'Authorization': `Bearer ${this.authenticatedUserService.getToken()}`,
          'content-type': 'application/json'
        },
        responseType: 'json',
        observe: 'response'
      })
        .subscribe(
          (data) => {
            if (data.status === 204) {
              resolve([]);
            } else if (data.body) {
              let res = data.body as T[];
              res = res.map(function (res) {
                return res;
              })
              resolve(res);
            } else {
              reject([]);
            }
          },
          (error) => {
            if (error.status === 401 || error.status === 403) {
              this.authenticatedUserService.redirectToAuthentication();
            } else {
              reject(error);
            }
          }
        )
    );
  }

  put<T>(url: string, body?: any): Promise<T> {
    return new Promise((resolve, reject) => this.httpClient.put(url,body ? body : {}, {
        headers: {
          'Authorization': `Bearer ${this.authenticatedUserService.getToken()}`,
          'content-type': 'application/json'
        },
        responseType: 'json',
        observe: 'response'
      })
        .subscribe(
          (data) => {
            if (data.status === 204) {
              resolve;
            } else if (data.body) {
              resolve(data.body as T);
            } else {
              reject;
            }
          },
          (error) => {
            if (error.status === 401 || error.status === 403) {
              this.authenticatedUserService.redirectToAuthentication();
            } else {
              reject(error);
            }
          }
        )
    );
  }

  putMultiRes<T>(url: string, body?: any): Promise<T[]> {
    return new Promise((resolve, reject) => this.httpClient.put(url,body ? body : {}, {
        headers: {
          'Authorization': `Bearer ${this.authenticatedUserService.getToken()}`,
          'content-type': 'application/json'
        },
        responseType: 'json',
        observe: 'response'
      })
        .subscribe(
          (data) => {
            if (data.status === 204) {
              resolve([]);
            } else if (data.body) {
              let res = data.body as T[];
              res = res.map(function (res) {
                return res;
              })
              resolve(res);
            } else {
              reject([]);
            }
          },
          (error) => {
            if (error.status === 401 || error.status === 403) {
              this.authenticatedUserService.redirectToAuthentication();
            } else {
              reject(error);
            }
          }
        )
    );
  }

  delete<T>(url: string): Promise<T> {
    return new Promise((resolve, reject) => this.httpClient.delete(url, {
        headers: {
          'Authorization': `Bearer ${this.authenticatedUserService.getToken()}`,
          'content-type': 'application/json'
        },
        responseType: 'json',
        observe: 'response'
      })
        .subscribe(
          (data) => {
            if (data.body) {
              resolve(data.body as T);
            } else {
              reject;
            }
          },
          (error) => {
            if (error.status === 401 || error.status === 403) {
              this.authenticatedUserService.redirectToAuthentication();
            } else {
              reject(error);
            }
          }
        )
    );
  }

  deleteMultiRes<T>(url: string): Promise<T[]> {
    return new Promise((resolve, reject) => this.httpClient.delete(url, {
        headers: {
          'Authorization': `Bearer ${this.authenticatedUserService.getToken()}`,
          'content-type': 'application/json'
        },
        responseType: 'json',
        observe: 'response'
      })
        .subscribe(
          (data) => {
            if (data.status === 204) {
              resolve([]);
            } else if (data.body) {
              let res = data.body as T[];
              res = res.map(function (res) {
                return res;
              })
              resolve(res);
            } else {
              reject([]);
            }
          },
          (error) => {
            if (error.status === 401 || error.status === 403) {
              this.authenticatedUserService.redirectToAuthentication();
            } else {
              reject(error);
            }
          }
        )
    );
  }

}
