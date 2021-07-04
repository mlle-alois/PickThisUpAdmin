import {Component, Input, OnInit} from '@angular/core';
import {UserModel} from "../../../models/user.model";
import {AuthenticatedUserService} from "../../../services/authenticated-user.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  @Input() token: string;
  currentUser: UserModel;

  constructor(private authenticatedUserService: AuthenticatedUserService) { }

  async ngOnInit() {
    await this.initCurrentUser();
    if (this.currentUser === null || this.currentUser === undefined) {
      this.authenticatedUserService.loadCurrentUser().then(async () => {
        await this.initCurrentUser();
        window.location.reload();
      });
    }
  }

  async initCurrentUser() {
    this.currentUser = await this.authenticatedUserService.getCurrentUser();
  }

}
