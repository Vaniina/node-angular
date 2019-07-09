import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsListComponent } from './rooms-list.component';
import {RoomsListRoutingModule} from "./rooms-list.routing.module";

@NgModule({
  declarations: [RoomsListComponent],
  imports: [
    CommonModule,
    RoomsListRoutingModule,
  ]
})
export class RoomsListModule { }
