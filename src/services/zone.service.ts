import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {config} from "../config/pickthisup.config";
import {HttpService} from "./http.service";
import {ZoneModel} from "../models/zone.model";
import {MediaModel} from "../models/media.model";

@Injectable({
  providedIn: 'root'
})
export class ZoneService {
  constructor(private httpClient: HttpClient,
              private httpService: HttpService) {
  }

  async getPicturesZone(zoneId: number): Promise<MediaModel[]> {
    return (await this.httpService.getAll<MediaModel>(config.URL + '/zone/get-pictures/' + zoneId));
  }

  async getValidatedZones(): Promise<ZoneModel[]> {
    return (await this.httpService.getAll<ZoneModel>(config.URL + '/zone/getValidatedZones'));
  }

  async getWaitingZones(): Promise<ZoneModel[]> {
    return (await this.httpService.getAll<ZoneModel>(config.URL + '/zone/getWaitingZones'));
  }

  async getRefusedZones(): Promise<ZoneModel[]> {
    return (await this.httpService.getAll<ZoneModel>(config.URL + '/zone/getRefusedZones'));
  }

  async acceptZone(zoneId: number): Promise<void> {
    await this.httpService.put<void>(config.URL + '/zone/accept/' + zoneId);
  }

  async refuseZone(zoneId: number): Promise<void> {
    await this.httpService.put<void>(config.URL + '/zone/refuse/' + zoneId);
  }

}
