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
        label: 'Utilisateurs',
        icon: 'pi pi-fw pi-user',
        styleClass: 'menu-item',
        command: () => this.router.navigate(['users'])
      },
      {
        label: 'Espace général',
        icon: 'pi pi-fw pi-flag',
        styleClass: 'menu-item',
        command: () => window.open(`http://localhost:4202?token=${this.token}`, '_blank')
      }
    ];
  }

  logout() {
    this.authenticatedUserService.logout();
  }

}
