import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/modules/inventario/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private loginService: LoginService) {
    this.loginForm = this.fb.group({
      usernameCtrl: ['', [Validators.required]],
      passwordCtrl: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  loginUser() {
    window.location.href = '/pages';
  }
}
