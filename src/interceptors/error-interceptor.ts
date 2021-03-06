import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../services/storage.service";
import { AlertController } from "ionic-angular/components/alert/alert-controller";

@Injectable()
export class ErrorInteceptor implements HttpInterceptor {
    constructor(public storage: StorageService,
        public alertController: AlertController){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .catch((error, caught) => {
                let errorObj = error;
                if (errorObj.error) {
                    errorObj = errorObj.error;
                }
                if (!errorObj.status) {
                    errorObj = JSON.parse(errorObj);
                }
                console.log("Erro detectado pelo interceptor");
                console.log(errorObj);

                switch(errorObj.status){
                    case 401:
                    this.handle401();
                    break;  

                    case 403:
                        this.handle403();
                     break; 
                     
                     default:
                         this.handleDefaultError(errorObj);
                }

                return Observable.throw(errorObj);
            }) as any;
   
        }
        handle403(){
            this.storage.setlocalUser(null);
        }
        handle401(){
            let alert = this.alertController.create({
                title:'Erro 401: Falha de autenticação',
                message:'Email ou senha incorretos',
                enableBackdropDismiss: false,
                buttons:[
                    {
                    text:'OK'
                    }
                ]
            });
            alert.present();
        }

        handleDefaultError(objError){
            let alert = this.alertController.create({
                title:`Erro ${objError.status}: ${objError.error}`,
                message: objError.message,
                enableBackdropDismiss: false,
                buttons:[
                    {
                    text:'OK'
                    }
                ]
            });
            alert.present();

        }        
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInteceptor,
    multi: true,
};
