import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {HomeComponent} from './components/home/home.component';
import {NgxLoadingModule} from 'ngx-loading';
import {NgModule} from "@angular/core";
import {ButtonModule} from "primeng/button";
import {MenuComponent} from './components/menu/menu.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MenubarModule} from "primeng/menubar";
import {CardModule} from "primeng/card";
import {DialogModule} from 'primeng/dialog';
import {TableModule} from "primeng/table";
import {ActionButtonsComponent} from './components/action-buttons/action-buttons.component';
import {MySpaceComponent} from './components/my-space/my-space.component';
import {MyZonesComponent} from './components/my-zones/my-zones.component';
import {ZonesComponent} from './components/zones/zones.component';
import {GalleriaModule} from "primeng/galleria";
import {AddEventComponent} from './components/add-event/add-event.component';
import {SignalZoneComponent} from './components/signal-zone/signal-zone.component';
import {AutoCompleteModule} from "primeng/autocomplete";
import {FileUploadModule} from "primeng/fileupload";
import {ToastModule} from "primeng/toast";
import {CalendarModule} from "primeng/calendar";
import {ListboxModule} from "primeng/listbox";
import {DropdownModule} from "primeng/dropdown";
import {ConfirmPopupModule} from "primeng/confirmpopup";
import {ConfirmationService, MessageService} from "primeng/api";
import {TabViewModule} from 'primeng/tabview';
import { UpdateEventComponent } from './components/update-event/update-event.component';
import { MyEventComponent } from './components/my-event/my-event.component';
import {ProgressSpinnerModule} from "primeng/progressspinner";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    MenuComponent,
    ActionButtonsComponent,
    MySpaceComponent,
    MyZonesComponent,
    ZonesComponent,
    AddEventComponent,
    SignalZoneComponent,
    UpdateEventComponent,
    MyEventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxLoadingModule.forRoot({}),
    ButtonModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    MenubarModule,
    CardModule,
    DialogModule,
    TableModule,
    GalleriaModule,
    FormsModule,
    AutoCompleteModule,
    FileUploadModule,
    ToastModule,
    CalendarModule,
    ListboxModule,
    DropdownModule,
    ConfirmPopupModule,
    TabViewModule,
    ProgressSpinnerModule
  ],
  providers: [
    HttpClient,
    ConfirmationService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
