import {Injectable} from '@angular/core';
import {RoomModel} from "../../../../node-backend/models/room.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  room: RoomModel;
  roomForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private httpClient: HttpClient,
  ) {
  }

  getRooms() {
    return this.httpClient.get<RoomModel>('http://localhost:4000/rooms');
  }

  getRoomById$(id: string) {
    return this.httpClient
      .get<RoomModel>('http://localhost:4000/rooms/'+ id)
      .pipe(
        tap((room: RoomModel) => {
          this.room = room;
        })
      );
  }

  roomEdition$(room: RoomModel) {
    return this.roomForm = this.fb.group({
      roomName: [room.roomName, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      size: [room.size, [Validators.required]],
      parent: [room.parent]
    })
  }

  async deleteRoom$() {
    await this.httpClient.delete('http://localhost:4000/rooms/'+ this.room.uid);
    this.router.navigateByUrl('room/');
  }

  async updateRoom$() {
    await this.httpClient.put('http://localhost:4000/room/' + this.room.uid, this.roomForm.value);
  }

  async createRoom$() {
    this.httpClient.post('http://localhost:4000/rooms/', this.roomForm.value);
  }
}








