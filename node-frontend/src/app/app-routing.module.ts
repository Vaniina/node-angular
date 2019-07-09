import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: './hostels-list/hostels-list.module#HostelsListModule'
  },
  {
    path: 'hostel/:id',
    loadChildren: './hostel/hostel.module#HostelModule'
  },
  {
    path: 'create',
    loadChildren: './hostel-create/hostel-create.module#HostelCreateModule'
  },
  {
    path: 'rooms-list',
    loadChildren: './rooms-list/rooms-list.module#RoomsListModule'
  },
  {
    path: 'room-create',
    loadChildren: './room-create/room-create.module#RoomCreateModule'
  },
  {
    path: 'room/:id',
    loadChildren: './room/room.module#RoomModule'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
