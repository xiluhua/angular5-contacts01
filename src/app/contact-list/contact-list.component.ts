import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Contacts} from './contacts';

@Component({
    selector: 'app-contact-list',
    templateUrl: './contact-list.component.html',
    styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
    user = null;
    contacts: Contacts[] = [];

    constructor(public http: HttpClient, public router: Router) {
    }

    ngOnInit() {
        debugger;
        const user_info = window.localStorage.getItem('user_info');
        this.user = JSON.parse(user_info || '{}');
        console.log('user: ' + user_info);
        this.queryContacts();
    }

    queryContacts() {
        debugger;
        console.log('queryContacts ==>');
        const url = 'http://localhost:8002/boot02/contactsAngular5.action';
        this.http.post(url, this.user, {
            // 可以。但不在这里写。统一在 global.interceptor.ts 中实现
            // headers: new HttpHeaders().set('X-Access-Token', token)
        })
            .toPromise()
            .then((data: any) => {
                console.log(data);
                this.contacts = data.contactsList;
                console.log(this.contacts);
            })
            .catch(err => {
                if (err.status === 409) {
                    console.log('服务器异常');
                }
            });
    }

    delContacts(e, id) {
        e.preventDefault();
        console.log(id);
        debugger;
        if (!window.confirm('确认删除吗？')) {
            return;
        }
        console.log('delContacts ==>');
        const url = 'http://localhost:8002/boot02/contactsDelAngular5.action';
        this.http.post(url, '', {
            // 可以。但不在这里写。统一在 global.interceptor.ts 中实现
            // headers: new HttpHeaders().set('X-Access-Token', token)
            params: {'id': id}
        })
            .toPromise()
            .then((data: any) => {
                console.log(data);
                if (data.code === 200) {
                    this.contacts = this.contacts.filter(obj => obj.id !== id);
                }

            })
            .catch(err => {
                if (err.status === 409) {
                    console.log('服务器异常');
                }
            });
    }
}
