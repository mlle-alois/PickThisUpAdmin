import {Input, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import {ZonesComponent} from './components/zones/zones.component';
import {MyZonesComponent} from './components/my-zones/my-zones.component';
import {MySpaceComponent} from './components/my-space/my-space.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'zones', component: ZonesComponent },
  { path: 'my-zones', component: MyZonesComponent },
  { path: 'my-space', component: MySpaceComponent }
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
