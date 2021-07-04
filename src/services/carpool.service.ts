import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {config} from "../config/pickthisup.config";
import {AuthenticatedUserService} from "./authenticated-user.service";
import {HttpService} from "./http.service";
import {CarpoolModel} from "../models/carpool.model";
import {UserModel} from "../models/user.model";
import {EventModel} from "../models/event.model";

@Injectable({
  providedIn: 'root'
})
export class CarpoolService {

  constructor(private httpClient: HttpClient,
              private authenticatedUserService: AuthenticatedUserService,
              private httpService: HttpService) {
  }

  async getCarpoolsEvent(eventId: number): Promise<CarpoolModel[]> {
    return await this.httpService.getAll<CarpoolModel>(config.URL + "/carpool/getByEvent/" + eventId);
  }

  async getCarpoolParticipants(eventId: number): Promise<UserModel[]> {
    return (await this.httpService.getAll<UserModel>(config.URL + "/carpool/getParticipants/" + eventId));
  }

  async registerToCarpool(carpoolId: number): Promise<UserModel[]> {
    return (await this.httpService.postMultiRes<UserModel>(config.URL + "/carpool/register/" + carpoolId));
  }

  async unregisterToCarpool(carpoolId: number): Promise<UserModel[]> {
    return (await this.httpService.deleteMultiRes<UserModel>(config.URL + "/carpool/unregister/" + carpoolId));
  }

  async proposeCarpool(carpool: CarpoolModel, event: EventModel): Promise<CarpoolModel> {
    return (await this.httpService.post<CarpoolModel>(config.URL + "/carpool/add", {
      street: carpool['carpoolDepartureStreet'],
      zipcode: carpool['carpoolDepartureZipcode'],
      city: carpool['carpoolDepartureCity'],
      nbPlaces: carpool['nbPlaces'],
      eventId: event.eventId
    }));
  }

  async getOldAdressesCarpoolOfUser(): Promise<String[]> {
    return (await this.httpService.getAll<String>(config.URL + "/carpool/getOldAdresses"));
  }

}
