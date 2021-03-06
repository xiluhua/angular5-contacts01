import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    signUpForm = {
        email: '',
        password: ''
    };

    email_err_msg = '';
    // 在组件类中声明了一个私有成员 http 它的类型是 HttpClient
    // 那么 Angular 会自动去实例化 HttpClient 得到一个实例
    // 然后我们就可以在组件中使用 http 这个成员来调用一些请求方法了
    // 例如 http.get http.post...
    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    signUp() {
        // tslint:disable-next-line:no-debugger
        // 1. 表单验证
        // 2. 获取表单数据
        // 3. 发起 http 请求和服务器交互
        // 4. 根据响应结果做交互处理
        const formData = this.signUpForm;
        const url = 'http://localhost:8002/boot02/loginAngular5.action';
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

    ngOnInit() {
    }

}
