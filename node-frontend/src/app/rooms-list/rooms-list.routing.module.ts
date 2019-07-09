import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RoomsListComponent} from "./rooms-list.component";

const routes: Routes = [
  {
    path: '',
    component: RoomsListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomsListRoutingModule { }
