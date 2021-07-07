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

  async acceptEvent(eventId: number): Promise<void> {
    await this.httpService.put<void>(config.URL + '/event/accept/' + eventId);
  }

  async refuseEvent(eventId: number): Promise<void> {
    await this.httpService.put<void>(config.URL + '/event/refuse/' + eventId);
  }

}
