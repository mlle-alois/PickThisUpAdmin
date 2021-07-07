import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {config} from "../config/pickthisup.config";
import {AuthenticatedUserService} from "./authenticated-user.service";
import {HttpService} from "./http.service";
import {EventModel} from "../models/event.model";
import {MyDate} from "../utils/MyDate";
import {UserModel} from "../models/user.model";
import {ZoneModel} from "../models/zone.model";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private httpClient: HttpClient,
              private authenticatedUserService: AuthenticatedUserService,
              private httpService: HttpService) {
  }

  async getParticipantsEvents(eventId: number): Promise<UserModel[]> {
    return await this.httpService.getAll<UserModel>(config.URL + '/event/getParticipants/' + eventId);
  }

  async getPastEventsFromUser(): Promise<EventModel[]> {
    return (await this.httpService.getAll<EventModel>(config.URL + '/event/getPastEventsByUser')).map(function (event) {
      event.dateHourStart = new MyDate(event.dateHourStart);
      event.dateHourEnd = new MyDate(event.dateHourEnd);
      event.dateHourCreation = new MyDate(event.dateHourCreation);
      return event;
    });
  }

  async getFuturEventsFromUser(): Promise<EventModel[]> {
    return (await this.httpService.getAll<EventModel>(config.URL + '/event/getFutureEventsByUser')).map(function (event) {
      event.dateHourStart = new MyDate(event.dateHourStart);
      event.dateHourEnd = new MyDate(event.dateHourEnd);
      event.dateHourCreation = new MyDate(event.dateHourCreation);
      return event;
    });
  }

  async getRefusedEvents(): Promise<EventModel[]> {
    return (await this.httpService.getAll<EventModel>(config.URL + '/event/getRefusedEvents')).map(function (event) {
      event.dateHourStart = new MyDate(event.dateHourStart);
      event.dateHourEnd = new MyDate(event.dateHourEnd);
      event.dateHourCreation = new MyDate(event.dateHourCreation);
      return event;
    });
  }

  async getValidatedEvents(): Promise<EventModel[]> {
    return (await this.httpService.getAll<EventModel>(config.URL + '/event/getValidatedEvents')).map(function (event) {
      event.dateHourStart = new MyDate(event.dateHourStart);
      event.dateHourEnd = new MyDate(event.dateHourEnd);
      event.dateHourCreation = new MyDate(event.dateHourCreation);
      return event;
    });
  }

  async getWaitingEvents(): Promise<EventModel[]> {
    return (await this.httpService.getAll<EventModel>(config.URL + '/event/getWaitingEvents')).map(function (event) {
      event.dateHourStart = new MyDate(event.dateHourStart);
      event.dateHourEnd = new MyDate(event.dateHourEnd);
      event.dateHourCreation = new MyDate(event.dateHourCreation);
      return event;
    });
  }

  async getCurrentEventsFromUser(): Promise<EventModel[]> {
    return (await this.httpService.getAll<EventModel>(config.URL + '/event/getActualEventsByUser')).map(function (event) {
      event.dateHourStart = new MyDate(event.dateHourStart);
      event.dateHourEnd = new MyDate(event.dateHourEnd);
      event.dateHourCreation = new MyDate(event.dateHourCreation);
      return event;
    });
  }

  async registerToEvent(eventId: number): Promise<UserModel[]> {
    return await this.httpService.postMultiRes<UserModel>(config.URL + "/event/register/" + eventId);
  }

  async unregisterToEvent(eventId: number): Promise<UserModel[]> {
    return await this.httpService.deleteMultiRes<UserModel>(config.URL + '/event/unregister/' + eventId);
  }

  async acceptEvent(eventId: number): Promise<void> {
    await this.httpService.put<void>(config.URL + '/event/accept/' + eventId);
  }

  async refuseEvent(eventId: number): Promise<void> {
    await this.httpService.put<void>(config.URL + '/event/refuse/' + eventId);
  }

  async createEvent(event: EventModel, zone: ZoneModel): Promise<EventModel> {
    return (await this.httpService.post<EventModel>(config.URL + "/event/add", {
      title: event['eventTitle'],
      description: event['eventDescription'],
      dateHourStart: event['dateHourStart'],
      dateHourEnd: event['dateHourEnd'],
      maxNbPlaces: event['eventMaxNbPlaces'],
      pictureId: event['eventPitureId'],
      zoneId: zone.zoneId
    }));
  }

  async updateEvent(event: EventModel, zone: ZoneModel, eventId: number): Promise<EventModel> {
    return (await this.httpService.put<EventModel>(config.URL + "/event/update/" + eventId, {
      title: event['eventTitle'],
      description: event['eventDescription'],
      dateHourStart: event['dateHourStart'],
      dateHourEnd: event['dateHourEnd'],
      maxNbPlaces: event['eventMaxNbPlaces'],
      pictureId: event['eventPitureId'],
      zoneId: zone.zoneId
    }));
  }

}
