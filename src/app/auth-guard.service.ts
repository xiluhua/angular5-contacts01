import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(public router: Router) {
    }

    canActivate() {
        console.log('AuthGuard#canActivate called');
        const token = window.localStorage.getItem('auth_token');
        if (!token) {
            this.router.navigate(['/signup']);
            return false;   // 不能继续导航
        }
        // 通过验证，完成导航
        return true;
    }
}
