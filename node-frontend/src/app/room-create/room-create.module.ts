import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomCreateComponent } from './room-create.component';
import {RoomCreateRoutingModule} from "./room-create.routing.module";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [RoomCreateComponent],
  imports: [
    CommonModule,
    RoomCreateRoutingModule,
    ReactiveFormsModule,
  ]
})
export class RoomCreateModule { }
