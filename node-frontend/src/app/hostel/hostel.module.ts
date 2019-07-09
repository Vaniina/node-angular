import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HostelComponent} from './hostel.component';
import {HostelRoutingModule} from "./hostel.routing.module";
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [HostelComponent],
  imports: [
    CommonModule,
    HostelRoutingModule,
    ReactiveFormsModule
  ]
})
export class HostelModule {
}
