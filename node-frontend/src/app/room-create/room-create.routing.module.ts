import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RoomCreateComponent} from "./room-create.component";

const routes: Routes = [
  {
    path: '',
    component: RoomCreateComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomCreateRoutingModule { }
