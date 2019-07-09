import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {combineLatest, Observable} from "rxjs";
import {HostelModel} from "../../../../node-backend/models/hostel.model";
import {Router} from "@angular/router";
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "@angular/fire/firestore";
import {RoomModel} from "../../../../node-backend/models/room.model";

@Injectable({
  providedIn: 'root'
})
export class HostelService {
  hostelForm: FormGroup;
  private hostelDoc: AngularFirestoreDocument<HostelModel>;
  private roomsCollection: AngularFirestoreCollection<RoomModel>;
  hostel: Observable<HostelModel>;

  constructor(
    private afs: AngularFirestore,
    private router: Router,
    private fb: FormBuilder,
  ) {
  }

  getHostels() {
    return this.afs.collection<HostelModel>('hostels').valueChanges();
  }

  getHostelById$(id: string) {
    this.hostelDoc = this.afs.doc<HostelModel>('hostels/' + id);
    this.roomsCollection = this.afs.collection<RoomModel>('rooms', ref => {
      return ref.where('parent', '==', id);
    });

    this.hostel = this.hostelDoc.valueChanges();

    return combineLatest(
      this.hostel,
      this.roomsCollection.valueChanges()
    );
  }

  hostelEdition$(hostel: HostelModel) {
    return this.hostelForm = this.fb.group({
      name: [hostel.name, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      roomNumbers: [hostel.roomNumbers, [Validators.required]],
      pool: [hostel.pool, [Validators.required]]
    });
  }

  async deleteHostel$() {
    await this.hostelDoc.delete();
    this.router.navigateByUrl('/');
  }

  updateHostel$() {
    this.hostelDoc.update(this.hostelForm.value);
  }

  async createHostel$() {
    await this.afs.collection('hostels').add(this.hostelForm.value);
    this.router.navigateByUrl('hostel/' + this.hostelForm.value.parent);
  }
}

