import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {combineLatest, Observable} from "rxjs";
import {HostelModel} from "../../../../node-backend/models/hostel.model";
import {Router} from "@angular/router";
import {RoomModel} from "../../../../node-backend/models/room.model";
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HostelService {
  hostelForm: FormGroup;
  hostel: Observable<HostelModel>;
  hostelData: HostelModel;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private httpClient: HttpClient
  ) {
  }

  getHostels() {
    return this.httpClient.get<HostelModel[]>('http://localhost:4000/hostels');
  }

  getHostelById$(id: string) {
    this.hostel = this.httpClient.get<HostelModel>('http://localhost:4000/hostel/' + id);
    const rooms = this.httpClient.get<RoomModel>('http://localhost:4000/hostels/' + id + '/rooms');

    this.hostel
      .pipe(
        tap((hostel: HostelModel) => {
          this.hostelData = hostel;
        })
      )
      .subscribe();

    return combineLatest(
      this.hostel,
      rooms
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
    this.httpClient.delete<HostelModel>('http://localhost:4000/hostels/'+ this.hostelData.uid);
    this.router.navigateByUrl('/');
  }

  updateHostel$() {
    this.httpClient.put<HostelModel>('http://localhost:4000/hostel/' + this.hostelData.uid, this.hostelForm.value);
  }

  async createHostel$() {
    this.httpClient.post<HostelModel>('http://localhost:4000/hostels', this.hostelForm.value);
    this.router.navigateByUrl('hostel/' + this.hostelForm.value.parent);
  }
}

