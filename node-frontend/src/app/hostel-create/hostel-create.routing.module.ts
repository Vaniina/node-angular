import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HostelCreateComponent} from "./hostel-create.component";

const routes: Routes = [
  {
    path: '',
    component: HostelCreateComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HostelCreateRoutingModule {
}
