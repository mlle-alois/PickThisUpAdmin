import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EventService} from "../../../services/event.service";
import {ZoneService} from "../../../services/zone.service";
import {MessageService} from "primeng/api";
import {DateUtils} from "../../../utils/DateUtils";
import {ZoneModel} from "../../../models/zone.model";
import {EventModel} from "../../../models/event.model";

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css']
})
export class UpdateEventComponent implements OnInit {

  isUpdateEventClickedValue: boolean;
  get isUpdateEventClicked(): boolean {
    return this.isUpdateEventClickedValue;
  }
  @Input() set isUpdateEventClicked(value: boolean) {
    this.isUpdateEventClickedValue = value;
    this.isUpdateEventClickedChange.emit(this.isUpdateEventClickedValue);
  }
  @Output() isUpdateEventClickedChange = new EventEmitter<boolean>();

  @Output() isEventWasUpdated = new EventEmitter<void>();

  @Input() visibleEvent: EventModel;

  filteredItems: any[];
  pollutionLevelItems: any[] = ['Faible', 'Moyen', 'Elevé'];

  registerForm: FormGroup;
  isUpdated = true;

  availableZones: any[];
  zones = [];
  selectedZone: ZoneModel;
  selectedZoneAdress: any;
  selectedZonePictures = [];

  isLoadedData: boolean;

  constructor(private formBuilder: FormBuilder,
              private eventService: EventService,
              private zoneService: ZoneService,
              private messageService: MessageService) {
    this.registerForm = this.formBuilder.group({
      'zoneId': ['', Validators.required],
      'eventTitle': ['', Validators.required],
      'eventDescription': ['', Validators.required],
      'dateHourStart': ['', Validators.required],
      'dateHourEnd': ['', Validators.required],
      'eventMaxNbPlaces': ['', [Validators.pattern('[1-9]{1}[0-9]*'), Validators.required]],
      'eventPitureId': ['', Validators.required]
    });
  }

  async ngOnInit() {
    this.selectedZone = this.visibleEvent.zone;
    this.selectedZoneAdress = this.selectedZone.zoneStreet + " " + this.selectedZone.zoneZipcode + " " + this.selectedZone.zoneCity;
    await this.initAvailableZones();
    await this.getSelectedZonePictures(this.selectedZone);
    this.registerForm.patchValue({zoneId: this.selectedZoneAdress});
    this.registerForm.patchValue({eventTitle: this.visibleEvent.eventTitle});
    this.registerForm.patchValue({eventDescription: this.visibleEvent.eventDescription});
    this.registerForm.patchValue({dateHourStart: this.visibleEvent.dateHourStart});
    this.registerForm.patchValue({dateHourEnd: this.visibleEvent.dateHourEnd});
    this.registerForm.patchValue({eventMaxNbPlaces: this.visibleEvent.eventMaxNbPlaces});
    //TODO faire marcher la selection par défaut de l'image de l'événement
    this.isLoadedData = true;
  }

  async initAvailableZones() {
    this.availableZones = await this.zoneService.getAvailableZones();
    this.zones.push({adress: this.selectedZone.zoneStreet + " " + this.selectedZone.zoneZipcode + " " + this.selectedZone.zoneCity, zone: this.selectedZone})
    this.availableZones.forEach((zone) => {
      this.zones.push({adress: zone.zoneStreet + " " + zone.zoneZipcode + " " + zone.zoneCity, zone: zone})
    });
    }

  async createEvent() {
    this.isUpdated = false;
    if(this.registerForm.value['dateHourStart'] >= this.registerForm.value['dateHourEnd']) {
      this.messageService.add({severity: 'warn', summary: 'Conflit', detail: 'Veuillez saisir une date de début précédant la date de fin'});
      this.isUpdated = true;
      return;
    }
    if(this.registerForm.value['dateHourStart'] <= DateUtils.getCurrentDate()) {
      this.messageService.add({severity: 'warn', summary: 'Conflit', detail: 'Veuillez saisir une date de début supérieure à la date actuelle'});
      this.isUpdated = true;
      return;
    }
    await this.eventService.updateEvent(this.registerForm.value, this.selectedZone, this.visibleEvent.eventId);
    this.isUpdated = true;
    this.isUpdateEventClickedChange.emit(false);
    this.messageService.add({severity: 'success', summary: 'Modifié', detail: 'L\'événement a été modifié ! Il doit être validé par notre équipe.'});
    this.isEventWasUpdated.emit();
  }

  filterItems(event) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < this.pollutionLevelItems.length; i++) {
      let item = this.pollutionLevelItems[i];
      if (item.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(item);
      }
    }

    this.filteredItems = filtered;
  }

  async onSelectZone(event) {
    this.selectedZone = event.value.zone;
    this.getSelectedZonePictures(this.selectedZone);
  }

  async getSelectedZonePictures(zone: ZoneModel) {
    this.selectedZonePictures = (await this.zoneService.getPicturesZone(zone.zoneId)).map(function (picture) {
      return {path: picture.mediaPath, pictureId: picture.mediaId};
    });
  }
}
