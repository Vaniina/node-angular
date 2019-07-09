import {Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import { FormGroup} from "@angular/forms";
import {HostelService} from "../services/hostel.service";

@Component({
  selector: 'app-hostel-create',
  templateUrl: './hostel-create.component.html',
  styleUrls: ['./hostel-create.component.scss']
})

export class HostelCreateComponent implements OnInit {
  hostelForm: FormGroup;

  constructor(private router: Router,
              private hostelService: HostelService
  ) {
  }

  ngOnInit() {
    this.hostelForm = this.hostelService.hostelEdition$({
      name: '',
      roomNumbers: 0,
      pool: false,
      rooms: []
    });
  }

  create() {
    this.hostelService.createHostel$();
    this.router.navigateByUrl('/');
  }
}
