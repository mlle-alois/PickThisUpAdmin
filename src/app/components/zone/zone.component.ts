import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserModel} from "../../../models/user.model";
import {MediaModel} from "../../../models/media.model";
import {ZoneService} from "../../../services/zone.service";
import {EventModel} from "../../../models/event.model";
import {MyDate} from "../../../utils/MyDate";
import {CarpoolModel} from "../../../models/carpool.model";
import {EventService} from "../../../services/event.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {CarpoolService} from "../../../services/carpool.service";
import {DateUtils} from "../../../utils/DateUtils";
import {ZoneModel} from "../../../models/zone.model";

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.css']
})
export class ZoneComponent implements OnInit {

  @Input() zone: ZoneModel;

  @Input() currentUser: UserModel;

  visibleZone: ZoneModel;

  currentTimestamp: MyDate;

  isZoneDetailVisible = false;

  zonePictures: MediaModel[];

  @Output() isZonesHasChanged = new EventEmitter<void>();

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

  constructor(
    private eventService: EventService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private carpoolService: CarpoolService,
    private zoneService: ZoneService) {
  }

  ngOnInit(): void {
    this.currentTimestamp = DateUtils.getCurrentDate();
  }

  async onZoneDetailClicked(zone: ZoneModel): Promise<void> {
    this.isZoneDetailVisible = true;
    this.visibleZone = zone;
    this.zonePictures = [];
    this.zonePictures = await this.getPicturesOfZone(zone);
  }

  async onZoneAcceptClicked(zone: ZoneModel, e: Event): Promise<void> {
    this.confirmationService.confirm({
      target: e.target,
      message: 'Voulez-vous vraiment accepter ce signalement ?',
      icon: 'pi pi-check',
      accept: async () => {
        await this.zoneService.acceptZone(zone.zoneId);
        this.messageService.add({severity: 'success', summary: 'Accepté', detail: 'Signalement accepté'});
        this.eventsHasChanged();
      }
    });
  }

  async onZoneRefuseClicked(zone: ZoneModel, e: Event): Promise<void> {
    this.confirmationService.confirm({
      target: e.target,
      message: 'Voulez-vous vraiment refuser ce signalement ?',
      icon: 'pi pi-times',
      accept: async () => {
        await this.zoneService.refuseZone(zone.zoneId);
        this.messageService.add({severity: 'success', summary: 'Refusé', detail: 'Signalement refusé'});
        this.eventsHasChanged();
      }
    });
  }

  getPicturesOfZone(zone: ZoneModel): Promise<MediaModel[]> {
    return this.zoneService.getPicturesZone(zone.zoneId)
      .then(function (pictures) {
        return pictures;
      });
  }

  getParticipantsOfEvent(event: EventModel): Promise<UserModel[]> {
    return this.eventService.getParticipantsEvents(event.eventId)
      .then(function (users) {
        return users;
      });
  }

  getParticipantsOfCarpool(carpool: CarpoolModel): Promise<UserModel[]> {
    return this.carpoolService.getCarpoolParticipants(carpool.carpoolId)
      .then(function (users) {
        return users;
      });
  }

  eventsHasChanged() {
    this.isZonesHasChanged.emit()
  }
}
