import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = localStorage.getItem('token');
        let headers = req.headers;

        if (token && token.length) {
            headers = headers.set('Authorization', token);
        }

        let dupReq = req.clone({ headers });
        return next.handle(dupReq);
    }

}