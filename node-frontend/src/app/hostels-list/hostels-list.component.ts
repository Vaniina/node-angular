import {Component, OnInit} from '@angular/core';
import {HostelModel} from "../../../../node-backend/models/hostel.model";
import {HostelService} from "../services/hostel.service";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-hostels-list',
  templateUrl: './hostels-list.component.html',
  styleUrls: ['./hostels-list.component.scss']
})
export class HostelsListComponent implements OnInit {
  hostels: HostelModel[] = [];
  loading: boolean;

  constructor(
    private hostelService: HostelService
  ) {
  }

  ngOnInit() {
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
}






