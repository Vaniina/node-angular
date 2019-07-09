import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HostelsListComponent} from './hostels-list.component';
import {HostelsListRoutingModule} from "./hostels-list.routing.module";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [HostelsListComponent],
  imports: [
    CommonModule,
    HostelsListRoutingModule,
    ReactiveFormsModule,
  ]
})
export class HostelsListModule {
}
