import {AfterViewInit, ChangeDetectorRef, Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConfirmationService, MessageService} from "primeng/api";
import {UserModel} from "../../../models/user.model";
import {AuthenticatedUserService} from "../../../services/authenticated-user.service";
import {UserService} from "../../../services/user.service";
import {UserTypeModel} from "../../../models/user-type.model";


@Component({
  selector: 'app-my-space',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit, AfterViewInit {
  token: string;
  currentUser: UserModel;
  users: UserModel[];
  isUpdateUserClicked = false;
  isRightsUserClicked = false;
  selectedRights = '';
  rights: UserTypeModel[];
  rightsLibelle: string[];
  isBlockedUserClicked = false;

  registerForm: FormGroup;
  passwordMatched: boolean = false;
  confirmationPassword: string = "";
  isUpdated = true;

  isLoadedData: boolean;
  @Output() isEventsHasChanged = new EventEmitter<void>();

  constructor(private router: Router,
              private authenticatedUserService: AuthenticatedUserService,
              private formBuilder: FormBuilder,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private userService: UserService,
              private changeDetectorRefs: ChangeDetectorRef) {
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
    this.users = await this.userService.getAllUsers();
    this.users = this.users.filter((user) => {
      return user.name
    })
    this.users.forEach((user) => user.password = "");
    this.rights = await this.userService.getAllUserTypes();
    this.rightsLibelle = this.rights.map((right) => right.userTypeLibelle)
  }

  async ngAfterViewInit() {
    if (!this.authenticatedUserService.isAuthenticated()) {
      this.authenticatedUserService.redirectToAuthentication();
    }
  }

  refresh() {
    this.changeDetectorRefs.detectChanges();
  }

  initToken() {
    this.token = this.authenticatedUserService.getToken();
  }

  async initCurrentUser() {
    this.currentUser = await this.authenticatedUserService.getCurrentUser();
    this.currentUser.password = "";
  }

  onUpdateUserClicked(user: UserModel) {
    this.currentUser = user;
    this.isUpdateUserClicked = true;
  }

  private readonly _utilisateurBloqué = "Utilisateur bloqué";

  async onBlockUserClicked(user: UserModel) {
    this.currentUser = user;
    let newUserType: UserTypeModel[] = this.rights.filter((userTypeTemp) => {
      return userTypeTemp.userTypeLibelle === this._utilisateurBloqué;
    });
    await this.updateUserAndRefreshScreen(newUserType);
    this.messageService.add({severity: 'success', summary: 'Bloqué', detail: "L'utilisateur a bien été bloqué ! "});
    this.isBlockedUserClicked = true;
  }

  private readonly _utilisateur = "Utilisateur";

  async onUnBlockUserClicked(user: UserModel) {
    this.currentUser = user;
    let newUserType: UserTypeModel[] = this.rights.filter((userTypeTemp) => {
      return userTypeTemp.userTypeLibelle === this._utilisateur;
    });
    await this.updateUserAndRefreshScreen(newUserType);
    this.messageService.add({severity: 'success', summary: 'Bloqué', detail: "L'utilisateur a bien été débloqué ! "});
    this.isBlockedUserClicked = true;
  }

  async onDeleteUserClicked(user: UserModel, e: Event): Promise<void> {
    this.confirmationService.confirm({
      target: e.target,
      message: 'Voulez-vous vraiment supprimer cet utilisateur ?',
      icon: 'pi pi-trash',
      accept: async () => {
        this.currentUser = user;
        console.log(user);
        await this.userService.deleteUserByMail(this.currentUser.mail);
        this.messageService.add({severity: 'success', summary: 'Supprimé', detail: 'Suppression effectuée'});
        this.users = await this.userService.getAllUsers();
        this.eventsHasChanged();
      }
    });


  }

  private async updateUserAndRefreshScreen(newUserType: UserTypeModel[]) {
    this.currentUser.type = newUserType[0];
    this.currentUser.typeId = this.currentUser.type.userTypeId;
    this.currentUser = await this.userService.updateUser(this.currentUser)
    this.users = await this.userService.getAllUsers();
  }

  onRightsUserClicked(user: UserModel) {
    this.currentUser = user;
    this.isRightsUserClicked = true;
  }

  async changeUserType(userType: string) {

    let newUserType: UserTypeModel[] = this.rights.filter((userTypeTemp) => {
      return userTypeTemp.userTypeLibelle === userType;
    });
    await this.updateUserAndRefreshScreen(newUserType);
    this.isRightsUserClicked = false;
    this.messageService.add({severity: 'success', summary: 'Modifié', detail: "les droits de l'utilisateur ont été modifiés"});
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

    return password === confirmPassword ? null : {notSame: true}
  }

  async updateUserInfos() {
    this.isUpdated = false;
    await this.userService.updateUser(this.registerForm.value);
    this.messageService.add({severity: 'success', summary: 'Modifié', detail: 'Vos informations ont été modifiées'});
    this.isUpdated = true;
    this.isUpdateUserClicked = false;
    this.authenticatedUserService.loadCurrentUser();
  }

  eventsHasChanged() {
    this.isEventsHasChanged.emit()
  }
}
