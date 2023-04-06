import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../models/auth.model';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  /* Variables */
  loginForm: FormGroup;
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(16),
        ],
      ],
    });
  }

  get formControls() {
    return this.loginForm.controls;
  }

  /* Methods */

  async onSignIn() {
    if (this.loginForm.invalid) {
      this.validateAllFormFields(this.loginForm);
      return;
    }

    this.loading = true;

    const auth: Auth = this.loginForm.value;

    try {
      const res = await this.authService.login(auth);
      if (res) {
        console.log(res);
        this.router.navigate(['/dashboard']);
        this.toastr.success('Bienvenido', 'Mensaje del sistema');
        this.loading = false;
      }
    } catch (e) {
      console.log(e);
      this.toastr.error('Error al iniciar sesión', 'Mensaje del sistema', {
        timeOut: 5000,
      });
      this.loading = false;
    }
  }

  ngOnInit(): void {}

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}
