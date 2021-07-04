import {Component, Input, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {Router} from "@angular/router";
import {AuthenticatedUserService} from "../../../services/authenticated-user.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  items: MenuItem[];
  @Input() token: string;

  constructor(private authenticatedUserService: AuthenticatedUserService,
              private router: Router) {
  }

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        styleClass: 'home-menu menu-item',
        command: () => this.router.navigate([''])
      },
      {
        label: 'Signalements',
        icon: 'pi pi-fw pi-exclamation-triangle',
        styleClass: 'menu-item',
        command: () => this.router.navigate(['zones'])
      },
      {
        label: 'Mes signalements',
        icon: 'pi pi-fw pi-exclamation-triangle',
        styleClass: 'menu-item',
        command: () => this.router.navigate(['my-zones'])
      },
      {
        label: 'Mes événements',
        icon: 'pi pi-fw pi-flag',
        styleClass: 'menu-item',
        command: () => this.router.navigate(['my-events'])
      },
      {
        label: 'Mon espace',
        icon: 'pi pi-fw pi-user',
        styleClass: 'menu-item',
        command: () => this.router.navigate(['my-space'])
      }
    ];
  }

  logout() {
    this.authenticatedUserService.logout();
  }

}
