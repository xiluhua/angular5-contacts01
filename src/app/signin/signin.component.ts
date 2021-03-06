import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

    signinForm = {
        email: '',
        password: ''
    };
    email_err_msg = ''

    constructor(public http: HttpClient, public router: Router) {
    }

    ngOnInit() {
    }

    signin() {
        console.log('signin');
        const formData = this.signinForm;
        const url = 'http://localhost:8002/boot02/signinAngular5.action';
        this.http.post(url, formData)
            .toPromise()
            .then((data: any) => {
                console.log(data);
                this.email_err_msg = '';
                window.localStorage.setItem('auth_token', data.token);
                window.localStorage.setItem('user_info', JSON.stringify(data.user));
                this.router.navigate(['/']);
            })
            .catch(err => {
                if (err.status === 409) {
                    this.email_err_msg = '邮箱已被占用';
                }
            });
    }
}
