import {Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {RoomModel} from "../../../../node-backend/models/room.model";
import {ActivatedRoute} from "@angular/router";
import {tap} from "rxjs/operators";
import {RoomService} from "../services/room.service";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  room: RoomModel;
  roomForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private roomService: RoomService,
  ) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.roomService.getRoomById$(id)
      .pipe(
        tap((room: RoomModel) => {
          this.room = room
        })
      )
      .subscribe();
  }

  deleteRoom() {
    const result = confirm('Êtes-vous sûr de vouloir supprimer cette chambre ?');

    if (result) {
      this.roomService.deleteRoom$()
    }
  }

  openRoomEdition() {
    this.roomForm = this.roomService.roomEdition$(this.room);
  }

  cancelEdition() {
    this.roomForm = null;
  }

  async update() {
    await this.roomService.updateRoom$();
    this.roomForm = null;
  }
}
