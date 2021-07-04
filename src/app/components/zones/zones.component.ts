import {AfterViewInit, Component, OnInit} from '@angular/core';
import {UserModel} from "../../../models/user.model";
import {ZoneModel} from "../../../models/zone.model";
import {MediaModel} from "../../../models/media.model";
import {Router} from "@angular/router";
import {AuthenticatedUserService} from "../../../services/authenticated-user.service";
import {ZoneService} from "../../../services/zone.service";

@Component({
  selector: 'app-zones',
  templateUrl: './zones.component.html',
  styleUrls: ['./zones.component.css']
})
export class ZonesComponent implements OnInit, AfterViewInit {
  token: string;
  currentUser: UserModel;

  zones: ZoneModel[] = [];

  isZoneDetailVisible = false;
  visibleZone: ZoneModel;

  zonePictures: MediaModel[];

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  selectedZone: ZoneModel;

  isLoadedData: boolean;

  constructor(private router: Router,
              private authenticatedUserService: AuthenticatedUserService,
              private zoneService : ZoneService) {}

  async ngOnInit() {
    this.initToken();
    await this.initCurrentUser();
    if (this.currentUser === null || this.currentUser === undefined) {
      this.authenticatedUserService.loadCurrentUser().then(async () => {
        await this.initCurrentUser();
        window.location.reload();
      });
    }
    this.zones = await this.zoneService.getAvailableZones();
    this.isLoadedData = true;
  }

  async ngAfterViewInit() {
    if (!this.authenticatedUserService.isAuthenticated()) {
      this.authenticatedUserService.redirectToAuthentication();
    }
  }

  initToken() {
    this.token = this.authenticatedUserService.getToken();
  }

  async initCurrentUser() {
    this.currentUser = await this.authenticatedUserService.getCurrentUser();
  }

  async onZoneDetailClicked(zone: ZoneModel): Promise<void> {
    this.isZoneDetailVisible = true;
    this.visibleZone = zone;
    this.zonePictures = [];
    this.zonePictures = await this.getPicturesOfZone(zone);
  }

  getPicturesOfZone(zone: ZoneModel): Promise<MediaModel[]> {
    return this.zoneService.getPicturesZone(zone.zoneId)
      .then(function (pictures) {
        return pictures;
      });
  }
}
