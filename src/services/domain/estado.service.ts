import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { EstadoDTO } from "../../models/estado.dto";
import { Observable } from "rxjs/Rx"; // Importacao correta do Observable com demais metodos

@Injectable()//tranforma a class em um servico injetavel
export class EstadoService{

    constructor(public http: HttpClient){

    }

    findAll() :Observable<EstadoDTO[]> {
        return this.http.get<EstadoDTO[]>(`${API_CONFIG.baseUrl}/estados`);
    }

}
