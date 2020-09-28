import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });

  constructor() {}

  ngOnInit(): void {}

  submitFormLogin(): void {
    console.log(this.loginForm.get('email').value);
    console.log(this.loginForm.get('password').value);
    for (const i in this.loginForm.controls) {
      if (Object.prototype.hasOwnProperty.call(this.loginForm.controls, i)) {
        // const element = this.loginForm.controls[i];
        this.loginForm.controls[i].markAsDirty();
        this.loginForm.controls[i].updateValueAndValidity();
      }
    }
  }
}
