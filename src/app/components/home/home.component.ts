import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserModel} from "../../../models/user.model";
import {EventModel} from "../../../models/event.model";
import {MyDate} from "../../../utils/MyDate";
import {AuthenticatedUserService} from "../../../services/authenticated-user.service";
import {EventService} from "../../../services/event.service";
import {DateUtils} from "../../../utils/DateUtils";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit, OnInit {

  token: string;
  currentUser: UserModel;

  validatedEvents: EventModel[] = [];
  refusedEvents: EventModel[] = [];
  waitingEvents: EventModel[] = [];

  currentTimestamp: MyDate;

  isLoadedData: boolean;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private authenticatedUserService: AuthenticatedUserService,
              private eventService: EventService) {
  }

  async ngOnInit() {
    this.initToken();
    await this.initCurrentUser();
    await this.initEvents();
    this.currentTimestamp = DateUtils.getCurrentDate();
    this.isLoadedData = true;
  }

  async ngAfterViewInit() {
    if (!this.authenticatedUserService.isAuthenticated()) {
      this.authenticatedUserService.redirectToAuthentication();
    }
  }

  async initEvents() {
    this.isLoadedData = false;
    this.validatedEvents = await this.eventService.getValidatedEvents();
    this.refusedEvents = await this.eventService.getRefusedEvents();
    this.waitingEvents = await this.eventService.getWaitingEvents();
    this.isLoadedData = true;
  }

  initToken() {
    this.token = this.authenticatedUserService.getToken();
  }

  async initCurrentUser() {
    this.currentUser = await this.authenticatedUserService.getCurrentUser();
  }
}
