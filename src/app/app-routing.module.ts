import {Input, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import {ZonesComponent} from './components/zones/zones.component';
import {UsersComponent} from "./components/users/users.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'zones', component: ZonesComponent },
  { path: 'users', component: UsersComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [ RouterModule ],
  declarations: []
})

export class AppRoutingModule {
  @Input() token: string;
}
