import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-contact-edit',
    templateUrl: './contact-edit.component.html',
    styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
    formData = {
        id: '',
        name: '',
        email: '',
        phone: '',
        user: null
    };

    constructor(
        public http: HttpClient,
        public router: Router,
        public route: ActivatedRoute) {
    }

    ngOnInit() {
        const id = this.route.snapshot.params.id;
        console.log('id: ' + id);
        debugger;
        const url = 'http://localhost:8002/boot02/contactsGetAngular5.action';
        this.http.get(url, {
            // 可以。但不在这里写。统一在 global.interceptor.ts 中实现
            // headers: new HttpHeaders().set('X-Access-Token', token)
            params: {id: id}
        })
            .toPromise()
            .then((data: any) => {
                debugger;
                console.log(data);
                this.formData = data.contactsList[0];
                console.log();
            })
            .catch(err => {
                if (err.status === 409) {
                    console.log('服务器异常');
                }
            });
    }

    editContact() {
        console.log('id: ' + this.formData.name);
        debugger;
        const url = 'http://localhost:8002/boot02/contactsUpdateAngular5.action';
        this.http.post(url, this.formData, {
            // 可以。但不在这里写。统一在 global.interceptor.ts 中实现
            // headers: new HttpHeaders().set('X-Access-Token', token)
        })
            .toPromise()
            .then((data: any) => {
                console.log(data);
                this.router.navigate(['/'])
            })
            .catch(err => {
                if (err.status === 409) {
                    console.log('服务器异常');
                }
            });
    }
}
