import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from './authentication.component';
import {ReactiveFormsModule} from "@angular/forms";
import {AngularFireAuthModule} from "@angular/fire/auth";

@NgModule({
  declarations: [AuthenticationComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
  ]
})
export class AuthenticationModule { }
