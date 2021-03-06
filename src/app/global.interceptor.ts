import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';

@Injectable()
export class GlobalInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = window.localStorage.getItem('auth_token');
        token = (token === null || token === undefined || token === 'undefined') ? '' : token;
        const authReq = req.clone({headers: req.headers.set('X-Access-Token', token)});
        // return next.handle(authReq);
        return next.handle(authReq).pipe(map(value => {
            // 处理响应
            if (value instanceof HttpResponse) {
                console.log('HttpResponse: ' + value);
                return value;
            }
        }));
    }
}
