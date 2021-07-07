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
import {UsersComponent} from './components/users/users.component';
import {ZonesComponent} from './components/zones/zones.component';
import {GalleriaModule} from "primeng/galleria";
import {AutoCompleteModule} from "primeng/autocomplete";
import {FileUploadModule} from "primeng/fileupload";
import {ToastModule} from "primeng/toast";
import {CalendarModule} from "primeng/calendar";
import {ListboxModule} from "primeng/listbox";
import {DropdownModule} from "primeng/dropdown";
import {ConfirmPopupModule} from "primeng/confirmpopup";
import {ConfirmationService, MessageService} from "primeng/api";
import {TabViewModule} from 'primeng/tabview';
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {EventComponent} from "./components/event/event.component";
import {ZoneComponent} from "./components/zone/zone.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    MenuComponent,
    UsersComponent,
    ZonesComponent,
    EventComponent,
    ZoneComponent
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
