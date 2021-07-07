import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticatedUserService} from "../services/authenticated-user.service";
import {UserModel} from "../models/user.model";
import {UserType} from "../enum/user-type";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit {

  token: string;
  currentUser: UserModel;

  constructor(private router: Router, private route: ActivatedRoute, private authenticatedUserService: AuthenticatedUserService) {
  }

  async ngOnInit() {
    this.initToken();
    await this.initCurrentUser();
    this.currentUser = await this.authenticatedUserService.getCurrentUser();
    if(this.currentUser.typeId === UserType.BlockedUser || this.currentUser.typeId === UserType.User) {
      this.authenticatedUserService.redirectToAuthentication();
    }
  }

  ngAfterViewInit() {
    if(!this.authenticatedUserService.isAuthenticated()) {
      this.authenticatedUserService.redirectToAuthentication();
    }
  }

  initToken() {
    if(!this.authenticatedUserService.getToken()) {
      this.route.queryParams.subscribe(params => {
        this.token = params['token'];
        this.authenticatedUserService.setToken(this.token);
      });
    }
    else {
      this.token = this.authenticatedUserService.getToken();
    }
  }

  async initCurrentUser() {
    if (!await this.authenticatedUserService.isCurrentUserLoaded()) {
      await this.authenticatedUserService.loadCurrentUser();
    }
  }
}
