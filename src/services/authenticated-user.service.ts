import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserModel} from "../models/user.model";
import {config} from "../config/pickthisup.config";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedUserService {

  constructor(private http: HttpClient) {
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public removeToken(): void {
    localStorage.removeItem('token');
  }

  public setToken(token: string): void {
    return localStorage.setItem('token', token);
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();
    return token !== undefined && token !== null;
  }

  public redirectToAuthentication(): void {
    this.logout();
  }

  public logout(): void {
    this.removeToken();
    this.removeCurrentUser();
    window.location.href = environment.authenticationUrl + '/logout';
  }

  public getCurrentUser(): Promise<UserModel> {
    return new Promise<UserModel>((resolve) => {
      setTimeout(() => {
        resolve(JSON.parse(localStorage.getItem('currentUser')));
      }, 0);
    });
  }

  public loadCurrentUser(): Promise<UserModel | undefined> {
    return new Promise((resolve, reject) => this.http.get(config.URL + "/user/getUserByToken/" + this.getToken(), {
        headers: {
          'Authorization': `Bearer ${this.getToken()}`,
          'content-type': 'application/json'
        },
        responseType: 'json',
        observe: 'response'
      })
      .subscribe(
        async (data) => {
          if (data.status === 204) {
            resolve;
          } else if (data.body) {
            localStorage.setItem('currentUser', JSON.stringify(data.body as UserModel));
            resolve(data.body as UserModel);
          } else {
            reject;
          }
        },
        (error) => {
          if (error.status === 401 || error.status === 403) {
            this.redirectToAuthentication();
          } else {
            reject(error);
          }
        },
        reject
      )
    );
  }

  public removeCurrentUser(): void {
    localStorage.removeItem('currentUser');
  }

  public async isCurrentUserLoaded(): Promise<boolean> {
    const currentUser = await this.getCurrentUser();
    return currentUser !== undefined && currentUser !== null;
  }
}
