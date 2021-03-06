import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    user = null;

    constructor(public http: HttpClient, public router: Router) {
        const user_info = window.localStorage.getItem('user_info');
        this.user = JSON.parse(user_info || '{}');
        console.log('user: ' + user_info);
    }

    ngOnInit() {
    }

    signout(e) {
        e.preventDefault();
        console.log('signout');
        const url = 'http://localhost:8002/boot02/signoutAngular5.action';
        this.http.post(url, this.user)
            .toPromise()
            .then((data: any) => {
                console.log(data);
                window.localStorage.removeItem('auth_token');
                window.localStorage.removeItem('user_info');
                this.router.navigate(['/signin']);
            })
            .catch(err => {
                if (err.status === 409) {
                    console.log('服务器异常')
                }
            });
    }
}
