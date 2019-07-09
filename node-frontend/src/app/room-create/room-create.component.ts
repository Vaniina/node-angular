import {Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {tap} from "rxjs/operators";
import {HostelModel} from "../../../../node-backend/models/hostel.model";
import {RoomService} from "../services/room.service";
import {HostelService} from "../services/hostel.service";

@Component({
  selector: 'app-room-create',
  templateUrl: './room-create.component.html',
  styleUrls: ['./room-create.component.scss']
})
export class RoomCreateComponent implements OnInit {
  roomForm: FormGroup;
  hostels: HostelModel[];
  loading: boolean;

  constructor(
    private roomService: RoomService,
    private hostelService: HostelService
  ) {
  }

  ngOnInit() {
    this.roomForm = this.roomService.roomEdition$({
      roomName: '',
      size: 0,
      parent: null
    });

    this.loading = true;
    this.hostelService
      .getHostels()
      .pipe(
        tap((hostels: HostelModel[]) => {
          this.hostels = hostels;
          this.loading = false;
        })
      )
      .subscribe();
  }

  create() {
    this.roomService.createRoom$();

  }
}
