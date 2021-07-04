import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {UserModel} from "../../../models/user.model";
import {AuthenticatedUserService} from "../../../services/authenticated-user.service";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-my-space',
  templateUrl: './my-space.component.html',
  styleUrls: ['./my-space.component.css']
})

export class MySpaceComponent implements OnInit, AfterViewInit {
  token: string;
  currentUser: UserModel;

  isUpdateUserClicked = false;

  registerForm: FormGroup;
  passwordMatched: boolean = false;
  confirmationPassword: string = "";
  isUpdated = true;

  isLoadedData: boolean;

  constructor(private router: Router,
              private authenticatedUserService: AuthenticatedUserService,
              private formBuilder: FormBuilder,
              private messageService: MessageService,
              private userService: UserService) {
    this.registerForm = this.formBuilder.group({
      'fullName': ['', Validators.required],
      'firstName': ['', Validators.required],
      'password': ['', [Validators.pattern('^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()])[a-zA-Z0-9!@#$%^&*()]{8,}$')]],
      'confirmPassword': [''],
      'email': ['', [Validators.email, Validators.required]],
      'mobile': ['', [Validators.minLength(10), Validators.required, Validators.pattern('0[0-9]{9}')]]
    },
      {validators: this.checkPasswords});
  }

  async ngOnInit() {
    this.initToken();
    await this.initCurrentUser();
    this.isLoadedData = true;
  }

  async ngAfterViewInit() {
    if (!this.authenticatedUserService.isAuthenticated()) {
      this.authenticatedUserService.redirectToAuthentication();
    }
  }

  initToken() {
    this.token = this.authenticatedUserService.getToken();
  }

  async initCurrentUser() {
    this.currentUser = await this.authenticatedUserService.getCurrentUser();
    this.currentUser.password = "";
  }

  onUpdateUserClicked() {
    this.isUpdateUserClicked = true;
  }

  checkPasswordMatch(password) {
    this.passwordMatched = password === this.confirmationPassword;
  }

  checkConfirmPasswordMatch(confirmedPassword) {
    this.passwordMatched = confirmedPassword === this.currentUser.password;
  }

  checkPasswords(group: FormGroup) {
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;

    return password === confirmPassword ? null : { notSame: true }
  }

  async updateUserInfos() {
    this.isUpdated = false;
    await this.userService.updateUser(this.registerForm.value);
    this.messageService.add({severity: 'success', summary: 'Modifié', detail: 'Vos informations ont été modifiées'});
    this.isUpdated = true;
    this.isUpdateUserClicked = false;
    this.authenticatedUserService.loadCurrentUser();
  }
}
