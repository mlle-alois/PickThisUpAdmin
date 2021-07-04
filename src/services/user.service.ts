import {Injectable} from '@angular/core';
import {UserModel} from "../models/user.model";
import {PollutionLevel} from "../enum/pollution-level";
import {config} from "../config/pickthisup.config";
import {HttpClient} from "@angular/common/http";
import {HttpService} from "./http.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient,
              private httpService: HttpService) { }

  async updateUser(user: UserModel): Promise<UserModel> {
    return (await this.httpService.put<UserModel>(config.URL + "/user/update/" + user['email'], {
      password: user['password'],
      name: user['fullName'],
      firstname: user['firstName'],
      phone: user['mobile']
    }));
  }
}
