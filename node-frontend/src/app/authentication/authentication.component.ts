import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AngularFireAuth} from "@angular/fire/auth";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {
  view: string = 'pending';
  authForm: FormGroup;
  resetForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public afAuth: AngularFireAuth,
  ) {
    this.afAuth.auth.onAuthStateChanged(auth => {
      this.setView(auth ? 'logout' : 'login');
    });
  }

  ngOnInit() {

  }

  setView(view: string) {
    this.view = view;

    if (view === 'login') {
      this.authForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['',Validators.required],
      });

    } else if (view === 'reset') {
      this.resetForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
      });
    }
  }

  connect() {
    this.afAuth.auth.signInWithEmailAndPassword(this.authForm.value.email, this.authForm.value.password).then(() => {
      this.setView('logout');
    }).catch( () => {
      alert('mot de passe incorrect');
    })
  }

  reset() {
    this.afAuth.auth.sendPasswordResetEmail(this.resetForm.value.email);
    this.setView('login');
  }

  disconnect() {
    this.afAuth.auth.signOut();
    this.setView('login');
  }

}

