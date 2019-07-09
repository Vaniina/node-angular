import {ActivatedRoute} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {HostelModel} from "../../../../node-backend/models/hostel.model";
import {tap, map} from "rxjs/operators";
import {HostelService} from "../services/hostel.service";
import {RoomModel} from "../../../../node-backend/models/room.model";

@Component({
  selector: 'app-hostel',
  templateUrl: './hostel.component.html',
  styleUrls: ['./hostel.component.scss']
})
export class HostelComponent implements OnInit {

  hostel: HostelModel;
  hostelForm: FormGroup;
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private hostelService: HostelService
  ) {

  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this.loading = true;

    this.hostelService.getHostelById$(id)
      .pipe(
        map(([hostel, rooms]: [HostelModel, RoomModel[]]): HostelModel => ({...hostel, rooms: rooms})),
        tap((hostel: HostelModel) => {
          this.hostel = hostel;
          this.loading = false;
        })
      )
      .subscribe();
  }

  deleteHostel() {
    const result = confirm('Êtes-vous sûr de vouloir supprimer cet hôtel ?');
    if (result) {
      this.hostelService.deleteHostel$();
    }
  }

  openHostelEdition() {
    this.hostelForm = this.hostelService.hostelEdition$(this.hostel)
  }

  cancelEdition() {
    this.hostelForm = null;
  }

  update() {
    this.hostelService.updateHostel$();
    this.hostelForm = null;
  }
}
