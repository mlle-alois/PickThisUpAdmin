import {AfterViewInit, Component, OnInit} from '@angular/core';
import {UserModel} from "../../../models/user.model";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticatedUserService} from "../../../services/authenticated-user.service";
import {MyDate} from "../../../utils/MyDate";
import {DateUtils} from "../../../utils/DateUtils";
import {ZoneModel} from "../../../models/zone.model";
import {ZoneService} from "../../../services/zone.service";

@Component({
  selector: 'app-zones',
  templateUrl: './zones.component.html',
  styleUrls: ['./zones.component.css']
})
export class ZonesComponent implements OnInit, AfterViewInit {

  token: string;
  currentUser: UserModel;

  validatedZones: ZoneModel[] = [];
  refusedZones: ZoneModel[] = [];
  waitingZones: ZoneModel[] = [];

  currentTimestamp: MyDate;

  isLoadedData: boolean;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private authenticatedUserService: AuthenticatedUserService,
              private zoneService: ZoneService) {
  }

  async ngOnInit() {
    this.initToken();
    await this.initCurrentUser();
    await this.initZones();
    this.currentTimestamp = DateUtils.getCurrentDate();
    this.isLoadedData = true;
  }

  async ngAfterViewInit() {
    if (!this.authenticatedUserService.isAuthenticated()) {
      this.authenticatedUserService.redirectToAuthentication();
    }
  }

  async initZones() {
    this.isLoadedData = false;
    this.validatedZones = await this.zoneService.getValidatedZones();
    this.refusedZones = await this.zoneService.getRefusedZones();
    this.waitingZones = await this.zoneService.getWaitingZones();
    this.isLoadedData = true;
  }

  initToken() {
    this.token = this.authenticatedUserService.getToken();
  }

  async initCurrentUser() {
    this.currentUser = await this.authenticatedUserService.getCurrentUser();
  }
}
