import {Component, Input, OnInit} from '@angular/core';
import {UserModel} from "../../../models/user.model";
import {AuthenticatedUserService} from "../../../services/authenticated-user.service";

@Component({
  selector: 'app-action-buttons',
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.css']
})

export class ActionButtonsComponent implements OnInit {

  BLOCKED_USER_USER_TYPE_ID = 4;

  @Input() token: string;
  currentUser: UserModel;
  isAddEventClicked = false;
  isSignalZoneClicked = false;

  constructor(private authenticatedUserService: AuthenticatedUserService) {
  }

  async ngOnInit(): Promise<void> {
    await this.initUser();
  }

  async initUser() {
    if (await this.authenticatedUserService.getCurrentUser()) {
      await this.authenticatedUserService.loadCurrentUser();
      this.currentUser = await this.authenticatedUserService.getCurrentUser();
    } else {
      this.currentUser = await this.authenticatedUserService.getCurrentUser();
    }
  }

  onIsAddEventClicked() {
    this.isSignalZoneClicked = false;
    this.isAddEventClicked = true;
  }

  onIsSignalZoneClicked() {
    this.isSignalZoneClicked = true;
    this.isAddEventClicked = false;
  }

  isSignalZoneClickedClosed(value: boolean) {
    this.isSignalZoneClicked = value;
  }

}
