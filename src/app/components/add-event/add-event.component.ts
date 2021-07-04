import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {ZoneModel} from "../../../models/zone.model";
import {EventService} from "../../../services/event.service";
import {ZoneService} from "../../../services/zone.service";
import {DateUtils} from "../../../utils/DateUtils";

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  isAddEventClickedValue: boolean;

  get isAddEventClicked(): boolean {
    return this.isAddEventClickedValue;
  }

  @Input() set isAddEventClicked(value: boolean) {
    this.isAddEventClickedValue = value;
    this.isAddEventClickedChange.emit(this.isAddEventClickedValue);
  }

  @Output() isAddEventClickedChange = new EventEmitter<boolean>();

  filteredItems: any[];
  pollutionLevelItems: any[] = ['Faible', 'Moyen', 'Elevé'];

  registerForm: FormGroup;
  isCreated = true;

  availableZones: ZoneModel[];
  zones = [];
  selectedZone: ZoneModel;
  selectedZonePictures = [];

  isLoadedData: boolean;

  constructor(private fb: FormBuilder,
              private eventService: EventService,
              private zoneService: ZoneService,
              private messageService: MessageService) {
    this.registerForm = this.fb.group({
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
    await this.initAvailableZones();
    this.isLoadedData = true;
  }

  async initAvailableZones() {
    this.availableZones = await this.zoneService.getAvailableZones();
    this.availableZones.forEach((zone) => {
      this.zones.push({adress: zone.zoneStreet + " " + zone.zoneZipcode + " " + zone.zoneCity, zone: zone})
    });
  }

  async createEvent() {
    this.isCreated = false;
    if(this.registerForm.value['dateHourStart'] >= this.registerForm.value['dateHourEnd']) {
      this.messageService.add({severity: 'warn', summary: 'Conflit', detail: 'Veuillez saisir une date de début précédant la date de fin'});
      this.isCreated = true;
      return;
    }
    if(this.registerForm.value['dateHourStart'] <= DateUtils.getCurrentDate()) {
      this.messageService.add({severity: 'warn', summary: 'Conflit', detail: 'Veuillez saisir une date de début supérieure à la date actuelle'});
      this.isCreated = true;
      return;
    }
    await this.eventService.createEvent(this.registerForm.value, this.selectedZone);
    this.isCreated = true;
    this.isAddEventClickedChange.emit(false);
    this.messageService.add({severity: 'success', summary: 'Créé', detail: 'L\'événement a été créé ! Il doit désormais être validé par notre équipe.'});
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
    this.selectedZonePictures = (await this.zoneService.getPicturesZone(this.selectedZone.zoneId)).map(function (picture) {
      return {path: picture.mediaPath, pictureId: picture.mediaId};
    });
  }

}
