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
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  @Input() event: EventModel;

  @Input() currentUser: UserModel;

  visibleEvent: EventModel;

  currentTimestamp: MyDate;

  isEventDetailVisible = false;

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
    this.eventPictures = [];
    this.eventPictures = await this.getPicturesOfEvent(event);
  }

  async onEventAcceptClicked(event: EventModel, e: Event): Promise<void> {
    this.confirmationService.confirm({
      target: e.target,
      message: 'Voulez-vous vraiment accepter cet événement ?',
      icon: 'pi pi-check',
      accept: async () => {
        await this.eventService.acceptEvent(event.eventId);
        this.messageService.add({severity: 'success', summary: 'Accepté', detail: 'Evenement accepté'});
        this.eventsHasChanged();
      }
    });
  }

  async onEventRefuseClicked(event: EventModel, e: Event): Promise<void> {
    this.confirmationService.confirm({
      target: e.target,
      message: 'Voulez-vous vraiment refuser cet événement ?',
      icon: 'pi pi-times',
      accept: async () => {
        await this.eventService.refuseEvent(event.eventId);
        this.messageService.add({severity: 'success', summary: 'Refusé', detail: 'Evenement refusé'});
        this.eventsHasChanged();
      }
    });
  }

  getPicturesOfEvent(event: EventModel): Promise<MediaModel[]> {
    return this.zoneService.getPicturesZone(event.zone.zoneId)
      .then(function (pictures) {
        return pictures;
      });
  }

  eventsHasChanged() {
    this.isEventsHasChanged.emit()
  }
}
