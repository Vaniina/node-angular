import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HostelsListComponent} from "./hostels-list.component";

const routes: Routes = [
  {
    path: '',
    component: HostelsListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HostelsListRoutingModule {
}
