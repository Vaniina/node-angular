import { Component, OnInit } from '@angular/core';
import {RoomModel} from "../../../../node-backend/models/room.model";
import {tap} from "rxjs/operators";
import {RoomService} from "../services/room.service";

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss']
})
export class RoomsListComponent implements OnInit {
  rooms: RoomModel[];
  loading: boolean;

  constructor(
    private roomService: RoomService
  ) {}

  ngOnInit() {
    this.loading = true;

    this.roomService.getRooms().pipe(tap((rooms: RoomModel[]) => {
      this.rooms = rooms;
      this.loading = false;
    })).subscribe();
  }

}
