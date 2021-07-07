import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {EventModel} from "../../../models/event.model";
import {UserModel} from "../../../models/user.model";
import {MyDate} from "../../../utils/MyDate";
import {CarpoolModel} from "../../../models/carpool.model";
import {MediaModel} from "../../../models/media.model";
import {EventService} from "../../../services/event.service";
import {CarpoolService} from "../../../services/carpool.service";
import {ZoneService} from "../../../services/zone.service";
import {DateUtils} from "../../../utils/DateUtils";

@Component({
  selector: 'app-my-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  @Input() event: EventModel;

  @Input() currentUser: UserModel;

  isUpdateEventClickedValue: boolean;

  visibleEvent: EventModel;

  currentTimestamp: MyDate;

  isEventDetailVisible = false;
  eventParticipants: UserModel[];

  eventCarpools: CarpoolModel[];
  carpoolParticipants: UserModel[];

  isCarpoolDetailVisible = false;
  visibleCarpool: CarpoolModel;

  eventPictures: MediaModel[];

  @Output() isEventsHasChanged = new EventEmitter<void>();

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

  async onEventDetailClicked(event: EventModel): Promise<void> {
    this.isEventDetailVisible = true;
    this.visibleEvent = event;
    this.eventParticipants = await this.getParticipantsOfEvent(event);
    this.eventCarpools = await this.getCarpoolsOfEvent(event);
    this.eventPictures = [];
    this.eventPictures = await this.getPicturesOfEvent(event);
  }

  async onEventUpdateClicked(event: EventModel): Promise<void> {
    this.isUpdateEventClickedValue = true;
    this.visibleEvent = event;
    this.eventPictures = [];
    this.eventPictures = await this.getPicturesOfEvent(event);
  }

  async onEventDeleteClicked(event: EventModel, e: Event): Promise<void> {
    this.confirmationService.confirm({
      target: e.target,
      message: 'Voulez-vous vraiment supprimer cet événement ?',
      icon: 'pi pi-users',
      accept: async () => {
        await this.eventService.deleteEvent(event.eventId);
        this.messageService.add({severity: 'success', summary: 'Supprimé', detail: 'Suppression effectuée'});
        this.eventsHasChanged();
      }
    });
  }

  getCarpoolsOfEvent(event: EventModel): Promise<CarpoolModel[]> {
    return this.carpoolService.getCarpoolsEvent(event.eventId)
      .then(function (carpools) {
        return carpools;
      });
  }

  getPicturesOfEvent(event: EventModel): Promise<MediaModel[]> {
    return this.zoneService.getPicturesZone(event.zone.zoneId)
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

  async onCarpoolDetailClicked(carpool: CarpoolModel): Promise<void> {
    this.isCarpoolDetailVisible = true;
    this.visibleCarpool = carpool;
    this.carpoolParticipants = await this.getParticipantsOfCarpool(carpool);
  }

  async isUpdateEventChange(event: boolean) {
    this.isUpdateEventClickedValue = event;
  }

  eventsHasChanged() {
    this.isEventsHasChanged.emit()
  }

}
