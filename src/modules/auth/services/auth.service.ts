import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '@common/services';
import { User } from '@modules/auth/models';
import { LoginPayload, TokenResponse } from '@start-bootstrap/sb-clean-blog-shared-types';
import { from, Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

import { AuthUtilsService } from './auth-utils.service';

@Injectable()
export class AuthService {
    userData: User | undefined; 

    currentUser! : firebase.User | null;

    constructor(
        private http: HttpClient,
        private configService: ConfigService,
        private authUtilsService: AuthUtilsService,
        private router: Router,
        public afAuth: AngularFireAuth,
        
    ) {

        this.afAuth.authState
          .subscribe(user => {
              this.currentUser = user
          })

          console.log(this.currentUser);
        // this.afAuth.authState.subscribe(user => {
        //     if (user) {
        //       this.userData = user as User;
        //       localStorage.setItem('user', JSON.stringify(this.userData));
        //     } else {
        //       localStorage.setItem('user', "");
        //     }
        //   })
        //   console.log(this.userData)
        //   console.log(localStorage.getItem('user'))
    }

    login$() {
        this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }

    getUser() : firebase.User | null{
        let user! : firebase.User | null;
        this.afAuth.authState
          .subscribe(item => {
              user = item
          })
        return user;
    }
}
