import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HostelCreateComponent} from './hostel-create.component';
import {HostelCreateRoutingModule} from "./hostel-create.routing.module";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [HostelCreateComponent],
  imports: [
    CommonModule,
    HostelCreateRoutingModule,
    ReactiveFormsModule,
  ]
})
export class HostelCreateModule {
}

