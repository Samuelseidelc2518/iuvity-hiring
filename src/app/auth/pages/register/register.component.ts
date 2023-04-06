import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsService } from '../../../core/services/forms.service';
import { Auth } from '../../models/auth.model';
import { ToastrService } from 'ngx-toastr';
import { FadeIn } from 'src/app/core/animations/fadeIn.animation';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: FadeIn.animations,
})
export class RegisterComponent implements OnInit {
  /* Variables */
  registerForm: FormGroup;
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authservice: AuthService,
    private router: Router,
    private formsService: FormsService,
    private toastr: ToastrService
  ) {
    this.registerForm = this.formBuilder.group(
      {
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
        confirmPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(16),
          ],
        ],
      },
      {
        
        validator: this.MustMatch('password', 'confirmPassword'),
      }
    );
  }

  ngOnInit(): void {
  }

  get formControls() {
    return this.registerForm.controls;
  }

  /* Methods */

  async onRegister() {
    if (this.registerForm.invalid || this.loading) {
      this.formsService.validateAllFormFields(this.registerForm);
      return;
    }

    this.loading = true;

    const auth: Auth = this.registerForm.value;

    try {
      const res = await this.authservice.register(auth);

      if (res) {
        this.router.navigate(['/auth/login']);
        this.loading = false;
        this.toastr.success('Usuario creado de forma exitosa', 'Mensaje del sistema');
      }
    } catch (e) {
      console.log(e);
      this.loading = false;
      this.toastr.error('Lo sentimos, no pudimos crear el usuario intente más tarde', 'Mensaje del sistema', {
        timeOut: 5000,
      });
    }
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
