import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../services/storage.service";
import { API_CONFIG } from "../config/api.config";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService) {
    }
    //interceptando as requests e acrecentando cabeçalho de autorização 

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let localUser = this.storage.getlocaluser();

        let n = API_CONFIG.baseUrl.length;
        let requestToAPI = req.url.substring(0,n) == API_CONFIG.baseUrl;
        
        if (localUser && requestToAPI) {
            const authReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + localUser.token) })
            return next.handle(authReq);
            //acrecentando o Authorization somente em requests to API
        }
        else {
            return next.handle(req);
        }

    }


}

export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
};
