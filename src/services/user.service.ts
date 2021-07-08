import {Injectable} from '@angular/core';
import {UserModel} from "../models/user.model";
import {PollutionLevel} from "../enum/pollution-level";
import {config} from "../config/pickthisup.config";
import {HttpClient} from "@angular/common/http";
import {HttpService} from "./http.service";
import {ZoneModel} from "../models/zone.model";
import {StatusModel} from "../models/status.model";
import {UserTypeModel} from "../models/user-type.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient,
              private httpService: HttpService) { }

  async updateUser(user: UserModel): Promise<UserModel> {
    return (await this.httpService.put<UserModel>(config.URL + "/user/update/" + user['mail'], {
      password: user['password'],
      name: user['fullName'],
      firstname: user['firstName'],
      phone: user['mobile'],
      type:user['type'],
      typeId:user['typeId']
    }));
  }
  async getAllUsers(): Promise<UserModel[]> {
    return (await this.httpService.getAll<UserModel>(config.URL + '/user/getAllUsers'));
  }
  async getAllUserTypes(): Promise<UserTypeModel[]> {
    return (await this.httpService.getAll<UserTypeModel>(config.URL + '/user/getAllTypes'));
  }
  async deleteUserByMail(mail:string): Promise<Boolean> {
    return (await this.httpService.delete<Boolean>(config.URL + '/user/delete/' + mail));
  }
}
