import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
    selector: 'app-contact-new',
    templateUrl: './contact-new.component.html',
    styleUrls: ['./contact-new.component.css']
})
export class ContactNewComponent implements OnInit {

    formData = {
        name: '',
        email: '',
        phone: '',
        user: null
    }

    constructor(public http: HttpClient, public router: Router) {
    }

    ngOnInit() {
    }

    submit() {
        console.log('submit')
        debugger;
        console.log('contact-new ==>');
        const url = 'http://localhost:8002/boot02/contactsNewAngular5.action';
        this.http.post(url, this.formData, {
            // 可以。但不在这里写。统一在 global.interceptor.ts 中实现
            // headers: new HttpHeaders().set('X-Access-Token', token)
        })
            .toPromise()
            .then((data: any) => {
                console.log(data);
                this.router.navigate(['/']);
            })
            .catch(err => {
                if (err.status === 409) {
                    console.log('服务器异常')
                }
            });
    }
}
