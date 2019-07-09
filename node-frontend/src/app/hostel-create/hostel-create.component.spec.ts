import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostelCreateComponent } from './hostel-create.component';

describe('HostelsListComponent', () => {
  let component: HostelCreateComponent;
  let fixture: ComponentFixture<HostelCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostelCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostelCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
