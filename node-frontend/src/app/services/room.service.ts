import {Injectable} from '@angular/core';
import {RoomModel} from "../../../../node-backend/models/room.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  room: RoomModel;
  roomForm: FormGroup;
  private roomDoc: AngularFirestoreDocument<RoomModel>;


  constructor(
    private afs: AngularFirestore,
    private router: Router,
    private fb: FormBuilder,
  ) {
  }

  getRooms() {
    return this.afs.collection<RoomModel>('rooms').valueChanges();
  }

  getRoomById$(id: string) {
    this.roomDoc = this.afs.doc<RoomModel>('rooms/' + id);

    return this.roomDoc.valueChanges().pipe(
      tap((room: RoomModel) => {
        this.room = room;
      }));
  }

  roomEdition$(room: RoomModel) {
    return this.roomForm = this.fb.group({
      roomName: [room.roomName, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      size: [room.size, [Validators.required]],
      parent: [room.parent]
    })
  }

  async deleteRoom$() {
    await this.roomDoc.delete();
    this.router.navigateByUrl('room/');
  }

  async updateRoom$() {
    await this.roomDoc.update(this.roomForm.value);
  }

  async createRoom$() {
    await this.afs.collection('rooms').add(this.roomForm.value);
  }
}








