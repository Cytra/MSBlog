import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '@modules/auth/services';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '@testing/mocks';

@Component({
    selector: 'sb-login',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './login.component.html',
    styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit {
    loginForm = this.fb.group({
        password: ['', [Validators.required, Validators.minLength(8)]],
    });

    constructor(private fb: FormBuilder, public authService: AuthService, public afAuth: AngularFireAuth) {}
    ngOnInit() {}

    onSubmit() {
        // if (this.loginForm.status === 'VALID') {
        //     this.authService
        //         .login$({
        //             password: this.loginForm.value.password,
        //         })
        //         .subscribe();
        // }

        // tslint:disable-next-line: forin
        for (const key in this.loginForm.controls) {
            const control = this.loginForm.controls[key];
            control.markAllAsTouched();
        }
    }
    login(){
        this.authService.login$();
        let user = this.authService.getUser();
        console.log(user?.uid)
        // if(user.uid !== "VGjAB7qhCOZqZXBDgcCXKTS5fAB2"){
        //     console.log("wrong")
        // }
        console.log(user);
    }

    /* Accessor Methods */

    get passwordControl() {
        return this.loginForm.get('password') as FormControl;
    }

    get passwordControlValid() {
        return this.passwordControl.touched && !this.passwordControlInvalid;
    }

    get passwordControlInvalid() {
        return (
            this.passwordControl.touched &&
            (this.passwordControl.hasError('required') ||
                this.passwordControl.hasError('minlength'))
        );
    }
}
